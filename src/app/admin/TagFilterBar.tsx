"use client";

const metaCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]";

// Tag filter chips for an admin manager. Multi-select (OR); clicking a chip
// toggles it. Rendered only when there are tags to filter by.
export default function TagFilterBar({
  all,
  selected,
  onToggle,
  onClear,
  count,
  total,
}: {
  all: string[];
  selected: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
  count: number;
  total: number;
}) {
  if (all.length === 0) return null;
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className={metaCls}>Filter by tag</span>
      {all.map((t) => {
        const on = selected.includes(t);
        return (
          <button
            key={t}
            type="button"
            onClick={() => onToggle(t)}
            aria-pressed={on}
            className={
              "border px-2.5 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] transition-colors duration-150 " +
              (on
                ? "border-[var(--kyx-purple)] bg-[var(--kyx-purple)] text-[#f9f7f2]"
                : "border-[#cec7b8] text-[#16130f] hover:border-[#16130f]")
            }
          >
            {t}
          </button>
        );
      })}
      {selected.length > 0 && (
        <>
          <button
            type="button"
            onClick={onClear}
            className="border border-[#cec7b8] px-2.5 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f]"
          >
            Clear
          </button>
          <span className={metaCls}>
            {count} of {total}
          </span>
        </>
      )}
    </div>
  );
}
