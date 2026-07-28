import { NextResponse } from "next/server";
import { presignPhotoUpload, isAllowedImageType, galleryConfigured } from "@/lib/gallery";

export const dynamic = "force-dynamic";

// Mint a short-lived presigned URL so the browser can upload a photo directly
// to S3 (keeps large phone photos off the Lambda request path).
export async function POST(request: Request) {
  if (!galleryConfigured()) {
    return NextResponse.json({ error: "Gallery not configured." }, { status: 501 });
  }
  let contentType = "";
  try {
    const body = await request.json();
    contentType = String(body?.contentType || "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!isAllowedImageType(contentType)) {
    return NextResponse.json({ error: "Only JPEG, PNG, or WebP images." }, { status: 400 });
  }
  const { key, uploadUrl } = await presignPhotoUpload(contentType);
  return NextResponse.json({ key, uploadUrl });
}
