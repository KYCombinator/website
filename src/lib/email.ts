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

function loginCodeHtml(code: string): string {
  const mono = "'IBM Plex Mono','SFMono-Regular',Consolas,'Courier New',monospace";
  const sans = "'IBM Plex Sans',-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f4f1ea;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="440" cellpadding="0" cellspacing="0" style="width:440px;max-width:100%;">
        <tr><td style="padding:0 4px 18px;">
          <span style="font-family:${mono};font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5B2FBF;">KYCombinator</span>
        </td></tr>
        <tr><td style="background:#ffffff;border:1px solid #16130f;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:36px 32px;">
            <div style="font-family:${sans};font-size:22px;font-weight:600;color:#16130f;margin:0 0 10px;">Your sign-in code</div>
            <div style="font-family:${sans};font-size:15px;line-height:1.55;color:#57503f;margin:0 0 26px;">Enter this code to sign in to KYX. It expires in 10 minutes.</div>
            <div style="font-family:${mono};font-size:38px;font-weight:700;letter-spacing:12px;color:#16130f;background:#f4f1ea;border:1px solid #d8d2c5;padding:20px 0;text-align:center;">${code}</div>
            <div style="font-family:${sans};font-size:13px;line-height:1.5;color:#7d766a;margin:26px 0 0;">If you didn&rsquo;t request this, you can safely ignore this email.</div>
          </td></tr></table>
        </td></tr>
        <tr><td style="padding:18px 4px 0;">
          <span style="font-family:${mono};font-size:11px;letter-spacing:0.5px;color:#a39c8d;">KYX &middot; 1205 East Washington St, Louisville, KY</span>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// Send a passwordless sign-in code. Failures propagate so the login route can
// tell the user the code couldn't be sent.
export async function sendLoginCode(toEmail: string, code: string): Promise<void> {
  await ses().send(
    new SendEmailCommand({
      Source: FROM,
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Subject: { Data: `${code} is your KYX sign-in code`, Charset: "UTF-8" },
        Body: {
          Html: { Data: loginCodeHtml(code), Charset: "UTF-8" },
          Text: {
            Data: `Your KYX sign-in code is ${code}\n\nIt expires in 10 minutes. If you didn't request it, you can safely ignore this email.`,
            Charset: "UTF-8",
          },
        },
      },
    })
  );
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
