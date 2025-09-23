'use client'

import React, { useEffect, useState } from "react";
import { Blockhead, RatingRow, LeaderboardRow } from "@/types/poker";

interface Match {
  matchId: string;
  date: string;
  amount: number;
  blinds: number;
  player1Id: string;
  player2Id: string;
  winnerId: string;
  createdAt: string;
}
import { getAllPlayers, createMatch, getMatches, getMatchMatrix } from "@/lib/api";
import { SectionCard, Pill, Stat, Modal, Select, Input, RatingList, Leaderboard } from "./functions";

export default function PokerPage() {
  // --- UI state ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Data from API
  const [players, setPlayers] = useState<Blockhead[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matrix, setMatrix] = useState<Record<string, Record<string, {
    netWins: number;
    games: number;
    eloGained: number;
    moneyWon: number;
    totalAmount: number;
  }>>>({});

  // Matrix filter state
  const [matrixFilter, setMatrixFilter] = useState<'netWins' | 'games' | 'elo' | 'money' | 'totalAmount' | 'winPercentage'>('netWins');

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
      // Calculate date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const startDate = sevenDaysAgo.toISOString().slice(0, 10);
      
      const [pl, { matches }, { matrix }] = await Promise.all([
        getAllPlayers(),
        getMatches({ startDate, limit: 50 }),
        getMatchMatrix()
      ]);
      setPlayers(pl);
      setMatches(matches);
      setMatrix(matrix);
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
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 gap-4">
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


      {/* Recent Matches */}
      <SectionCard title="Recent Matches (Last 7 Days)" right={<Pill>{matches.length}</Pill>}>
        {!matches.length ? (
          <div className="text-neutral-400">No matches in the last 7 days.</div>
        ) : (
          <div className="overflow-auto -mx-2 sm:mx-0">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-neutral-400">
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Winner</th>
                  <th className="p-2 text-left">Opponent</th>
                  <th className="p-2 text-right">Amount Wagered</th>
                  <th className="p-2 text-right">Blinds</th>
                  <th className="p-2 text-right">Blind Size</th>
                </tr>
              </thead>
              <tbody>
                {[...matches]
                  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
                  .map((m) => {
                    const winner = players.find(p => p.pokerId === m.winnerId);
                    const opponent = players.find(p => p.pokerId === (m.winnerId === m.player1Id ? m.player2Id : m.player1Id));
                    const blindSize = (m.blinds && m.blinds > 0) ? ((m.amount || 0) / m.blinds).toFixed(2) : "0.00";
                    
                    return (
                      <tr key={m.matchId} className="border-t border-neutral-800 text-neutral-200">
                        <td className="p-2 whitespace-nowrap">{m.date || 'N/A'}</td>
                        <td className="p-2">
                          {winner ? (
                            <>
                              {winner.name} <span className="italic text-neutral-400">{winner.nickname}</span>
                            </>
                          ) : (
                            m.winnerId
                          )}
                        </td>
                        <td className="p-2">
                          {opponent ? (
                            <>
                              {opponent.name} <span className="italic text-neutral-400">{opponent.nickname}</span>
                            </>
                          ) : (
                            m.winnerId === m.player1Id ? m.player2Id : m.player1Id
                          )}
                        </td>
                        <td className="p-2 text-right">${(m.amount || 0).toLocaleString()}</td>
                        <td className="p-2 text-right">{m.blinds || 0}</td>
                        <td className="p-2 text-right">${blindSize}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* Match Matrix */}
      <SectionCard title="Match Matrix" right={
        <Select
          id="matrixFilter"
          label="Filter"
          value={matrixFilter}
          onChange={(value) => setMatrixFilter(value as 'netWins' | 'games' | 'elo' | 'money' | 'totalAmount' | 'winPercentage')}
          options={[
            { value: 'netWins', label: 'Net Wins' },
            { value: 'games', label: 'Games' },
            { value: 'elo', label: 'ELO Gained' },
            { value: 'money', label: 'Money Won' },
            { value: 'totalAmount', label: 'Total Amount Wagered' },
            { value: 'winPercentage', label: 'Win Percentage (ELO)' }
          ]}
        />
      }>
        {Object.keys(matrix).length === 0 ? (
          <div className="text-neutral-400">No match data available for matrix.</div>
        ) : (
          <div className="overflow-auto -mx-2 sm:mx-0">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-neutral-400">
                  <th className="p-2 text-left">Player</th>
                  {players.map(player => (
                    <th key={player.pokerId} className="p-2 text-center min-w-[80px]">
                      {player.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {players.map(player => (
                  <tr key={player.pokerId} className="border-t border-neutral-800 text-neutral-200">
                    <td className="p-2 font-medium">
                      {player.name} <span className="italic text-neutral-400">{player.nickname}</span>
                    </td>
                    {players.map(opponent => {
                      const data = matrix[player.pokerId]?.[opponent.pokerId];
                      let value = '-';
                      let className = 'p-2 text-center';
                      
                      if (matrixFilter === 'winPercentage') {
                        // For win percentage, show ELO-based calculation for all squares except diagonal
                        if (player.pokerId === opponent.pokerId) {
                          value = '-';
                          className += ' text-neutral-600';
                        } else {
                          // Calculate expected win percentage based on ELO ratings
                          const playerElo = player.elo;
                          const opponentElo = opponent.elo;
                          const expectedWinRate = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
                          const winPercentage = (expectedWinRate * 100).toFixed(1);
                          value = `${winPercentage}%`;
                          className += expectedWinRate > 0.5 ? ' text-green-400' : expectedWinRate < 0.5 ? ' text-red-400' : ' text-neutral-400';
                        }
                      } else if (data && data.games > 0) {
                        switch (matrixFilter) {
                          case 'netWins':
                            value = data.netWins > 0 ? `+${data.netWins}` : data.netWins.toString();
                            className += data.netWins > 0 ? ' text-green-400' : data.netWins < 0 ? ' text-red-400' : '';
                            break;
                          case 'games':
                            value = data.games.toString();
                            className += ' text-blue-400';
                            break;
                          case 'elo':
                            value = data.eloGained > 0 ? `+${data.eloGained.toFixed(1)}` : data.eloGained.toFixed(1);
                            className += data.eloGained > 0 ? ' text-green-400' : data.eloGained < 0 ? ' text-red-400' : '';
                            break;
                          case 'money':
                            value = data.moneyWon > 0 ? `+$${data.moneyWon.toLocaleString()}` : `-$${Math.abs(data.moneyWon).toLocaleString()}`;
                            className += data.moneyWon > 0 ? ' text-green-400' : data.moneyWon < 0 ? ' text-red-400' : '';
                            break;
                          case 'totalAmount':
                            value = `$${data.totalAmount.toLocaleString()}`;
                            className += ' text-blue-400';
                            break;
                        }
                      } else if (player.pokerId === opponent.pokerId) {
                        value = '-';
                        className += ' text-neutral-600';
                      }
                      
                      return (
                        <td key={opponent.pokerId} className={className}>
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Match">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input id="date" label="Date" type="date" value={date} onChange={setDate} />
          <Input id="amount" label="Amount Wagered ($)" type="number" value={amount} onChange={setAmount} />
          <Input id="startingBB" label="Starting Big Blinds" type="number" value={startingBB} onChange={setStartingBB} />
          <Select id="player" label="Player" value={pokerId} onChange={setpokerId} options={[...players.map(p=>({value:p.pokerId,label:p.name}))]} />
          <Select id="opponent" label="Opponent" value={opponentId} onChange={setOpponentId} options={[...players.filter(p=>p.pokerId!==pokerId).map(p=>({value:p.pokerId,label:p.name}))]} />
          <Select id="winner" label="Winner" value={winnerId} onChange={setWinnerId} options={[...(pokerId && opponentId ? [pokerId, opponentId].map(id=>({value:id, label: players.find(p=>p.pokerId===id)?.name || id})) : [])]} />
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