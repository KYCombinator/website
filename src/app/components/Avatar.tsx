import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Avatar = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("kycombinator_token")?.value;
    let user: {
      email: string;
      name: string;
      picture: string;
    } | null = null;
  
    if (token) {
      try {
        user = jwt.verify(token, process.env.JWT_SECRET || "cinderblock") as {
          email: string;
          name: string;
          picture: string;
        };
      } catch {
        user = null;
      }
    }
  
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
            <Button>Login</Button>
        </Link>
    )}
    </>
  )
}

export default Avatar