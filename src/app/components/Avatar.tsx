'use server'

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Image from "next/image";
import Link from "next/link";

const Avatar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(`hzzh.${process.env.NEXT_PUBLIC_APP_ID}.token`)?.value;

  console.log("avatar process.env.NEXT_PUBLIC_APP_ID", process.env.NEXT_PUBLIC_APP_ID);
  console.log("avatar token", token);

  let user: {
    email: string | null;
    name: string | null;
    picture: string | null;
  } | null = null;

  if (token) {
    console.log("in token");
    const decoded = jwt.decode(token) as { email?: string; name?: string; picture?: string } | null;
    if (decoded) {
      console.log("in decoded");
      user = {
        email: decoded.email || null,
        name: decoded.name || null,
        picture: decoded.picture || null,
      };
      console.log("user", user);
    }
  }

  console.log("avatar user return statement");

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2">
          <Image 
            src={user?.picture || ""} 
            alt={user?.name || ""} 
            width={32} 
            height={32} 
            className="rounded-full"
          />
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
