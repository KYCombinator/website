export const dynamic = "force-dynamic";

import {
  listPendingPhotos,
  listEvents,
  listApplications,
  galleryConfigured,
  type PhotoRecord,
  type EventRecord,
  type ApplicationRecord,
} from "@/lib/gallery";
import { Container, Eyebrow, SerifHeading } from "../components/fm";
import AdminHeader from "./AdminHeader";
import PhotoQueue from "./PhotoQueue";
import EventsManager from "./EventsManager";
import Applications from "./Applications";

export default async function AdminPage() {
  if (!galleryConfigured()) {
    return (
      <main>
        <AdminHeader />
        <Container className="py-10">
          <Eyebrow>Storage</Eyebrow>
          <SerifHeading className="mt-2 text-[32px] leading-none">Not configured yet.</SerifHeading>
          <p className="mt-4 max-w-[560px] text-[15px] leading-[1.6] text-[#4a443a]">
            The gallery table and photo bucket aren&apos;t linked in this environment, so there&apos;s
            nothing to manage. Set them up in the deployment before using this dashboard.
          </p>
        </Container>
      </main>
    );
  }

  const [pending, events, applications]: [
    PhotoRecord[],
    EventRecord[],
    ApplicationRecord[],
  ] = await Promise.all([listPendingPhotos(), listEvents(), listApplications()]);

  const eventNames: Record<string, string> = {};
  for (const e of events) eventNames[e.id] = e.name;

  return (
    <main>
      <AdminHeader />

      <Container className="py-10">
        <Eyebrow>Pending photos · {pending.length}</Eyebrow>
        <SerifHeading className="mb-6 mt-2 text-[32px] leading-none">Pending photos.</SerifHeading>
        <PhotoQueue photos={pending} eventNames={eventNames} />
      </Container>

      <Container className="py-10">
        <Eyebrow>Events · {events.length}</Eyebrow>
        <SerifHeading className="mb-6 mt-2 text-[32px] leading-none">Events.</SerifHeading>
        <EventsManager events={events} />
      </Container>

      <Container className="py-10">
        <Eyebrow>Applications · {applications.length}</Eyebrow>
        <SerifHeading className="mb-6 mt-2 text-[32px] leading-none">Applications.</SerifHeading>
        <Applications items={applications} />
      </Container>
    </main>
  );
}
