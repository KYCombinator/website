import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Container, PageHero, Eyebrow, SerifHeading } from "@/app/components/fm";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import {
  listUsers,
  listOutgoingAccess,
  galleryConfigured,
  type UserRecord,
  type ProfileItem,
} from "@/lib/gallery";
import BookingAccessButton, { type AccessState } from "./BookingAccessButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Directory | KYX",
  description: "The people in the KYX network.",
};

function initialOf(u: UserRecord) {
  return (u.name || u.email || "?").trim().charAt(0).toUpperCase();
}

// A labeled list of profile items; each renders as a link when it has a url.
function ItemList({ label, items }: { label: string; items: ProfileItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.1em] text-[#7d766a]">
        {label}
      </span>
      <ul className="flex flex-col gap-1">
        {items.map((it, i) => (
          <li key={i} className="text-[14px] leading-[1.45] text-[#4a443a]">
            {it.url ? (
              <a
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-[#c6bfae] transition-colors duration-150 hover:border-[var(--kyx-purple)]"
              >
                {it.text} ↗
              </a>
            ) : (
              it.text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function DirectoryPage() {
  const users: UserRecord[] = galleryConfigured() ? await listUsers() : [];
  // Everyone with a name shows up; sort by name.
  const people = users
    .filter((u) => (u.name || "").trim().length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  // The viewer's access status per person (self / approved / pending / none).
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  const viewer = session?.email.toLowerCase() ?? "";
  const statusByTarget = new Map<string, "pending" | "approved" | "denied">();
  if (viewer && galleryConfigured()) {
    for (const a of await listOutgoingAccess(viewer)) statusByTarget.set(a.target, a.status);
  }
  const accessFor = (email: string): AccessState => {
    const e = email.toLowerCase();
    if (e === viewer) return "self";
    return statusByTarget.get(e) === "approved" ? "approved" : statusByTarget.get(e) === "pending" ? "pending" : "none";
  };

  return (
    <>
      <PageHero
        eyebrow="Directory"
        title="The network."
        intro="The people in the room. Find someone, see what they're building, and request time with them."
      />

      <section>
        <Container className="py-14 lg:py-[72px]">
          {people.length === 0 ? (
            <p className="max-w-[640px] text-[19px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              No one to show yet. As members fill out their profiles, they&apos;ll appear here.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {people.map((u) => (
                <div key={u.email} className="flex flex-col gap-4 border border-[#d8d2c5] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-[#d8d2c5] bg-[#eae5da]">
                      {u.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={u.photoUrl} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="font-[family-name:var(--font-instrument-serif)] text-[22px] leading-none text-[#57503f]">
                          {initialOf(u)}
                        </span>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate font-[family-name:var(--font-instrument-serif)] text-[22px] leading-tight text-[#16130f]">
                        {u.name}
                      </span>
                      {u.company && (
                        <span className="truncate text-[14px] text-[#7d766a]">{u.company}</span>
                      )}
                    </div>
                  </div>

                  {u.cinderblock && (
                    <span className="w-fit border border-[var(--kyx-purple)] px-2 py-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--kyx-purple)]">
                      Cinderblock
                    </span>
                  )}

                  <ItemList label="Working on" items={u.working ?? []} />
                  <ItemList label="Needs help with" items={u.needs ?? []} />

                  {(() => {
                    const state = accessFor(u.email);
                    const reveal = state === "self" || state === "approved";
                    return (
                      <BookingAccessButton
                        targetEmail={u.email}
                        targetName={u.name}
                        hasBooking={!!u.bookingLink}
                        initialState={state}
                        bookingUrl={reveal ? u.bookingLink : undefined}
                      />
                    );
                  })()}
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
