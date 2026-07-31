import Link from "next/link";
import type { Metadata } from "next";
import { Container, Eyebrow, SerifHeading, Button } from "./components/fm";

export const metadata: Metadata = {
  title: "Page not found | KYX",
};

const LINKS = [
  { label: "Vision", desc: "Ten Series A companies out of Kentucky by 2030.", href: "/vision" },
  { label: "Events", desc: "What's coming up, and photos from the room.", href: "/events" },
  { label: "Community", desc: "Join Slack and see how to get involved.", href: "/slack" },
  { label: "Apply to Cinderblock", desc: "A desk in the room for high-agency builders.", href: "/cinderblock/apply" },
];

export default function NotFound() {
  return (
    <main>
      <section className="border-b border-[#16130f]">
        <Container className="flex flex-col gap-6 py-20 lg:py-28">
          <Eyebrow>Error 404 · Page not found</Eyebrow>
          <SerifHeading
            as="h1"
            className="max-w-[820px] text-[52px] leading-[0.95] md:text-[76px] lg:text-[92px]"
          >
            Nothing&apos;s here&hellip;
          </SerifHeading>
          <p className="max-w-[560px] text-[18px] leading-[1.6] text-[#4a443a] [text-wrap:pretty] md:text-[19px]">
            &hellip; maybe you&apos;re in Ohio. This page doesn&apos;t exist (or it moved) —
            here&apos;s the way back to Kentucky.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="/" variant="primary">
              Back to home
            </Button>
            <Button href="/events" variant="outline">
              See what&apos;s on
            </Button>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-[72px]">
          <Eyebrow className="mb-8">Where to go</Eyebrow>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex flex-col gap-2 border border-[#d8d2c5] p-6 transition-colors duration-150 hover:border-[#16130f]"
              >
                <span className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-none text-[#16130f]">
                  {l.label}
                </span>
                <span className="text-[15px] leading-[1.5] text-[#4a443a]">{l.desc}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
