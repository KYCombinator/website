import type { Metadata } from "next";
import { Container, PageHero, Eyebrow, SerifHeading, TextLink } from "../components/fm";
import {
  listEvents,
  listApprovedPhotos,
  galleryConfigured,
  type EventRecord,
  type PhotoRecord,
} from "@/lib/gallery";
import AddPhoto from "./AddPhoto";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from KYX events — submitted by the community.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/gallery" }],
  openGraph: { images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`] },
  icons: { icon: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png` },
};

export default async function GalleryPage() {
  if (!galleryConfigured()) {
    return (
      <>
        <PageHero
          eyebrow="Gallery"
          title="The room, in photos."
          intro="Moments from KYX events — submitted by the community."
        >
          <TextLink href="/events">See upcoming events →</TextLink>
        </PageHero>
        <section>
          <Container className="py-16 lg:py-20">
            <p className="max-w-[640px] text-[19px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              The gallery is still being set up. Check back soon — event photos from the community
              will live here.
            </p>
          </Container>
        </section>
      </>
    );
  }

  const events: EventRecord[] = (await listEvents()).filter((e) => e.published);
  const photos: PhotoRecord[] = await listApprovedPhotos();

  const photosByEvent = new Map<string, PhotoRecord[]>();
  for (const photo of photos) {
    const list = photosByEvent.get(photo.eventId);
    if (list) list.push(photo);
    else photosByEvent.set(photo.eventId, [photo]);
  }

  const eventsWithPhotos = events.filter((e) => (photosByEvent.get(e.id)?.length ?? 0) >= 1);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The room, in photos."
        intro="Moments from KYX events — submitted by the community."
      >
        <TextLink href="/events">See upcoming events →</TextLink>
      </PageHero>

      {/* Add a photo */}
      <section className="border-b border-[#16130f]">
        <Container className="flex flex-col gap-8 py-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Contribute</Eyebrow>
            <SerifHeading className="text-[28px] leading-none md:text-[36px]">
              Add a photo.
            </SerifHeading>
            <p className="max-w-[560px] text-[15px] leading-[1.6] text-[#4a443a]">
              Were you in the room? Share a shot. Submissions are reviewed before they appear here.
            </p>
          </div>
          <AddPhoto events={events.map((e) => ({ id: e.id, name: e.name }))} />
        </Container>
      </section>

      {eventsWithPhotos.length === 0 ? (
        <section>
          <Container className="py-16 lg:py-20">
            <p className="max-w-[640px] text-[19px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              No photos yet. Be the first to add one from a recent KYX event.
            </p>
          </Container>
        </section>
      ) : (
        eventsWithPhotos.map((event, i) => {
          const eventPhotos = photosByEvent.get(event.id) ?? [];
          return (
            <section
              key={event.id}
              className={"border-b border-[#16130f]" + (i % 2 === 1 ? " bg-[#eae5da]" : "")}
            >
              <Container className="flex flex-col gap-8 py-14 lg:py-[72px]">
                <div className="flex flex-col gap-3">
                  <Eyebrow>{event.when || event.month}</Eyebrow>
                  <SerifHeading className="text-[28px] md:text-[36px]">{event.name}</SerifHeading>
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                  {eventPhotos.map((photo) => (
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
              </Container>
            </section>
          );
        })
      )}
    </>
  );
}
