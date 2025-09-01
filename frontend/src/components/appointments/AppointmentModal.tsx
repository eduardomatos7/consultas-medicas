import { useState } from 'react';

import type { AppointmentDTO } from '../../services/appointment-list-service';
import { Button } from '../Button';

interface ModalProps {
  appointment: AppointmentDTO | null;
  onClose: () => void;
  onReschedule: (newDate: string) => void;
}

export function AppointmentModal({ appointment, onClose, onReschedule }: ModalProps) {
  const [newDate, setNewDate] = useState('');
  if (!appointment) return null;
  const dateStr = new Date(appointment.date).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="font-poppins mb-4 text-xl font-semibold text-[#2d1b52]">Detalhes</h2>
        <dl className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-secondary font-semibold">Paciente</dt>
            <dd>{appointment.patient.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-secondary font-semibold">CPF</dt>
            <dd>{appointment.patient.cpf}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-secondary font-semibold">Médico</dt>
            <dd>{appointment.doctor.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-secondary font-semibold">Especialidade</dt>
            <dd>{appointment.doctor.specialty}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-secondary font-semibold">Data</dt>
            <dd>{dateStr}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-secondary font-semibold">Status</dt>
            <dd>{appointment.status}</dd>
          </div>
        </dl>
        <div className="mt-6 space-y-3">
          <label className="text-secondary flex flex-col gap-1 text-xs font-medium">
            Reagendar
            <input
              type="datetime-local"
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
              className="border-background-button/20 focus:border-background-button rounded-md border px-3 py-2 text-sm focus:outline-none"
            />
          </label>
          <div className="flex gap-3">
            <Button
              variant="primaryGhost"
              onClick={() => {
                if (!newDate) return alert('Selecione uma nova data');
                onReschedule(new Date(newDate).toISOString());
                setNewDate('');
              }}
              className="text-xs"
            >
              Salvar
            </Button>
            <Button variant="ghost" onClick={onClose} className="text-xs">
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
