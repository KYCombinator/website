"use client";
import { useState, type FormEvent } from "react";
import { awards2026 } from "@/data/louies2026";
const field = "mt-2 block w-full border border-[#cec7b8] bg-[#f9f7f2] p-3 focus:outline-2 focus:outline-[var(--kyx-purple)]";
export default function NominationForm() {
  const [nomineeCounts, setNomineeCounts] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    const data = new FormData(event.currentTarget);
    const nominations = awards2026.flatMap(a => Array.from({ length: nomineeCounts[a.id] || 1 }, (_, index) => ({ awardId: a.id,
      nominee: String(data.get(`${a.id}-${index}-nominee`) || "").trim(),
      organization: String(data.get(`${a.id}-${index}-organization`) || "").trim(),
      reason: String(data.get(`${a.id}-${index}-reason`) || "").trim(),
    }))).filter(n => n.nominee || n.organization || n.reason);
    if (!nominations.length || nominations.some(n => !n.nominee)) {
      setError("Add a nominee name for each nomination you started. You can skip any award; company and reason are optional."); return;
    }
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/louies/nominate", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), email: data.get("email"), website: data.get("website"), favoriteKyxLead: data.get("favoriteKyxLead") || undefined, nominations }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn't save your nominations.");
      setReceipt(result.id);
    } catch (e) { setError(e instanceof Error ? e.message : "Please try again."); }
    finally { setBusy(false); }
  }
  if (receipt) return <div role="status"><h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl">Nominations received.</h2>
    <p className="mt-4">Thank you for celebrating Louisville. Your nominations have been saved for the Louies organizers.</p>
    <p className="mt-4 text-sm">Confirmation: {receipt}</p></div>;
  return <form onSubmit={submit} className="space-y-10">
    <p>You don’t have to nominate for every award. Skip any you like, and nominate more than one person for each award. Use “Add another nominee” for each additional person. Only the nominee’s name is required for each nomination; company and reason are optional.</p>
    <fieldset className="grid gap-5 sm:grid-cols-2"><legend className="mb-4 font-medium">Your details</legend>
      <label>Your name<input className={field} name="name" autoComplete="name" required maxLength={160} /></label>
      <label>Your email<input className={field} name="email" type="email" autoComplete="email" required maxLength={200} /></label>
    </fieldset>
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    {awards2026.map(a => <fieldset key={a.id} className="border-t border-[#cec7b8] pt-7 space-y-4">
      <legend className="pr-4 text-xl font-medium">{a.name}</legend><p className="text-[#4a443a]">{a.description}</p>
      {Array.from({ length: nomineeCounts[a.id] || 1 }, (_, index) => <div key={index} className="space-y-4 border-l-2 border-[#cec7b8] pl-4">
        <p className="text-sm font-medium">Nominee {index + 1}</p>
        <label className="block">Nominee name<input name={`${a.id}-${index}-nominee`} className={field} maxLength={200} /></label>
        <label className="block">Company or organization (optional)<input name={`${a.id}-${index}-organization`} className={field} maxLength={200} /></label>
        <label className="block">Why do they deserve this Louie? (optional)<textarea name={`${a.id}-${index}-reason`} className={field} rows={4} maxLength={2000} /></label>
      </div>)}
      <div className="flex flex-wrap gap-4">
        <button type="button" onClick={() => setNomineeCounts(counts => ({ ...counts, [a.id]: (counts[a.id] || 1) + 1 }))}
          className="border border-[#cec7b8] px-4 py-2 text-sm">Add another nominee<span className="sr-only"> for {a.name}</span></button>
        {(nomineeCounts[a.id] || 1) > 1 && <button type="button" onClick={() => setNomineeCounts(counts => ({ ...counts, [a.id]: counts[a.id] - 1 }))}
          className="underline text-sm">Remove last nominee<span className="sr-only"> for {a.name}</span></button>}
      </div>
    </fieldset>)}
    <fieldset className="border-t border-[#cec7b8] pt-7 space-y-4">
      <legend className="pr-4 text-xl font-medium">Popularity Contest</legend>
      <p className="text-lg font-medium">Class President</p>
      <p className="text-[#4a443a]">Who’s your favorite KYX lead? Optional. We definitely won’t let this go to our heads.</p>
      <div className="flex flex-wrap gap-6">
        {["Dan", "Jack", "Rachel"].map(lead => <label key={lead} className="inline-flex items-center gap-2">
          <input type="radio" name="favoriteKyxLead" value={lead} className="accent-[var(--kyx-purple)]" />{lead}
        </label>)}
      </div>
    </fieldset>
    <p className="text-sm text-[#4a443a]">Your contact details and nominations are available to authorized KYX administrators. <a className="underline" href="/privacy">Privacy policy</a></p>
    {error && <p role="alert" className="text-red-800">{error}</p>}
    <button disabled={busy} className="bg-[var(--kyx-purple)] text-white px-6 py-4 disabled:opacity-60">{busy ? "Saving nominations…" : "Submit nominations"}</button>
  </form>;
}
