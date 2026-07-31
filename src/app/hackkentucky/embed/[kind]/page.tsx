import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INTAKES, INTAKE_ORDER, type HkKind } from "../../intake";
import IntakeForm from "../../IntakeForm";
import EmbedAutoHeight from "../../EmbedAutoHeight";

export const dynamic = "force-dynamic";

// Chrome-less embeds for the four HackKentucky forms — just the form, no KYX
// header/footer — so hackkentucky.com can iframe them cleanly.
//   ?theme=dark  → dark palette (bg #0b0b0b, text #f2f2ec, lime accent)
//   ?bare=1      → hide the embed's own heading/intro (host shows its own)
// The page also posts its height to the parent (kyx:resize) for auto-sizing.
export function generateMetadata({ params }: { params: { kind: string } }): Metadata {
  const c = INTAKES[params.kind as HkKind];
  return {
    title: c ? `${c.eyebrow} — HackKentucky` : "HackKentucky",
    robots: { index: false, follow: false },
  };
}

// Fill the iframe width (no one-sided gutter) + hide site chrome. Applies to
// both themes.
const BASE_CSS = `html,body{margin:0}body>header,body>footer{display:none!important}
.hk-embed form{max-width:100%!important}
.hk-embed [class*="620px"]{max-width:100%!important}`;

const LIGHT_CSS = `body{background:#f4f1ea}`;

// Retheme the form to the HackKentucky dark palette. Scoped to .hk-embed.
const DARK_CSS = `body{background:#0b0b0b}
.hk-embed input,.hk-embed textarea,.hk-embed select{background:transparent!important;border-color:rgba(242,242,236,.14)!important;color:#f2f2ec!important}
.hk-embed input::placeholder,.hk-embed textarea::placeholder{color:rgba(242,242,236,.4)!important}
.hk-embed select option{color:#0b0b0b}
.hk-embed label span{color:rgba(242,242,236,.6)!important}
.hk-embed button[type=submit]{background:#c9f73b!important;color:#0b0b0b!important}
.hk-embed button:not([type=submit]){border-color:rgba(242,242,236,.2)!important;color:#f2f2ec!important}
.hk-embed input:focus,.hk-embed textarea:focus,.hk-embed select:focus{border-color:#c9f73b!important;outline-color:#c9f73b!important}
.hk-embed [class*="eae5da"]{background:rgba(242,242,236,.04)!important}
.hk-embed [class*="d8d2c5"],.hk-embed [class*="cec7b8"],.hk-embed [class*="e2ddd1"]{border-color:rgba(242,242,236,.14)!important}
.hk-embed [class*="16130f"]{color:#f2f2ec!important}
.hk-embed [class*="4a443a"]{color:rgba(242,242,236,.7)!important}
.hk-embed [class*="b3261e"]{color:#ff9d9d!important}`;

export default function HkEmbedPage({
  params,
  searchParams,
}: {
  params: { kind: string };
  searchParams: { theme?: string; bare?: string };
}) {
  const kind = params.kind as HkKind;
  if (!INTAKE_ORDER.includes(kind)) notFound();
  const c = INTAKES[kind];

  const dark = searchParams?.theme === "dark";
  const bare = searchParams?.bare === "1";
  const css = BASE_CSS + (dark ? DARK_CSS : LIGHT_CSS);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <main
        data-theme={dark ? "dark" : "light"}
        className="hk-embed mx-auto flex w-full max-w-[600px] flex-col gap-5 px-4 py-5"
      >
        {!bare && (
          <div className="flex flex-col gap-2">
            <p
              className={
                "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] " +
                (dark ? "text-[#c9f73b]" : "text-[var(--kyx-purple)]")
              }
            >
              {c.eyebrow}
            </p>
            <h1
              className={
                "font-[family-name:var(--font-instrument-serif)] text-[30px] leading-none tracking-[-0.02em] md:text-[38px] " +
                (dark ? "text-[#f2f2ec]" : "text-[#16130f]")
              }
            >
              {c.heading}
            </h1>
            <p
              className={
                "text-[15px] leading-[1.6] [text-wrap:pretty] " +
                (dark ? "text-[rgba(242,242,236,0.7)]" : "text-[#4a443a]")
              }
            >
              {c.description}
            </p>
          </div>
        )}
        <IntakeForm config={c} />
      </main>
      <EmbedAutoHeight />
    </>
  );
}
