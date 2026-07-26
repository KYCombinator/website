'use server'

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { AuthUser } from "@hzzhsoftware/types-auth";

const Avatar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(`hzzh.${process.env.NEXT_PUBLIC_APP_ID}.token`)?.value;

  let user: AuthUser | null = null;

  if (token) {
    const decoded = jwt.decode(token) as AuthUser | null;
    if (decoded) {
      user = {
        id: decoded?.id,
        email: decoded?.email,
        name: decoded?.name,
        picture: decoded?.picture,
      };
    }
  }

  return (
    <>
      {user ? (
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#7d766a]">
          Welcome, {user.name}
        </span>
      ) : (
        <Link
          href="https://auth.kycombinator.com?redirect=https://www.kycombinator.com"
          className="font-[family-name:var(--font-ibm-plex-sans)] text-[13px] text-[#7d766a] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
        >
          Login
        </Link>
      )}
    </>
  );
};

export default Avatar;
