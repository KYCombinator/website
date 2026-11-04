import { awards2026 } from "@/data/louies2026";

export const LOUIES_DRAFT_KEY = "kyx:louies:2026:nomination-draft:v1";
export type DraftNominee = { nominee: string; organization: string; reason: string };
export type LouiesDraft = {
  name: string;
  email: string;
  favoriteKyxLead: "" | "Dan" | "Jack" | "Rachel";
  nominees: Record<string, DraftNominee[]>;
};
export const blankNominee = (): DraftNominee => ({ nominee: "", organization: "", reason: "" });
export const blankDraft = (): LouiesDraft => ({ name: "", email: "", favoriteKyxLead: "", nominees: {} });
const text = (value: unknown, max: number) => typeof value === "string" ? value.slice(0, max) : "";

// Treat browser storage as untrusted: restore known fields and active award IDs only.
export function parseLouiesDraft(raw: string): LouiesDraft {
  if (raw.length > 1_000_000) throw new Error("Draft is too large");
  const value = JSON.parse(raw);
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid draft");
  const result = blankDraft();
  result.name = text(value.name, 160);
  result.email = text(value.email, 200);
  result.favoriteKyxLead = ["Dan", "Jack", "Rachel"].includes(value.favoriteKyxLead) ? value.favoriteKyxLead : "";
  for (const award of awards2026) {
    const rows = value.nominees?.[award.id];
    if (!Array.isArray(rows)) continue;
    result.nominees[award.id] = rows.slice(0, 200).map(row => ({
      nominee: text(row?.nominee, 200), organization: text(row?.organization, 200), reason: text(row?.reason, 2000),
    }));
    if (!result.nominees[award.id].length) result.nominees[award.id] = [blankNominee()];
  }
  return result;
}
