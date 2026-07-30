"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type GridPhoto = { id: string; url: string; submitterName: string };

// Photo grid for one event with a Zillow-style lightbox. Thumbnails overlay the
// attribution (no caption bar, to save vertical space); clicking one opens a
// full-screen viewer you can page through with the arrows, keyboard, or swipe.
export default function EventPhotoGrid({
  eventName,
  photos,
}: {
  eventName: string;
  photos: GridPhoto[];
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);
  const go = useCallback(
    (d: number) => setOpenIdx((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length]
  );

  // Keyboard nav + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIdx, close, go]);

  if (photos.length === 0) {
    return (
      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#a39c8d]">
        No photos yet.
      </p>
    );
  }

  const active = openIdx === null ? null : photos[openIdx];

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIdx(i)}
            aria-label={`View photo by ${photo.submitterName}`}
            className="group relative block aspect-[4/3] overflow-hidden border border-[#d8d2c5] bg-[#e2ddd1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
          >
            {/* External public S3 URLs — plain <img>, not next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={eventName}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#16130f]/75 via-[#16130f]/20 to-transparent px-2 pb-1.5 pt-6 text-left font-[family-name:var(--font-ibm-plex-mono)] text-[10px] text-[#f4f1ea]">
              {photo.submitterName}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#16130f]/95 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${eventName} photos`}
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-[#f4f1ea]/10 font-[family-name:var(--font-ibm-plex-mono)] text-[18px] text-[#f4f1ea] transition-colors hover:bg-[#f4f1ea]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4f1ea]"
          >
            ✕
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-[#f4f1ea]/10 font-[family-name:var(--font-ibm-plex-mono)] text-[#f4f1ea] transition-colors hover:bg-[#f4f1ea]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4f1ea] md:left-6"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-[#f4f1ea]/10 font-[family-name:var(--font-ibm-plex-mono)] text-[#f4f1ea] transition-colors hover:bg-[#f4f1ea]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4f1ea] md:right-6"
              >
                →
              </button>
            </>
          )}

          <figure className="flex max-h-full max-w-full flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.url}
              alt={eventName}
              className="max-h-[82vh] max-w-[92vw] object-contain"
            />
            <figcaption className="flex items-center gap-3 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#c9c3b6]">
              <span>Photo by {active.submitterName}</span>
              <span className="text-[#7d766a]">
                {(openIdx ?? 0) + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
