import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Fire-and-forget notification to the organizers when something is submitted.
// SES send permission is granted to the site's Lambda in sst.config.ts; the
// domain is already verified. Failures are swallowed so they never break a
// user submission.

const REGION = process.env.PHOTOS_REGION || "us-east-1";
const FROM = process.env.EMAIL_FROM || "noreply@kycombinator.com";
const TO = process.env.ORGANIZERS_EMAIL || "organizers@kycombinator.com";
export const HACKKENTUCKY_EMAIL = process.env.HACKKENTUCKY_EMAIL || "hackkentucky@kycombinator.com";

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

function welcomeHtml(): string {
  const mono = "'IBM Plex Mono','SFMono-Regular',Consolas,'Courier New',monospace";
  const sans = "'IBM Plex Sans',-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f4f1ea;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="width:480px;max-width:100%;">
        <tr><td style="padding:0 4px 18px;">
          <span style="font-family:${mono};font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#5B2FBF;">KYCombinator</span>
        </td></tr>
        <tr><td style="background:#ffffff;border:1px solid #16130f;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:36px 32px;">
            <div style="font-family:${sans};font-size:24px;font-weight:600;color:#16130f;margin:0 0 14px;">Welcome to KYX.</div>
            <div style="font-family:${sans};font-size:15px;line-height:1.6;color:#4a443a;margin:0 0 16px;">
              We&rsquo;re building toward one number: <strong style="color:#16130f;">ten Series A companies out of Kentucky by 2030.</strong>
              Everything KYX does &mdash; the events, the studio, the community &mdash; is pointed at getting Kentucky founders to a real Series&nbsp;A.
            </div>
            <div style="font-family:${sans};font-size:15px;line-height:1.6;color:#4a443a;margin:0 0 22px;">
              You&rsquo;re in. A few good first steps: subscribe to the weekly letter, jump into Slack, and show up to an event.
              Fill out your profile and you&rsquo;ll show up in the member directory.
            </div>
            <a href="https://kycombinator.com/dashboard" style="display:inline-block;font-family:${mono};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#f9f7f2;background:#5B2FBF;padding:14px 22px;text-decoration:none;">Open your dashboard</a>
            <div style="font-family:${sans};font-size:13px;line-height:1.55;color:#7d766a;margin:24px 0 0;border-top:1px solid #d8d2c5;padding-top:18px;">
              KYX is <strong style="color:#57503f;">The KYCombinator Project Inc., an all-volunteer, Kentucky-based 501(c)(3) nonprofit.</strong>
              No dues, no paywalls &mdash; just people helping Kentucky founders win.
            </div>
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

// Sent once, when a brand-new member account is created on first sign-in.
// Fire-and-forget: never block or fail the login on a welcome-email error.
export async function sendWelcome(toEmail: string): Promise<void> {
  try {
    await ses().send(
      new SendEmailCommand({
        Source: FROM,
        Destination: { ToAddresses: [toEmail] },
        Message: {
          Subject: { Data: "Welcome to KYX", Charset: "UTF-8" },
          Body: {
            Html: { Data: welcomeHtml(), Charset: "UTF-8" },
            Text: {
              Data:
                "Welcome to KYX.\n\n" +
                "We're building toward one number: ten Series A companies out of Kentucky by 2030. " +
                "Everything KYX does — the events, the studio, the community — is pointed at getting Kentucky founders to a real Series A.\n\n" +
                "A few good first steps: subscribe to the weekly letter, jump into Slack, and show up to an event. " +
                "Fill out your profile at https://kycombinator.com/dashboard and you'll show up in the member directory.\n\n" +
                "KYX is The KYCombinator Project Inc., an all-volunteer, Kentucky-based 501(c)(3) nonprofit. " +
                "No dues, no paywalls — just people helping Kentucky founders win.",
              Charset: "UTF-8",
            },
          },
        },
      })
    );
  } catch (err) {
    console.error("sendWelcome failed:", err);
  }
}

export async function notifyOrganizers(subject: string, body: string): Promise<void> {
  return notify(TO, subject, body);
}

// Fire-and-forget plain-text notification to an arbitrary recipient. Failures
// are swallowed so they never break a user submission.
export async function notify(to: string, subject: string, body: string): Promise<void> {
  try {
    await ses().send(
      new SendEmailCommand({
        Source: FROM,
        Destination: { ToAddresses: [to] },
        Message: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: { Text: { Data: body, Charset: "UTF-8" } },
        },
      })
    );
  } catch (err) {
    console.error("notify failed:", err);
  }
}
