import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Container, PageHero, SerifHeading, Button } from "@/app/components/fm";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import { getUser, galleryConfigured } from "@/lib/gallery";
import ApplyForm from "./ApplyForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apply to Cinderblock | KYX",
  description:
    "Apply for a desk in Cinderblock — a working studio for high-agency builders in Louisville.",
};

export default async function ApplyPage() {
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  const user = session && galleryConfigured() ? await getUser(session.email) : null;

  return (
    <>
      <PageHero
        eyebrow="Cinderblock"
        title="Apply to the room."
        intro="A working studio at 1205 East Washington — a small, selective room of founders shipping in the same place at the same time. Tell us what you're building."
      />
      <section>
        <Container className="py-16 lg:py-20">
          {session ? (
            <ApplyForm
              defaultName={user?.name || ""}
              defaultEmail={session.email}
            />
          ) : (
            <div className="flex max-w-[560px] flex-col gap-5 border border-[#d8d2c5] bg-[#eae5da] p-8">
              <SerifHeading className="text-[26px] leading-none md:text-[30px]">
                Sign in to apply.
              </SerifHeading>
              <p className="text-[15px] leading-[1.6] text-[#4a443a]">
                Applying takes an account — we&apos;ll email you a 6-digit code, no password.
                New here? Signing in creates your account. It keeps applications real and lets us
                follow up with you.
              </p>
              <Button href="/login?redirect=/cinderblock/apply" variant="primary">
                Log in to apply
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
