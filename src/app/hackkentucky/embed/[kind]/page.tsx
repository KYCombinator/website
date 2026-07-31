import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INTAKES, INTAKE_ORDER, type HkKind } from "../../intake";
import IntakeForm from "../../IntakeForm";

export const dynamic = "force-dynamic";

// Chrome-less embeds for the four HackKentucky forms — just the form, no KYX
// header/footer — so hackkentucky.com can iframe them cleanly. One route per
// kind: /hackkentucky/embed/<sponsor|bounty|speak|volunteer>.
export function generateMetadata({ params }: { params: { kind: string } }): Metadata {
  const c = INTAKES[params.kind as HkKind];
  return {
    title: c ? `${c.eyebrow} — HackKentucky` : "HackKentucky",
    robots: { index: false, follow: false },
  };
}

export default function HkEmbedPage({ params }: { params: { kind: string } }) {
  const kind = params.kind as HkKind;
  if (!INTAKE_ORDER.includes(kind)) notFound();
  const c = INTAKES[kind];

  return (
    <>
      {/* Hide the site chrome so this page is embeddable on its own. */}
      <style
        dangerouslySetInnerHTML={{
          __html: "body>header,body>footer{display:none!important}body{background:#f4f1ea}",
        }}
      />
      <main className="mx-auto flex max-w-[680px] flex-col gap-6 px-5 py-8 md:px-7 md:py-10">
        <div className="flex flex-col gap-2">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--kyx-purple)]">
            {c.eyebrow}
          </p>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[30px] leading-none tracking-[-0.02em] text-[#16130f] md:text-[38px]">
            {c.heading}
          </h1>
          <p className="text-[15px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">{c.description}</p>
        </div>
        <IntakeForm config={c} />
      </main>
    </>
  );
}
