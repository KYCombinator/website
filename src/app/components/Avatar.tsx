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
        <div className="flex items-center gap-2">
          <p>Welcome, {user.name}</p>
        </div>
      ) : (
        <Link href="https://auth.kycombinator.com?redirect=https://www.kycombinator.com">
          <div className="btn btn-primary">Login</div>
        </Link>
      )}
    </>
  );
};

export default Avatar;
