import { useState } from 'react';

import type { AppointmentDTO } from '../../services/appointment-list-service';

interface StatusSelectProps {
  value: AppointmentDTO['status'];
  onChange: (value: AppointmentDTO['status']) => void;
  disabled?: boolean;
}

export function StatusSelect({ value, onChange, disabled }: StatusSelectProps) {
  const [open, setOpen] = useState(false);
  const statuses: AppointmentDTO['status'][] = ['Agendado', 'Realizado', 'Cancelado'];
  return (
    <div className="relative">
      <button
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        className={`rounded-md border px-2 py-1 text-xs font-medium transition ${
          value === 'Agendado'
            ? 'border-[#674ac8]/30 bg-[#D6D3F9] text-[#2d1b52]'
            : value === 'Cancelado'
              ? 'border-red-200 bg-red-100 text-red-600'
              : 'border-emerald-200 bg-emerald-100 text-emerald-700'
        }`}
      >
        {value}
      </button>
      {open && (
        <div className="border-background-button/20 absolute right-0 z-30 mt-2 w-40 rounded-md border bg-white p-1 shadow-lg">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => {
                if (status === value) return setOpen(false);
                onChange(status);
                setOpen(false);
              }}
              className={`w-full rounded-sm px-3 py-2 text-left text-xs hover:bg-[#D6D3F9]/40 ${
                status === value ? 'text-background-button font-semibold' : 'text-secondary'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
