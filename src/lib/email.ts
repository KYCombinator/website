import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Fire-and-forget notification to the organizers when something is submitted.
// SES send permission is granted to the site's Lambda in sst.config.ts; the
// domain is already verified. Failures are swallowed so they never break a
// user submission.

const REGION = process.env.PHOTOS_REGION || "us-east-1";
const FROM = process.env.EMAIL_FROM || "noreply@kycombinator.com";
const TO = process.env.ORGANIZERS_EMAIL || "organizers@kycombinator.com";

let _ses: SESClient | null = null;
function ses() {
  if (!_ses) _ses = new SESClient({ region: REGION });
  return _ses;
}

export async function notifyOrganizers(subject: string, body: string): Promise<void> {
  try {
    await ses().send(
      new SendEmailCommand({
        Source: FROM,
        Destination: { ToAddresses: [TO] },
        Message: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: { Text: { Data: body, Charset: "UTF-8" } },
        },
      })
    );
  } catch (err) {
    console.error("notifyOrganizers failed:", err);
  }
}
