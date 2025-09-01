import { FiMoreVertical } from 'react-icons/fi';

import type { AppointmentDTO } from '../../services/appointment-list-service';

import { ActionMenu } from './ActionMenu';
import { StatusSelect } from './StatusSelect';

interface MobileAppointmentsListProps {
  loading: boolean;
  rows: AppointmentDTO[];
  setSelected: (a: AppointmentDTO | null) => void;
  changeStatus: (a: AppointmentDTO, status: AppointmentDTO['status']) => void;
  remove: (id: string) => void;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null | ((prev: string | null) => string | null)) => void;
}

export function MobileAppointmentsList({
  loading,
  rows,
  setSelected,
  changeStatus,
  remove,
  openMenuId,
  setOpenMenuId,
}: MobileAppointmentsListProps) {
  return (
    <div className="md:hidden">
      {loading && (
        <div className="border-background-button/20 text-secondary rounded-lg border bg-white p-5 text-center text-xs">
          Carregando...
        </div>
      )}
      {!loading && rows.length === 0 && (
        <div className="border-background-button/20 text-secondary rounded-lg border bg-white p-5 text-center text-xs">
          Nenhuma consulta encontrada.
        </div>
      )}
      <ul className="mt-2 flex flex-col gap-4">
        {rows.map(a => {
          const isMenuOpen = openMenuId === a.id;
          return (
            <li
              key={a.id}
              className={`border-background-button/20 relative rounded-xl border bg-white p-4 shadow-sm transition focus-within:ring-2 focus-within:ring-[#674ac8]/40 ${isMenuOpen ? 'z-20' : ''}`}
              onClick={() => setSelected(a)}
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <button className="flex-1 text-left outline-none" onClick={() => setSelected(a)}>
                  <p className="font-medium text-[#2d1b52]">{a.patient.name}</p>
                  <p className="text-secondary mt-0.5 text-xs" />
                </button>
                <div onClick={e => e.stopPropagation()} className="flex items-center gap-2">
                  <StatusSelect value={a.status} onChange={s => changeStatus(a, s)} />
                  <button
                    aria-label="Abrir menu"
                    onClick={() =>
                      setOpenMenuId(id =>
                        typeof id === 'string' ? (id === a.id ? null : a.id) : a.id
                      )
                    }
                    className="text-background-button rounded-md p-1 transition hover:bg-[#D6D3F9]/60"
                    data-appointments-menu
                  >
                    <FiMoreVertical />
                  </button>
                </div>
                {isMenuOpen && (
                  <div
                    onClick={e => e.stopPropagation()}
                    className="absolute top-10 right-2"
                    data-appointments-menu
                  >
                    <ActionMenu
                      onDelete={() => {
                        setOpenMenuId(null);
                        remove(a.id);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="text-secondary flex flex-col gap-x-4 gap-y-1 text-[11px]">
                <div className="flex gap-1">
                  <span className="font-semibold">Médico:</span>
                  <span>{a.doctor.name}</span>
                </div>
                <div className="flex gap-1">
                  <span className="font-semibold">Especialidade:</span>
                  <span>{a.doctor.specialty}</span>
                </div>
                <div className="flex gap-1">
                  <span className="font-semibold">Data:</span>
                  <span>
                    {new Date(a.date).toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
