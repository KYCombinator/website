'use server'

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Image from "next/image";
import Link from "next/link";

const Avatar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(`hzzh.${process.env.APP_ID}.token`)?.value;

  console.log(process.env.APP_ID);
  console.log(token);

  let user: {
    email: string;
    name: string;
    picture: string;
  } | null = null;

  if (token) {
    const decoded = jwt.decode(token) as { email?: string; name?: string; picture?: string } | null;
    if (decoded?.email && decoded.name && decoded.picture) {
      user = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      };
    }
  }

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2">
          <Image 
            src={user.picture} 
            alt={user.name} 
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
