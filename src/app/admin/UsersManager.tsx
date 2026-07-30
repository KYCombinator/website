"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UserRecord, UserRole } from "@/lib/gallery";

const fieldCls =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";
const metaCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#57503f]";

const primaryBtn =
  "inline-flex items-center justify-center bg-[var(--kyx-purple)] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const outlineBtn =
  "inline-flex items-center justify-center border border-[#cec7b8] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const destructiveBtn =
  "inline-flex items-center justify-center border border-[#e0b4ae] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#b3261e] transition-colors duration-150 hover:bg-[#f3e3e0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";

type Draft = {
  email: string;
  name: string;
  role: UserRole;
};

const emptyDraft: Draft = {
  email: "",
  name: "",
  role: "member",
};

function RolePill({ role }: { role: UserRole }) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.1em] ${
        role === "admin"
          ? "border-[var(--kyx-purple)] text-[var(--kyx-purple)]"
          : "border-[#cec7b8] text-[#8a8272]"
      }`}
    >
      {role}
    </span>
  );
}

const filterFieldCls =
  "border border-[#cec7b8] bg-transparent px-3 py-2 text-[14px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";

export default function UsersManager({ users }: { users: UserRecord[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);

  // Search + filters (client-side over the loaded list).
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");
  const [cbFilter, setCbFilter] = useState<"all" | "yes" | "no">("all");

  const q = query.trim().toLowerCase();
  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (cbFilter === "yes" && !u.cinderblock) return false;
    if (cbFilter === "no" && u.cinderblock) return false;
    if (q && !`${u.name} ${u.email}`.toLowerCase().includes(q)) return false;
    return true;
  });
  const filtersActive = q !== "" || roleFilter !== "all" || cbFilter !== "all";

  const set =
    (k: keyof Draft) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setDraft((d) => (d ? { ...d, [k]: value } : d));
    };

  async function save() {
    if (!draft || busy) return;
    if (!draft.email.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: draft.email,
          name: draft.name,
          role: draft.role,
        }),
      });
      if (res.ok) {
        setDraft(null);
        router.refresh();
      }
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  async function toggleCinderblock(u: UserRecord) {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: u.email,
          name: u.name,
          role: u.role,
          cinderblock: !u.cinderblock,
        }),
      });
      if (res.ok) router.refresh();
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  async function remove(email: string) {
    if (busy) return;
    if (!window.confirm(`Delete ${email}? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) router.refresh();
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={primaryBtn} disabled={busy} onClick={() => setDraft({ ...emptyDraft })}>
          Add user
        </button>
      </div>

      {draft && (
        <div className="border border-[#d8d2c5] bg-[#eae5da] p-6">
          <p className={`${metaCls} mb-4`}>New user</p>
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Email *</span>
                <input className={fieldCls} value={draft.email} onChange={set("email")} type="email" placeholder="name@example.com" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Name</span>
                <input className={fieldCls} value={draft.name} onChange={set("name")} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Role</span>
                <select className={fieldCls} value={draft.role} onChange={set("role")}>
                  <option value="member">member</option>
                  <option value="admin">admin</option>
                </select>
              </label>
            </div>
            <div className="flex gap-2">
              <button type="button" className={primaryBtn} disabled={busy} onClick={save}>
                {busy ? "Saving…" : "Save"}
              </button>
              <button type="button" className={outlineBtn} disabled={busy} onClick={() => setDraft(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {users.length === 0 ? (
        <p className="text-[15px] text-[#4a443a]">No users yet.</p>
      ) : (
        <>
          {/* Search + filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or email…"
                aria-label="Search users"
                className={`${filterFieldCls} w-full sm:w-64`}
              />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as "all" | UserRole)}
                aria-label="Filter by role"
                className={filterFieldCls}
              >
                <option value="all">All roles</option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
              <select
                value={cbFilter}
                onChange={(e) => setCbFilter(e.target.value as "all" | "yes" | "no")}
                aria-label="Filter by Cinderblock membership"
                className={filterFieldCls}
              >
                <option value="all">All Cinderblock</option>
                <option value="yes">Cinderblock members</option>
                <option value="no">Not members</option>
              </select>
              {filtersActive && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setRoleFilter("all");
                    setCbFilter("all");
                  }}
                  className={outlineBtn}
                >
                  Clear
                </button>
              )}
            </div>
            <span className={metaCls}>
              {filtered.length} of {users.length}
            </span>
          </div>

          {filtered.length === 0 ? (
            <p className="text-[15px] text-[#4a443a]">No users match your search.</p>
          ) : (
        <div className="overflow-x-auto border border-[#d8d2c5]">
          <table className="w-full border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#d8d2c5]">
                {["Email", "Name", "Role", "Cinderblock", ""].map((h, i) => (
                  <th key={i} className={`${metaCls} px-4 py-3`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.email} className="border-b border-[#d8d2c5] align-top last:border-b-0">
                  <td className="px-4 py-3 text-[#16130f]">{u.email}</td>
                  <td className="px-4 py-3 text-[#4a443a]">{u.name}</td>
                  <td className="px-4 py-3">
                    <RolePill role={u.role} />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => toggleCinderblock(u)}
                      aria-pressed={!!u.cinderblock}
                      title="Toggle Cinderblock membership"
                      className={
                        "inline-flex items-center gap-2 border px-2.5 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.1em] transition-colors duration-150 disabled:opacity-60 " +
                        (u.cinderblock
                          ? "border-[var(--kyx-purple)] bg-[var(--kyx-purple)] text-[#f9f7f2] hover:bg-[#4f29a6]"
                          : "border-[#cec7b8] text-[#8a8272] hover:border-[#16130f]")
                      }
                    >
                      {u.cinderblock ? "Member ✓" : "Not a member"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" className={destructiveBtn} disabled={busy} onClick={() => remove(u.email)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          )}
        </>
      )}
    </div>
  );
}
