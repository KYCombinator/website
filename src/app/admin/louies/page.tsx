import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import { galleryConfigured, listLouiesNominations } from "@/lib/gallery";
import { awards2026, retiredLouieNames } from "@/data/louies2026";
import { Container, PageHero } from "@/app/components/fm";
export const dynamic = "force-dynamic";
export default async function LouiesAdmin() {
  const session = verifySession(cookies().get(SESSION_COOKIE)?.value);
  if (session?.role !== "admin") redirect("/login?redirect=/admin/louies");
  const records = galleryConfigured() ? await listLouiesNominations() : [];
  return <><PageHero eyebrow="KYX Admin" title="Louies 2026 nominations." />
    <Container className="py-10"><a className="underline" href="/admin">Back to dashboard</a>
      <p className="my-6">{records.length} submissions</p>
      {!galleryConfigured() && <p>Nomination storage is not configured in this environment.</p>}
      {records.map(r => <article key={r.id} className="border-t border-[#cec7b8] py-6">
        <h2 className="text-xl">{r.name} · {r.email}</h2><p className="text-sm">{r.createdAt} · {r.id}</p>
        <p className="mt-4">Class President · Popularity Contest: {r.favoriteKyxLead || "No vote"}</p>
        {r.nominations.map((n, index) => <div key={`${n.awardId}-${index}`} className="mt-5">
          <h3 className="font-medium">{awards2026.find(a => a.id === n.awardId)?.name || retiredLouieNames[n.awardId] || n.awardId}</h3>
          <p>{n.nominee}{n.organization && ` · ${n.organization}`}</p><p className="whitespace-pre-wrap mt-2">{n.reason}</p>
        </div>)}
      </article>)}
    </Container></>;
}
