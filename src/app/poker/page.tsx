'use client'

import React, { useEffect, useState } from "react";
import { Player, RatingRow, LeaderboardRow } from "@/types/poker";
import { getAllPlayers, createMatch } from "@/lib/api";
import { SectionCard, Pill, Stat, Modal, Select, Input, RatingList, Leaderboard } from "./functions";

export default function PokerPage() {
  // --- UI state ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Data from API
  const [players, setPlayers] = useState<Player[]>([]);

  // Derived data for UI
  const ratings: RatingRow[] = players.map(p => ({
    playerId: p.pokerId,
    name: p.name,
    nickname: p.nickname,
    rating: p.elo
  }));

  const weekLB: LeaderboardRow[] = players.map(p => ({
    playerId: p.pokerId,
    name: p.name,
    wins: p.wins || 0,
    losses: p.losses || 0,
    diff: (p.wins || 0) - (p.losses || 0),
    rating: p.elo
  })).sort((a, b) => b.wins - a.wins);

  const monthLB: LeaderboardRow[] = players.map(p => ({
    playerId: p.pokerId,
    name: p.name,
    wins: p.wins || 0,
    losses: p.losses || 0,
    diff: (p.wins || 0) - (p.losses || 0),
    rating: p.elo
  })).sort((a, b) => b.wins - a.wins);

  // Find the current King of the Block
  const currentKing = players.find(p => p.isKingOfTheBlock);

  // Add-Match modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [pokerId, setpokerId] = useState<string>("");
  const [opponentId, setOpponentId] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [startingBB, setStartingBB] = useState<string>("100");
  const [winnerId, setWinnerId] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  // --- Fetch helpers ---
  async function refetchAll() {
    setLoading(true);
    setError("");
    try {
      const [pl] = await Promise.all([
        getAllPlayers(),
      ]);
      setPlayers(pl);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refetchAll();
  }, []);

  // --- Add Match ---
  function resetForm() {
    setDate(new Date().toISOString().slice(0, 10));
    setpokerId("");
    setOpponentId("");
    setAmount("0");
    setStartingBB("100");
    setWinnerId("");
    setFormError("");
  }

  function openModal() {
    resetForm();
    setIsModalOpen(true);
  }

  async function submitMatch() {
    // Basic validation
    if (!date || !pokerId || !opponentId || !winnerId) {
      setFormError("All fields are required (date, players, winner).");
      return;
    }
    if (pokerId === opponentId) {
      setFormError("Player and opponent must be different.");
      return;
    }
    if (winnerId !== pokerId && winnerId !== opponentId) {
      setFormError("Winner must be either the player or the opponent.");
      return;
    }

    try {
      setFormError("");
      await createMatch({
        date,
        player1Id: pokerId,
        player2Id: opponentId,
        winnerId,
        amount: Number(amount),
        blinds: Number(startingBB),
      });
      
      setIsModalOpen(false);
      // After posting, refetch everything so ratings/leaderboards/matrix/king refresh
      await refetchAll();
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : "Failed to save match");
    }
  }

  // --- Render page ---
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* King of the Block */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-primary-500 to-primary-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-secondary-500 grid place-items-center text-2xl">👑</div>
            <div>
              <div className="text-neutral-300 text-sm">King of the Block</div>
              <div className="text-white text-2xl font-bold leading-tight">
                {currentKing ? (
                  <>
                    {currentKing.name} <span className="italic font-normal">{currentKing.nickname}</span>
                  </>
                ) : loading ? "Loading…" : "No king yet"}
              </div>
              {currentKing && (
                <div className="text-neutral-300">
                  Rating {currentKing.elo} • {currentKing.kingCount || 0} wins as king
                  {currentKing.kingOfTheBlockSince && (
                    <span> • since {new Date(currentKing.kingOfTheBlockSince).toLocaleDateString()}</span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Stat label="Players" value={<span>{players.length}</span>} />
            {/* <Stat label="Matches" value={<span>{matches.length}</span>} /> */}
            <button
              onClick={openModal}
              className="bg-white/90 hover:bg-white text-neutral-900 font-semibold px-4 py-2 rounded-xl transition"
            >
              + Add Match
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Ratings + Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <SectionCard title="Ratings" right={<Pill>Live</Pill>}>
          {loading ? <div className="text-neutral-400">Loading…</div> : <RatingList ratings={ratings} />}
        </SectionCard>
        <Leaderboard title="This Week" rows={weekLB} />
        <Leaderboard title="This Month" rows={monthLB} />
      </div>

      {/* Matrix */}
      {/* <Matrix /> */}

      {/* Recent Matches */}
      {/* <SectionCard title="Recent Matches" right={<Pill>{matches.length}</Pill>}>
        {!matches.length ? (
          <div className="text-neutral-400">Add your first match to get started.</div>
        ) : (
          <div className="overflow-auto -mx-2 sm:mx-0">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-neutral-400">
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Player</th>
                  <th className="p-2 text-left">Opponent</th>
                  <th className="p-2 text-left">Winner</th>
                  <th className="p-2 text-right">Wager</th>
                  <th className="p-2 text-right">Start BB</th>
                </tr>
              </thead>
              <tbody>
                {[...matches]
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((m) => (
                    <tr key={m.matchId} className="border-t border-neutral-800 text-neutral-200">
                      <td className="p-2 whitespace-nowrap">{m.date}</td>
                      <td className="p-2">{players.find(p=>p.pokerId===m.pokerIdA)?.name || m.pokerIdA}</td>
                      <td className="p-2">{players.find(p=>p.pokerId===m.pokerIdB)?.name || m.pokerIdB}</td>
                      <td className="p-2">{players.find(p=>p.pokerId===m.winnerId)?.name || m.winnerId}</td>
                      <td className="p-2 text-right">${m.amount.toLocaleString()}</td>
                      <td className="p-2 text-right">{m.startingBB}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard> */}

      {/* Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Match">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input id="date" label="Date" type="date" value={date} onChange={setDate} />
          <Input id="amount" label="Amount Wagered ($)" type="number" value={amount} onChange={setAmount} />
          <Input id="startingBB" label="Starting Big Blinds" type="number" value={startingBB} onChange={setStartingBB} />
          <Select id="player" label="Player" value={pokerId} onChange={setpokerId} options={[{value:"",label:"Select…"}, ...players.map(p=>({value:p.pokerId,label:p.name}))]} />
          <Select id="opponent" label="Opponent" value={opponentId} onChange={setOpponentId} options={[{value:"",label:"Select…"}, ...players.filter(p=>p.pokerId!==pokerId).map(p=>({value:p.pokerId,label:p.name}))]} />
          <Select id="winner" label="Winner" value={winnerId} onChange={setWinnerId} options={[{value:"",label:"Select…"}, ...(pokerId && opponentId ? [pokerId, opponentId].map(id=>({value:id, label: players.find(p=>p.pokerId===id)?.name || id})) : [])]} />
        </div>
        {formError && <div className="text-red-400 mt-3 text-sm">{formError}</div>}
        <div className="mt-4 flex items-center justify-end gap-2">
          <button className="px-3 py-2 rounded-xl bg-neutral-800 text-neutral-200" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500" onClick={submitMatch}>
            Save Match
          </button>
        </div>
        <div className="mt-4 text-xs text-neutral-400">
          <p>
            <strong>Data Flow:</strong> Posting a match triggers server-side rating updates and aggregate refresh. This UI simply refetches after save.
          </p>
        </div>
      </Modal>

      {loading && !error && (
        <div className="fixed bottom-4 left-0 right-0 mx-auto w-fit px-3 py-1 rounded-xl bg-neutral-800/70 text-neutral-200 text-xs">
          Loading data…
        </div>
      )}
    </div>
  );
}