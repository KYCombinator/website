import { randomUUID, randomInt, createHash } from "crypto";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Server-only data layer for the events gallery, photo submissions, and
// Cinderblock applications. Backed by the SST-linked DynamoDB table + S3 bucket
// (names injected via environment). Single-table design:
//   Event:       pk="EVENT"        sk=<id>
//   Photo:       pk="PHOTO"        sk=<id>  gsi1pk="PHOTO#<status>"  gsi1sk=<createdAt>
//   Application: pk="APP"          sk=<id>  gsi1pk="APP#<status>"    gsi1sk=<createdAt>
//   Rate limit:  pk="RL"           sk=<ip>

const REGION = process.env.PHOTOS_REGION || "us-east-1";
const TABLE = process.env.GALLERY_TABLE || "";
const BUCKET = process.env.PHOTOS_BUCKET || "";

let _doc: DynamoDBDocumentClient | null = null;
function doc() {
  if (!_doc) {
    _doc = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }), {
      marshallOptions: { removeUndefinedValues: true },
    });
  }
  return _doc;
}

let _s3: S3Client | null = null;
function s3() {
  if (!_s3) _s3 = new S3Client({ region: REGION });
  return _s3;
}

export type PhotoStatus = "pending" | "approved" | "rejected";
export type AppStatus = "new" | "reviewed" | "archived";

export type EventRecord = {
  id: string;
  name: string;
  tagline: string;
  when: string;
  month: string; // calendar month, e.g. "SEP" (blank = not on the calendar)
  action: string; // calendar action label, e.g. "Register"
  href: string;
  order: number;
  published: boolean;
  createdAt: string;
};

export type PhotoRecord = {
  id: string;
  eventId: string;
  key: string;
  url: string;
  submitterName: string;
  submitterEmail: string;
  status: PhotoStatus;
  createdAt: string;
};

export type ApplicationRecord = {
  id: string;
  name: string;
  email: string;
  company: string;
  building: string;
  links: string;
  status: AppStatus;
  createdAt: string;
};

export function galleryConfigured() {
  return !!TABLE && !!BUCKET;
}

// ── Events ────────────────────────────────────────────────────────────────
export async function listEvents(): Promise<EventRecord[]> {
  const r = await doc().send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": "EVENT" },
    })
  );
  const items = (r.Items || []) as EventRecord[];
  return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function putEvent(
  input: Partial<EventRecord> & { name: string }
): Promise<EventRecord> {
  const id = input.id || randomUUID();
  const existing = input.id ? await getEvent(id) : null;
  const record: EventRecord = {
    id,
    name: input.name,
    tagline: input.tagline ?? existing?.tagline ?? "",
    when: input.when ?? existing?.when ?? "",
    month: input.month ?? existing?.month ?? "",
    action: input.action ?? existing?.action ?? "",
    href: input.href ?? existing?.href ?? "/events",
    order: input.order ?? existing?.order ?? Date.now(),
    published: input.published ?? existing?.published ?? true,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  await doc().send(
    new PutCommand({
      TableName: TABLE,
      Item: { pk: "EVENT", sk: id, ...record },
    })
  );
  return record;
}

export async function getEvent(id: string): Promise<EventRecord | null> {
  const r = await doc().send(
    new GetCommand({ TableName: TABLE, Key: { pk: "EVENT", sk: id } })
  );
  return (r.Item as EventRecord) || null;
}

export async function deleteEvent(id: string): Promise<void> {
  await doc().send(
    new DeleteCommand({ TableName: TABLE, Key: { pk: "EVENT", sk: id } })
  );
}

// ── Photos ────────────────────────────────────────────────────────────────
export async function createPhoto(input: {
  eventId: string;
  key: string;
  url: string;
  submitterName: string;
  submitterEmail: string;
}): Promise<PhotoRecord> {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const record: PhotoRecord = {
    id,
    eventId: input.eventId,
    key: input.key,
    url: input.url,
    submitterName: input.submitterName,
    submitterEmail: input.submitterEmail,
    status: "pending",
    createdAt,
  };
  await doc().send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        pk: "PHOTO",
        sk: id,
        gsi1pk: "PHOTO#pending",
        gsi1sk: createdAt,
        ...record,
      },
    })
  );
  return record;
}

// Seed a pre-approved curated photo (e.g. the site's own event photos) so the
// homepage carousel has content before any community submissions.
export async function createApprovedPhoto(input: {
  eventId: string;
  url: string;
  submitterName: string;
}): Promise<void> {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  await doc().send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        pk: "PHOTO",
        sk: id,
        gsi1pk: "PHOTO#approved",
        gsi1sk: createdAt,
        id,
        eventId: input.eventId,
        key: "",
        url: input.url,
        submitterName: input.submitterName,
        submitterEmail: "",
        status: "approved",
        createdAt,
      },
    })
  );
}

async function photosByStatus(status: PhotoStatus): Promise<PhotoRecord[]> {
  const r = await doc().send(
    new QueryCommand({
      TableName: TABLE,
      IndexName: "StatusIndex",
      KeyConditionExpression: "gsi1pk = :s",
      ExpressionAttributeValues: { ":s": `PHOTO#${status}` },
      ScanIndexForward: false,
    })
  );
  return (r.Items || []) as PhotoRecord[];
}

export function listApprovedPhotos() {
  return photosByStatus("approved");
}
export function listPendingPhotos() {
  return photosByStatus("pending");
}

export async function setPhotoStatus(
  id: string,
  status: PhotoStatus
): Promise<void> {
  await doc().send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { pk: "PHOTO", sk: id },
      UpdateExpression: "SET #s = :s, gsi1pk = :g",
      ExpressionAttributeNames: { "#s": "status" },
      ExpressionAttributeValues: { ":s": status, ":g": `PHOTO#${status}` },
    })
  );
}

// ── Cinderblock applications ────────────────────────────────────────────────
export async function createApplication(input: {
  name: string;
  email: string;
  company: string;
  building: string;
  links: string;
}): Promise<ApplicationRecord> {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  const record: ApplicationRecord = { id, status: "new", createdAt, ...input };
  await doc().send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        pk: "APP",
        sk: id,
        gsi1pk: "APP#new",
        gsi1sk: createdAt,
        ...record,
      },
    })
  );
  return record;
}

export async function listApplications(): Promise<ApplicationRecord[]> {
  const r = await doc().send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": "APP" },
    })
  );
  return ((r.Items || []) as ApplicationRecord[]).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
}

export async function setApplicationStatus(
  id: string,
  status: AppStatus
): Promise<void> {
  await doc().send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { pk: "APP", sk: id },
      UpdateExpression: "SET #s = :s, gsi1pk = :g",
      ExpressionAttributeNames: { "#s": "status" },
      ExpressionAttributeValues: { ":s": status, ":g": `APP#${status}` },
    })
  );
}

// ── Users ───────────────────────────────────────────────────────────────────
export type UserRole = "member" | "admin";
export type UserRecord = {
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
};

const BOOTSTRAP_ADMIN = (process.env.ADMIN_EMAIL || "dan@kycombinator.com").toLowerCase();

export async function listUsers(): Promise<UserRecord[]> {
  const r = await doc().send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": "USER" },
    })
  );
  return ((r.Items || []) as UserRecord[]).sort((a, b) =>
    a.email.localeCompare(b.email)
  );
}

export async function getUser(email: string): Promise<UserRecord | null> {
  const r = await doc().send(
    new GetCommand({ TableName: TABLE, Key: { pk: "USER", sk: email.toLowerCase() } })
  );
  return (r.Item as UserRecord) || null;
}

export async function putUser(input: {
  email: string;
  name: string;
  role: UserRole;
}): Promise<UserRecord> {
  const email = input.email.trim().toLowerCase();
  const existing = await getUser(email);
  const record: UserRecord = {
    email,
    name: input.name.trim(),
    role: input.role === "admin" ? "admin" : "member",
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  await doc().send(
    new PutCommand({ TableName: TABLE, Item: { pk: "USER", sk: email, ...record } })
  );
  return record;
}

export async function deleteUser(email: string): Promise<void> {
  await doc().send(
    new DeleteCommand({ TableName: TABLE, Key: { pk: "USER", sk: email.toLowerCase() } })
  );
}

// Who may access the admin portal: the bootstrap admin (ADMIN_EMAIL) always,
// plus any user record with role "admin".
export async function isAdminUser(email: string): Promise<boolean> {
  const e = String(email || "").trim().toLowerCase();
  if (!e) return false;
  if (e === BOOTSTRAP_ADMIN) return true;
  const u = await getUser(e);
  return u?.role === "admin";
}

// ── S3 upload ───────────────────────────────────────────────────────────────
export async function putPhotoObject(
  body: Buffer,
  contentType: string
): Promise<{ key: string; url: string }> {
  const ext = contentType === "image/png" ? "png" : contentType === "image/webp" ? "webp" : "jpg";
  const key = `submissions/${randomUUID()}.${ext}`;
  await s3().send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  const url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
  return { key, url };
}

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export function isAllowedImageType(t: string) {
  return t in EXT_BY_TYPE;
}

export function isValidPhotoKey(key: string) {
  return /^submissions\/[a-f0-9-]+\.(jpg|png|webp)$/.test(key);
}

export function photoUrlForKey(key: string) {
  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
}

// Presigned direct-to-S3 upload so large phone photos never hit the Lambda
// request-size limit. Returns the PUT url the browser uploads to, plus the
// public url the object will have once uploaded.
export async function presignPhotoUpload(
  contentType: string
): Promise<{ key: string; uploadUrl: string; url: string }> {
  const ext = EXT_BY_TYPE[contentType] || "jpg";
  const key = `submissions/${randomUUID()}.${ext}`;
  const uploadUrl = await getSignedUrl(
    s3(),
    new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType }),
    { expiresIn: 300 }
  );
  const url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
  return { key, uploadUrl, url };
}

// ── Rate limit (login) ──────────────────────────────────────────────────────
export async function checkLoginRateLimit(
  ip: string,
  max = 8,
  windowSec = 600
): Promise<{ allowed: boolean; retryAfter: number }> {
  const now = Math.floor(Date.now() / 1000);
  const r = await doc().send(
    new GetCommand({ TableName: TABLE, Key: { pk: "RL", sk: ip } })
  );
  const item = r.Item as { count?: number; windowStart?: number } | undefined;
  if (item && item.windowStart && now - item.windowStart < windowSec) {
    if ((item.count ?? 0) >= max) {
      return { allowed: false, retryAfter: windowSec - (now - item.windowStart) };
    }
  }
  return { allowed: true, retryAfter: 0 };
}

export async function recordLoginFailure(
  ip: string,
  windowSec = 600
): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const r = await doc().send(
    new GetCommand({ TableName: TABLE, Key: { pk: "RL", sk: ip } })
  );
  const item = r.Item as { count?: number; windowStart?: number } | undefined;
  const fresh = !item || !item.windowStart || now - item.windowStart >= windowSec;
  await doc().send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        pk: "RL",
        sk: ip,
        count: fresh ? 1 : (item!.count ?? 0) + 1,
        windowStart: fresh ? now : item!.windowStart,
      },
    })
  );
}

export async function clearLoginFailures(ip: string): Promise<void> {
  await doc().send(
    new DeleteCommand({ TableName: TABLE, Key: { pk: "RL", sk: ip } })
  );
}

// ── Email login codes (OTP) ─────────────────────────────────────────────────
const OTP_TTL_SEC = 600; // 10 min
const OTP_MAX_ATTEMPTS = 5;

function hashCode(email: string, code: string) {
  return createHash("sha256").update(`${email.toLowerCase()}:${code}`).digest("hex");
}

// Generate a 6-digit code, store its hash (with expiry), and return the plaintext
// so the caller can email it. Overwrites any outstanding code for the email.
export async function createLoginCode(email: string): Promise<string> {
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const now = Math.floor(Date.now() / 1000);
  await doc().send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        pk: "OTP",
        sk: email.toLowerCase(),
        codeHash: hashCode(email, code),
        expiresAt: now + OTP_TTL_SEC,
        attempts: 0,
      },
    })
  );
  return code;
}

// Verify a submitted code: must exist, be unexpired, under the attempt cap, and
// match. Consumes (deletes) the code on success.
export async function verifyLoginCode(email: string, code: string): Promise<boolean> {
  const key = { pk: "OTP", sk: email.toLowerCase() };
  const r = await doc().send(new GetCommand({ TableName: TABLE, Key: key }));
  const item = r.Item as
    | { codeHash?: string; expiresAt?: number; attempts?: number }
    | undefined;
  const now = Math.floor(Date.now() / 1000);
  if (!item || !item.codeHash || (item.expiresAt ?? 0) < now) return false;
  if ((item.attempts ?? 0) >= OTP_MAX_ATTEMPTS) return false;

  if (item.codeHash === hashCode(email, code)) {
    await doc().send(new DeleteCommand({ TableName: TABLE, Key: key }));
    return true;
  }
  await doc().send(
    new UpdateCommand({
      TableName: TABLE,
      Key: key,
      UpdateExpression: "SET attempts = if_not_exists(attempts, :z) + :one",
      ExpressionAttributeValues: { ":z": 0, ":one": 1 },
    })
  );
  return false;
}
