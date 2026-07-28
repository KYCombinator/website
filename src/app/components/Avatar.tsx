import { cookies } from "next/headers";
import Link from "next/link";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";

// Header auth widget: shows the signed-in member (→ dashboard) or a Login link
// that goes to our own email-code sign-in (no external SSO).
const Avatar = async () => {
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);

  if (session) {
    return (
      <Link
        href="/dashboard"
        className="font-[family-name:var(--font-ibm-plex-sans)] text-[13px] text-[#7d766a] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
      >
        {session.email.split("@")[0]}
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="font-[family-name:var(--font-ibm-plex-sans)] text-[13px] text-[#7d766a] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
    >
      Login
    </Link>
  );
};

export default Avatar;
