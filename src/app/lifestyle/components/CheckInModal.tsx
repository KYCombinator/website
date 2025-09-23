'use client';

import React from 'react';
import { Modal, Input, Select } from '../../poker/functions';
import { Blockhead } from '@/types/poker';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { userId: string; date: string; time: string }) => void;
  blockheads: Blockhead[];
  error?: string;
}

export function CheckInModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  blockheads, 
  error 
}: CheckInModalProps) {
  const [modalUserId, setModalUserId] = React.useState<string>('');
  const [modalDate, setModalDate] = React.useState<string>(() => 
    new Date().toISOString().split('T')[0]
  );
  const [modalTime, setModalTime] = React.useState<string>(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  });

  const handleSubmit = () => {
    if (!modalUserId) {
      return;
    }
    onSubmit({ userId: modalUserId, date: modalDate, time: modalTime });
  };

  const handleClose = () => {
    setModalUserId('');
    setModalDate(() => new Date().toISOString().split('T')[0]);
    setModalTime(() => {
      const now = new Date();
      return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} title="Check In Blockhead">
      <div className="grid grid-cols-1 gap-3">
        <Select 
          id="modal-user" 
          label="Select Blockhead" 
          value={modalUserId} 
          onChange={setModalUserId} 
          options={[
            ...blockheads.map(user => ({
              value: user.pokerId, 
              label: user.name || user.nickname || user.pokerId
            }))
          ]} 
        />
        <Input 
          id="modal-date" 
          label="Date" 
          type="date" 
          value={modalDate} 
          onChange={setModalDate} 
        />
        <Input 
          id="modal-time" 
          label="Time" 
          type="time" 
          value={modalTime} 
          onChange={setModalTime} 
        />
      </div>
      {error && <div className="text-red-400 mt-3 text-sm">{error}</div>}
      <div className="mt-4 flex items-center justify-end gap-2">
        <button 
          className="px-3 py-2 rounded-xl bg-neutral-800 text-neutral-200" 
          onClick={handleClose}
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-500 disabled:opacity-50" 
          onClick={handleSubmit}
          disabled={!modalUserId}
        >
          Check In
        </button>
      </div>
      <div className="mt-4 text-xs text-neutral-400">
        <p>
          <strong>Note:</strong> This will check in the selected Blockhead at the specified date and time.
        </p>
      </div>
    </Modal>
  );
}
