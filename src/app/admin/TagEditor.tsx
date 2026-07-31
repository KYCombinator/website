"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TaggableKind } from "@/lib/gallery";

const metaCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]";

// Per-submission tag editor. Add tags (Enter or comma) and remove with ×;
// each change persists to /api/admin/tags. Shared across the admin managers.
export default function TagEditor({
  kind,
  id,
  tags: initial,
}: {
  kind: TaggableKind;
  id: string;
  tags: string[];
}) {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>(initial ?? []);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(next: string[]) {
    setBusy(true);
    setTags(next);
    try {
      await fetch("/api/admin/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, id, tags: next }),
      });
      router.refresh();
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  function add() {
    const t = input.trim().replace(/,$/, "").trim();
    setInput("");
    if (!t) return;
    if (tags.some((x) => x.toLowerCase() === t.toLowerCase())) return;
    save([...tags, t]);
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#e2ddd1] pt-4">
      <span className={metaCls}>Tags</span>
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 border border-[#cec7b8] bg-[#eae5da] px-2 py-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[#16130f]"
        >
          {t}
          <button
            type="button"
            aria-label={`Remove ${t}`}
            disabled={busy}
            onClick={() => save(tags.filter((x) => x !== t))}
            className="text-[#b3261e] hover:opacity-70 disabled:opacity-60"
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          }
        }}
        onBlur={add}
        placeholder="add tag…"
        className="w-28 border border-[#cec7b8] bg-transparent px-2 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f]"
      />
    </div>
  );
}
