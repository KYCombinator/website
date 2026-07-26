"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { featuredEvents, type FeaturedEvent } from "./data";

// Homepage event showcase: a carousel that cycles through KYX events. Each event
// with photos renders as a collage grid; events whose photos aren't in the repo
// yet render as a clean typographic slide (drop files in /public/... and list
// them in featuredEvents to light them up).

const COLLAGE_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 grid-rows-2",
};

function EventCaption({ event, onPhoto }: { event: FeaturedEvent; onPhoto: boolean }) {
  const external = /^https?:/.test(event.href);
  const whenColor = onPhoto ? "text-[#c3a8f5]" : "text-[var(--kyx-purple)]";
  const titleColor = onPhoto ? "text-[#f4f1ea]" : "text-[#16130f]";
  const taglineColor = onPhoto ? "text-[#e7e3da]" : "text-[#57503f]";
  const linkColor = onPhoto ? "text-[#f4f1ea]" : "text-[#16130f]";
  return (
    <div className="flex max-w-[560px] flex-col gap-1.5">
      <span className={`font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.12em] ${whenColor}`}>
        {event.when}
      </span>
      <h3 className={`font-[family-name:var(--font-instrument-serif)] text-[30px] leading-none tracking-[-0.02em] md:text-[38px] ${titleColor}`}>
        {event.title}
      </h3>
      <p className={`text-[15px] leading-[1.5] ${taglineColor}`}>{event.tagline}</p>
      <Link
        href={event.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`mt-1 inline-flex w-fit border-b border-[var(--kyx-purple)] pb-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] ${linkColor}`}
      >
        View →
      </Link>
    </div>
  );
}

function Slide({ event, active }: { event: FeaturedEvent; active: boolean }) {
  const photos = event.photos.slice(0, 4);
  const hasPhotos = photos.length > 0;
  return (
    <div
      className={
        "absolute inset-0 transition-opacity duration-700 " +
        (active ? "opacity-100" : "pointer-events-none opacity-0")
      }
      aria-hidden={!active}
    >
      {hasPhotos ? (
        <>
          <div className={`grid h-full w-full gap-0.5 bg-[#16130f] ${COLLAGE_COLS[photos.length] || "grid-cols-1"}`}>
            {photos.map((p, i) => (
              <div key={i} className="relative overflow-hidden bg-[#eae5da]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1120px) 50vw, 560px"
                  className="object-cover"
                  priority={active && i === 0}
                />
              </div>
            ))}
          </div>
          {/* legibility scrim under the caption (kept off the bottom-left corner
              is unnecessary here — no attribution overlay) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#16130f]/85 via-[#16130f]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
            <EventCaption event={event} onPhoto />
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-end bg-[#eae5da] p-5 md:p-8">
          <EventCaption event={event} onPhoto={false} />
        </div>
      )}
    </div>
  );
}

export default function EventShowcase() {
  const events = featuredEvents;
  const n = events.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (n <= 1 || paused) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(() => setI((v) => (v + 1) % n), 5000);
    return () => clearInterval(id);
  }, [n, paused]);

  if (n === 0) return null;

  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section className="border-b border-[#16130f]" aria-label="KYX events">
      <div
        className="relative h-[260px] overflow-hidden bg-[#eae5da] md:h-[320px] lg:h-[380px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {events.map((ev, idx) => (
          <Slide key={ev.title} event={ev} active={idx === i} />
        ))}

        {n > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous event"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-[#16130f]/60 font-[family-name:var(--font-ibm-plex-mono)] text-[#f4f1ea] backdrop-blur-sm transition-colors hover:bg-[#16130f]/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next event"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-[#16130f]/60 font-[family-name:var(--font-ibm-plex-mono)] text-[#f4f1ea] backdrop-blur-sm transition-colors hover:bg-[#16130f]/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
            >
              →
            </button>
            <div className="absolute right-4 top-4 flex gap-1.5">
              {events.map((ev, idx) => (
                <button
                  key={ev.title}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Show ${ev.title}`}
                  aria-current={idx === i}
                  className={
                    "h-1.5 w-1.5 rounded-full transition-colors " +
                    (idx === i ? "bg-[#f4f1ea]" : "bg-[#f4f1ea]/45 hover:bg-[#f4f1ea]/70")
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
