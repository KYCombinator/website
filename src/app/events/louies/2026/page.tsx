import type { Metadata } from "next";
import { Container, PageHero } from "@/app/components/fm";
import { nominationsOpen } from "@/data/louies2026";
import NominationForm from "./NominationForm";
export const metadata: Metadata = {
  title: "The Louies 2026 | Nominations | KY Combinator",
  description: "Nominate the people and teams moving Louisville's startup community forward.",
  robots: nominationsOpen ? { index: true, follow: true } : { index: false, follow: false },
};
export default function Louies2026() {
  return <>
    <PageHero eyebrow="Louisville Startup Awards · Nominations" title="The LOUIES 2026."
      intro="Who's doing the most for Louisville? Nominate the people and teams moving our startup community forward." />
    <Container className="py-12 max-w-[820px]">
      {nominationsOpen ? <NominationForm /> : <p>Nominations for The Louies 2026 are not open yet. Check back soon.</p>}
    </Container>
  </>;
}
