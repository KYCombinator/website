import type { Metadata } from "next";
import { Container, PageHero } from "@/app/components/fm";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply to Cinderblock | KYX",
  description:
    "Apply for a desk in Cinderblock — a working studio for high-agency builders in Louisville.",
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Cinderblock"
        title="Apply to the room."
        intro="A working studio at 1205 East Washington — a small, selective room of founders shipping in the same place at the same time. Tell us what you're building."
      />
      <section>
        <Container className="py-16 lg:py-20">
          <ApplyForm />
        </Container>
      </section>
    </>
  );
}
