
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr] items-center justify-items-center min-h-screen p-8">
      <main className="flex flex-col gap-8 items-center max-w-md w-full">        
        <LoggedInMessage />
      </main>
    </div>
  );
}

async function LoggedInMessage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(`hzzh.${process.env.NEXT_PUBLIC_APP_ID}.token`)?.value;
  let user: {
    email: string;
    name: string;
    picture: string;
  } | null = null;

  if (token) {
    try {
      user = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || "cinderblock") as {
        email: string;
        name: string;
        picture: string;
      };
    } catch {
      user = null;
    }
  }

  return (
    <div className="w-full space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>
      <p>You are logged in as {user?.email}.</p>
    </div>
  );
}