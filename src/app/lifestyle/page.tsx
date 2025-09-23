'use client';

import React, { useEffect, useState } from 'react';
import { SectionCard, Pill, Stat } from '../poker/functions'; // adjust the relative path if needed
import { CheckInModal } from './components/CheckInModal';
import { Blockhead } from '@/types/poker';
// API imports
import { getAllPlayers } from '@/lib/api';
import {
  postCheckin as apiCheckIn,
  postCheckout as apiCheckOut,
} from '@/lib/api';

// ---- Types ----

export default function BlockheadPresencePage() {
  // --- UI state ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Actions state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data
  const [blockheads, setBlockheads] = useState<Blockhead[]>([]);

  // ---- Helpers ----

  async function refetchAll() {
    setLoading(true);
    setError('');
    try {
      const blockheadsData = await getAllPlayers();
      setBlockheads(blockheadsData);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load blockheads data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refetchAll();
  }, []);

  async function handleModalCheckIn(data: { userId: string; date: string; time: string }) {
    setError('');
    try {
      // Combine date and time into ISO timestamp
      const dateTimeString = `${data.date}T${data.time}:00`;
      const timestamp = new Date(dateTimeString).toISOString();

      await apiCheckIn({ userId: data.userId, timestamp });
      await refetchAll();
      setIsModalOpen(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save check-in');
    }
  }

  async function handleQuickCheckIn(userId: string) {
    setError('');
    try {
      const timestamp = new Date().toISOString();
      await apiCheckIn({ userId, timestamp });
      await refetchAll();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save check-in');
    }
  }

  async function handleCheckOut(userId: string) {
    setError('');
    try {
      const timestamp = new Date().toISOString();
      await apiCheckOut({ userId, timestamp });
      await refetchAll();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to save check-out');
    }
  }

  const checkedInBlockheads = blockheads
    .filter(b => b.isCheckedIn)
    .sort((a, b) => {
      // Sort by lastCheckInTimestamp, most recent first
      const timestampA = a.lastCheckInTimestamp ? new Date(a.lastCheckInTimestamp).getTime() : 0;
      const timestampB = b.lastCheckInTimestamp ? new Date(b.lastCheckInTimestamp).getTime() : 0;
      return timestampA - timestampB; // Descending order (newest first)
    });
  const notCheckedInBlockheads = blockheads.filter(b => !b.isCheckedIn);
  const currentlyInCount = checkedInBlockheads.length;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 gap-4">
      {/* Header */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-primary-500 to-primary-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-secondary-500 grid place-items-center text-2xl">🏢</div>
            <div>
              <div className="text-neutral-300 text-sm">Blockheads</div>
              <div className="text-white text-2xl font-bold leading-tight">
                Cinderblock Check-In
              </div>
              <div className="text-neutral-300">
                Track who&apos;s in Cinderblock right now and recent activity.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Stat label="Currently In" value={<span>{currentlyInCount}</span>} />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg font-medium transition-colors"
              >
                Check In
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Check-in Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Checked In Table */}
        <SectionCard title="Checked In" right={<Pill>{checkedInBlockheads.length}</Pill>}>
          {checkedInBlockheads.length === 0 ? (
            <div className="text-neutral-400">No one is currently checked in.</div>
          ) : (
            <div className="overflow-auto -mx-2 sm:mx-0">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-neutral-400">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Checked In</th>
                    <th className="p-2 text-left">Duration</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {checkedInBlockheads.map(blockhead => {
                    const timestampField = blockhead.lastCheckInTimestamp;
                    const checkInTime = timestampField ? new Date(timestampField) : null;
                    
                    const duration = checkInTime ? Math.floor((Date.now() - checkInTime.getTime()) / (1000 * 60)) : 0;
                    const hours = Math.floor(duration / 60);
                    const minutes = duration % 60;
                    const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
                    
                    return (
                      <tr key={blockhead.pokerId} className="border-t border-neutral-800 text-neutral-200">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-neutral-800 grid place-items-center overflow-hidden">
                              {blockhead.avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={blockhead.avatarUrl} alt={blockhead.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs">👤</span>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{blockhead.name}</div>
                              <div className="text-xs text-neutral-500">{blockhead.nickname}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {checkInTime ? checkInTime.toLocaleString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          }) : `Unknown (${timestampField || 'no timestamp'})`}
                        </td>
                        <td className="p-2 whitespace-nowrap text-neutral-300">
                          {durationText}
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => handleCheckOut(blockhead.pokerId)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors"
                          >
                            Check Out
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>

        {/* Not Checked In Table */}
        <SectionCard title="Not Checked In" right={<Pill>{notCheckedInBlockheads.length}</Pill>}>
          {notCheckedInBlockheads.length === 0 ? (
            <div className="text-neutral-400">Everyone is checked in!</div>
          ) : (
            <div className="overflow-auto -mx-2 sm:mx-0">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-neutral-400">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {notCheckedInBlockheads.map(blockhead => (
                    <tr key={blockhead.pokerId} className="border-t border-neutral-800 text-neutral-200">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-neutral-800 grid place-items-center overflow-hidden">
                            {blockhead.avatarUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={blockhead.avatarUrl} alt={blockhead.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xs">👤</span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{blockhead.name || blockhead.nickname}</div>
                            <div className="text-xs text-neutral-500">{blockhead.pokerId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <span className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded-full">
                          Not checked in
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => handleQuickCheckIn(blockhead.pokerId)}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors"
                        >
                          Check In
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>

      {/* Recent Activity */}
      <SectionCard title="Recent Activity" right={<Pill>0</Pill>}>
        <div className="text-neutral-400">Activity tracking will be implemented here.</div>
      </SectionCard>

      {/* Loading toast */}
      {loading && !error && (
        <div className="fixed bottom-4 left-0 right-0 mx-auto w-fit px-3 py-1 rounded-xl bg-neutral-800/70 text-neutral-200 text-xs">
          Loading presence…
        </div>
      )}

       {/* Check In Modal */}
       <CheckInModal
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         onSubmit={handleModalCheckIn}
         blockheads={blockheads}
         error={error}
       />
    </div>
  );
}
