import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Container, PageHero, Eyebrow, SerifHeading, Button, TextLink } from "@/app/components/fm";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import {
  listEvents,
  listApprovedPhotos,
  getUser,
  galleryConfigured,
  type EventRecord,
  type PhotoRecord,
} from "@/lib/gallery";
import EventPhotoUpload from "./EventPhotoUpload";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events",
  description:
    "The KYX event calendar — HackKentucky, The LOUIES, and more. Photos from the room, submitted by the community.",
};

const LUMA_EMBED = "https://lu.ma/embed/calendar/cal-gyukdJFBvrxa0BO/events";
const LUMA_URL = "https://lu.ma/kycombinator";

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

// A single event series: heading, cadence, next-occurrence line (or TBD), and a
// grid of approved community photos with attribution.
function EventSection({
  event,
  photos,
  shaded,
  signedIn,
  submitterName,
}: {
  event: EventRecord;
  photos: PhotoRecord[];
  shaded: boolean;
  signedIn: boolean;
  submitterName: string;
}) {
  const hasLink = !!event.href && event.href !== "/events";
  const external = isExternal(event.href);
  return (
    <section className={"border-b border-[#16130f]" + (shaded ? " bg-[#eae5da]" : "")}>
      <Container className="flex flex-col gap-8 py-14 lg:py-[72px]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-12">
          <div className="flex flex-col gap-3">
            {event.when && <Eyebrow>{event.when}</Eyebrow>}
            <SerifHeading className="text-[32px] leading-none md:text-[44px]">
              {event.name}
            </SerifHeading>
            {event.tagline && (
              <p className="max-w-[560px] text-[17px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
                {event.tagline}
              </p>
            )}
          </div>

          {/* Next event */}
          <div className="flex flex-col gap-2 border-t border-[#d8d2c5] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.12em] text-[#7d766a]">
              Next event
            </span>
            <span className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-none text-[#16130f]">
              {event.nextDate || "Date TBD"}
            </span>
            {hasLink ? (
              <a
                href={event.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="mt-1 inline-flex w-fit border-b border-[var(--kyx-purple)] pb-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#16130f] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
              >
                {event.action || "Register"} →
              </a>
            ) : (
              <span className="mt-1 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#a39c8d]">
                Details coming soon
              </span>
            )}
          </div>
        </div>

        {photos.length > 0 && (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <figure key={photo.id} className="border border-[#d8d2c5]">
                <div className="aspect-[4/3] overflow-hidden bg-[#e2ddd1]">
                  {/* External public S3 URLs — plain <img>, not next/image. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={event.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="border-t border-[#d8d2c5] px-2 py-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] text-[#7d766a]">
                  Photo by {photo.submitterName}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <EventPhotoUpload
          eventId={event.id}
          eventName={event.name}
          signedIn={signedIn}
          submitterName={submitterName}
        />
      </Container>
    </section>
  );
}

export default async function EventsPage() {
  const configured = galleryConfigured();
  const events: EventRecord[] = configured
    ? (await listEvents()).filter((e) => e.published)
    : [];
  const photos: PhotoRecord[] = configured ? await listApprovedPhotos() : [];

  // Resolve the viewer's session so photo uploads can be login-gated and
  // attributed automatically (no name/email typing).
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  const signedIn = !!session;
  let submitterName = "";
  if (session) {
    const user = configured ? await getUser(session.email) : null;
    submitterName = user?.name || session.email.split("@")[0];
  }

  const photosByEvent = new Map<string, PhotoRecord[]>();
  for (const photo of photos) {
    const list = photosByEvent.get(photo.eventId);
    if (list) list.push(photo);
    else photosByEvent.set(photo.eventId, [photo]);
  }

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Vote with your feet."
        intro="Events are open to all. We encourage you to show up. Below: what we host, when the next one lands, and photos from the room."
      >
        <Button href={LUMA_URL} variant="primary">
          View all events
        </Button>
      </PageHero>

      {/* One section per event series */}
      {events.map((event, i) => (
        <EventSection
          key={event.id}
          event={event}
          photos={photosByEvent.get(event.id) ?? []}
          shaded={i % 2 === 1}
          signedIn={signedIn}
          submitterName={submitterName}
        />
      ))}

      {/* Empty state — no series created yet */}
      {events.length === 0 && (
        <section className="border-b border-[#16130f]">
          <Container className="py-14 lg:py-[72px]">
            <p className="max-w-[640px] text-[19px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              Our event lineup is being set up. In the meantime, the live calendar below
              has everything that&apos;s currently on the books.
            </p>
          </Container>
        </section>
      )}

      {/* Live calendar */}
      <section>
        <Container className="flex flex-col gap-6 py-16 lg:py-[72px]">
          <div className="flex items-end justify-between gap-8">
            <SerifHeading className="text-[28px] leading-none md:text-[36px]">
              The live calendar.
            </SerifHeading>
            <TextLink href={LUMA_URL}>Open in Luma →</TextLink>
          </div>
          <div className="border border-[#d8d2c5] bg-[#eae5da] p-3 md:p-5">
            <iframe
              src={LUMA_EMBED}
              width="100%"
              height="100%"
              className="min-h-[450px] w-full"
              allowFullScreen={true}
              aria-hidden="false"
            ></iframe>
          </div>
        </Container>
      </section>
    </>
  );
}
