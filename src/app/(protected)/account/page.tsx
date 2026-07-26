
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function Home() {
  return (
    <section className="border-b border-[#16130f]">
      <div className="mx-auto flex min-h-[50vh] max-w-[1120px] flex-col items-start justify-center gap-8 px-5 py-24 md:px-7 lg:px-10">
        <LoggedInMessage />
      </div>
    </section>
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
    <div className="flex w-full flex-col gap-4">
      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--kyx-purple)]">
        Account
      </p>
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[44px] leading-[1.0] tracking-[-0.02em] md:text-[56px]">
        Welcome.
      </h1>
      <p className="max-w-[620px] text-[16px] leading-[1.6] text-[#4a443a]">
        You are logged in as{" "}
        <strong className="font-semibold text-[#16130f]">{user?.email}</strong>.
      </p>
    </div>
  );
}