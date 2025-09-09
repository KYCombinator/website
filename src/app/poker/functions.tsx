import { LeaderboardRow, Player, RatingRow, MatrixPair } from "@/types/poker";

export function SectionCard({ title, children, right }: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 shadow">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white">{title}</h2>
        {right}
      </div>
      {children}
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return <span className="px-2 py-1 rounded-full bg-neutral-800 text-neutral-200 text-xs whitespace-nowrap">{children}</span>;
}

export function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="text-neutral-400 text-xs">{label}</span>
      <span className="text-white text-base font-medium">{value}</span>
    </div>
  );
}

export function Modal({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: React.ReactNode; title: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full sm:w-[520px] bg-neutral-950 border border-neutral-800 rounded-t-2xl sm:rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <button
            className="text-neutral-400 hover:text-white transition"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Select({ value, onChange, options, id, label }: { value: string; onChange: (v: string) => void; options: {value:string; label:string}[]; id: string; label: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-neutral-300 text-sm">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="" disabled>
          Select...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Input({ value, onChange, id, label, type = "text", placeholder }: { value: string | number; onChange: (v: string) => void; id: string; label: string; type?: string; placeholder?: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-neutral-300 text-sm">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </label>
  );
}

// --- Render helpers ---
export function RatingList({ ratings }: { ratings: RatingRow[] }) {
  if (!ratings.length) return <div className="text-neutral-400">No ratings yet.</div>;
  return (
    <div className="divide-y divide-neutral-800">
      {[...ratings]
        .sort((a, b) => b.rating - a.rating)
        .map((r) => (
          <div key={r.playerId} className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-white">{r.name} <span className="italic">{r.nickname}</span></span>
            </div>
            <span className="text-neutral-300">{r.rating}</span>
          </div>
        ))}
    </div>
  );
}

export function Leaderboard({ title, rows }: { title: string; rows: LeaderboardRow[] }) {
  return (
    <SectionCard title={title}>
      {!rows?.length ? (
        <div className="text-neutral-400">No results yet this period.</div>
      ) : (
        <div className="divide-y divide-neutral-800">
          {rows.map((r, idx) => (
            <div key={r.playerId} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-6 text-right text-neutral-500">{idx + 1}</div>
                <div className="text-white font-medium">{r.name}</div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Pill>W {r.wins}</Pill>
                <Pill>L {r.losses}</Pill>
                <Pill>Δ {r.diff}</Pill>
                <span className="text-neutral-400 hidden sm:inline">|</span>
                <span className="text-neutral-300 hidden sm:inline">{r.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

export function Matrix({ players, ratings, matrix }: { players: Player[]; ratings: RatingRow[]; matrix: MatrixPair[] }) {
  // Build an index of pokerId -> name
  const name = new Map(players.map((p) => [p.pokerId, p.name] as const));
  // Build a sorted unique list of players present in ratings or players list
  const ids = Array.from(new Set([ ...players.map(p => p.pokerId), ...ratings.map(r => r.playerId) ]));

  // Map {a,b} -> "winsA-winsB"
  const grid = new Map<string, { a:string; b:string; winsA:number; winsB:number }>();
  for (const p of matrix) {
    const key = `${p.a}::${p.b}`;
    grid.set(key, { a:p.a, b:p.b, winsA:p.winsA, winsB:p.winsB });
  }

  return (
    <SectionCard title="Head-to-Head Matrix">
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 bg-neutral-950 text-left p-2 text-neutral-400">Player \\ Opp.</th>
              {ids.map((b) => (
                <th key={b} className="p-2 text-neutral-400 whitespace-nowrap">{name.get(b) || b}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ids.map((a) => (
              <tr key={a} className="border-t border-neutral-800">
                <td className="sticky left-0 bg-neutral-950 p-2 font-medium text-white">{name.get(a) || a}</td>
                {ids.map((b) => (
                  <td key={b} className="p-2 text-center text-neutral-200">
                    {a === b ? (
                      <span className="text-neutral-600">—</span>
                    ) : (
                      (() => {
                        const cell = grid.get(`${a}::${b}`);
                        if (!cell) return <span className="text-neutral-600">0-0</span>;
                        return <span>{cell.winsA}-{cell.winsB}</span>;
                      })()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}