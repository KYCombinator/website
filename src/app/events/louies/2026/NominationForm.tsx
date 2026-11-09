"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { awards2026, awardSections2026 } from "@/data/louies2026";
import { LOUIES_DRAFT_KEY, blankDraft, blankNominee, parseLouiesDraft, type LouiesDraft, type DraftNominee } from "@/lib/louiesDraft";
const field = "mt-2 block w-full border border-[#cec7b8] bg-[#f9f7f2] p-3 focus:outline-2 focus:outline-[var(--kyx-purple)]";
export default function NominationForm() {
  const [draft, setDraft] = useState<LouiesDraft>(blankDraft);
  const [draftReady, setDraftReady] = useState(false);
  const [draftNotice, setDraftNotice] = useState("Your draft stays in this browser.");
  const edited = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LOUIES_DRAFT_KEY);
      if (saved) { setDraft(parseLouiesDraft(saved)); setDraftNotice("Saved draft restored from this browser."); }
    } catch { setDraftNotice("Your browser couldn’t restore a saved draft. You can still fill out and submit the form."); }
    setDraftReady(true);
  }, []);
  useEffect(() => {
    if (!draftReady || !edited.current || receipt) return;
    try {
      window.localStorage.setItem(LOUIES_DRAFT_KEY, JSON.stringify(draft));
      setDraftNotice("Draft saved in this browser. Refreshing will restore your answers.");
    } catch { setDraftNotice("Your browser couldn’t save this draft. Keep this page open until you submit."); }
  }, [draft, draftReady, receipt]);
  function updateDraft(change: (current: LouiesDraft) => LouiesDraft) { edited.current = true; setDraft(change); }
  function updateNominee(awardId: string, index: number, key: keyof DraftNominee, value: string) {
    updateDraft(current => ({ ...current, nominees: { ...current.nominees,
      [awardId]: (current.nominees[awardId] || [blankNominee()]).map((row, i) => i === index ? { ...row, [key]: value } : row),
    } }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    const data = new FormData(event.currentTarget);
    const nominations = awards2026.flatMap(a => (draft.nominees[a.id] || []).map(row => ({ awardId: a.id,
      nominee: row.nominee.trim(), organization: row.organization.trim(), reason: row.reason.trim(),
    }))).filter(n => n.nominee || n.organization || n.reason);
    if (!nominations.length || nominations.some(n => !n.nominee)) {
      setError("Add a nominee name for each nomination you started. You can skip any award; company and reason are optional."); return;
    }
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/louies/nominate", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: draft.name, email: draft.email, website: data.get("website"), favoriteKyxLead: draft.favoriteKyxLead || undefined, nominations }) });
      const result = await response.json();
      if (!response.ok || result?.ok !== true || typeof result?.id !== "string" || !result.id) throw new Error(result?.error || "We couldn't save your nominations.");
      setReceipt(result.id);
      try { window.localStorage.removeItem(LOUIES_DRAFT_KEY); setDraftNotice(""); }
      catch { setDraftNotice("Your nominations were submitted, but your browser couldn’t clear the saved draft."); }
    } catch (e) { setError(e instanceof Error ? e.message : "Please try again."); }
    finally { setBusy(false); }
  }
  if (receipt) return <div role="status"><h2 className="font-[family-name:var(--font-instrument-serif)] text-4xl">Nominations received.</h2>
    <p className="mt-4">Thank you for celebrating Kentucky. Your nominations have been saved for the Louies organizers.</p>
    <p className="mt-4 text-sm">Confirmation: {receipt}</p>{draftNotice && <p className="mt-4 text-sm">{draftNotice}</p>}</div>;
  return <form onSubmit={submit} className="space-y-10">
    <p>Nominees can be anyone in Kentucky’s startup community. Check each award’s description for any specific eligibility. You don’t have to nominate for every award. Skip any you like, and nominate more than one person or company for each award. Use “Add another nominee” for each additional nominee. Only the nominee’s name is required for each nomination; company and reason are optional.</p>
    <p className="text-sm text-[#4a443a]" role="status">{draftNotice}</p>
    <fieldset className="grid gap-5 sm:grid-cols-2"><legend className="mb-4 font-medium">Your details</legend>
      <label>Your name<input className={field} name="name" value={draft.name} onChange={event => updateDraft(current => ({ ...current, name: event.target.value }))} autoComplete="name" required maxLength={160} /></label>
      <label>Your email<input className={field} name="email" type="email" value={draft.email} onChange={event => updateDraft(current => ({ ...current, email: event.target.value }))} autoComplete="email" required maxLength={200} /></label>
    </fieldset>
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <nav aria-label="Award sections" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
      {awardSections2026.map(section => <a key={section.id} href={`#${section.id}-awards`} className="underline underline-offset-4">{section.name}</a>)}
    </nav>
    {awardSections2026.map(section => <section key={section.id} id={`${section.id}-awards`} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28 border-t-2 border-[var(--kyx-purple)] pt-8 space-y-8">
      <div className="space-y-3">
        <h2 id={`${section.id}-heading`} className="font-[family-name:var(--font-instrument-serif)] text-4xl">{section.name}</h2>
        <p className="text-[#4a443a]">{section.description}</p>
      </div>
      {awards2026.filter(a => a.section === section.id).map(a => <fieldset key={a.id} className="border-t border-[#cec7b8] pt-7 space-y-4">
      <legend className="pr-4 text-xl font-medium">{a.name}</legend><p className="text-[#4a443a]">{a.description}</p>
      {(draft.nominees[a.id] || [blankNominee()]).map((row, index) => <div key={index} className="space-y-4 border-l-2 border-[#cec7b8] pl-4">
        <p className="text-sm font-medium">Nominee {index + 1}</p>
        <label className="block">Nominee name<input name={`${a.id}-${index}-nominee`} value={row.nominee} onChange={event => updateNominee(a.id, index, "nominee", event.target.value)} className={field} maxLength={200} /></label>
        <label className="block">Company or organization (optional)<input name={`${a.id}-${index}-organization`} value={row.organization} onChange={event => updateNominee(a.id, index, "organization", event.target.value)} className={field} maxLength={200} /></label>
        <label className="block">Why do they deserve this Louie? (optional)<textarea name={`${a.id}-${index}-reason`} value={row.reason} onChange={event => updateNominee(a.id, index, "reason", event.target.value)} className={field} rows={4} maxLength={2000} /></label>
      </div>)}
      <div className="flex flex-wrap gap-4">
        <button type="button" onClick={() => updateDraft(current => ({ ...current, nominees: { ...current.nominees, [a.id]: [...(current.nominees[a.id] || [blankNominee()]), blankNominee()] } }))}
          className="border border-[#cec7b8] px-4 py-2 text-sm">Add another nominee<span className="sr-only"> for {a.name}</span></button>
        {(draft.nominees[a.id]?.length || 1) > 1 && <button type="button" onClick={() => updateDraft(current => ({ ...current, nominees: { ...current.nominees, [a.id]: current.nominees[a.id].slice(0, -1) } }))}
          className="underline text-sm">Remove last nominee<span className="sr-only"> for {a.name}</span></button>}
      </div>
    </fieldset>)}
    {section.id === "unserious" && <fieldset className="border-t border-[#cec7b8] pt-7 space-y-4">
      <legend className="pr-4 text-xl font-medium">Popularity Contest</legend>
      <p className="text-lg font-medium">Class President</p>
      <p className="text-[#4a443a]">Who’s your favorite lead? Required. We definitely won’t let this go to our heads.</p>
      <div className="flex flex-wrap gap-6">
        {["Dan", "Jack", "Rachel"].map(lead => <label key={lead} className="inline-flex items-center gap-2">
          <input type="radio" name="favoriteKyxLead" value={lead} checked={draft.favoriteKyxLead === lead} onChange={() => updateDraft(current => ({ ...current, favoriteKyxLead: lead as LouiesDraft["favoriteKyxLead"] }))} className="accent-[var(--kyx-purple)]" />{lead}
        </label>)}
      </div>
    </fieldset>}
    </section>)}
    <p className="text-sm text-[#4a443a]">Your contact details and nominations are available to authorized KYX administrators. <a className="underline" href="/privacy">Privacy policy</a></p>
    {error && <p role="alert" className="text-red-800">{error}</p>}
    <button disabled={busy} className="bg-[var(--kyx-purple)] text-white px-6 py-4 disabled:opacity-60">{busy ? "Saving nominations…" : "Submit nominations"}</button>
  </form>;
}
