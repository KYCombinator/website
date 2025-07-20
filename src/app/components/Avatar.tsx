'use server'

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";

const Avatar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(`hzzh.${process.env.NEXT_PUBLIC_APP_ID}.token`)?.value;

  let user: {
    email: string | null;
    name: string | null;
    picture: string | null;
  } | null = null;

  if (token) {
    const decoded = jwt.decode(token) as { email?: string; name?: string; picture?: string } | null;
    if (decoded) {
      user = {
        email: decoded.email || null,
        name: decoded.name || null,
        picture: decoded.picture || null,
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
        <Link href="https://auth.kycombinator.com?redirect_uri=https://www.kycombinator.com">
          <div className="btn btn-primary">Login</div>
        </Link>
      )}
    </>
  );
};

export default Avatar;
