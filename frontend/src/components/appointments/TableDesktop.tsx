import { FiMoreVertical } from 'react-icons/fi';

import type { AppointmentDTO } from '../../types/appointment.dto';

import { ActionMenu } from './ActionMenu';
import { StatusSelect } from './StatusSelect';

interface TableProps {
  loading: boolean;
  rows: AppointmentDTO[];
  setSelected: (a: AppointmentDTO | null) => void;
  changeStatus: (a: AppointmentDTO, status: AppointmentDTO['status']) => void;
  remove: (id: string) => void;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
}

function TableDesktop({
  loading,
  rows,
  setSelected,
  changeStatus,
  remove,
  openMenuId,
  setOpenMenuId,
}: TableProps) {
  return (
    <div className="hidden md:block">
      <div className="border-background-button/20 min-h-[40vh] max-h-[60vh] overflow-y-scroll rounded-xl border bg-white shadow-sm">
        <table
          className={` ${rows.length === 0 && 'min-h-[40vh]'} w-full table-fixed border-collapse text-left text-sm`}
        >
          <thead className="bg-[#F4F0FF] text-xs tracking-wide text-[#2d1b52] uppercase">
            <tr>
              <th className="px-4 py-3 font-semibold">Paciente</th>
              <th className="px-4 py-3 font-semibold">Médico</th>
              <th className="px-4 py-3 font-semibold">Especialidade</th>
              <th className="px-4 py-3 font-semibold">Data</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Mais</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="text-secondary px-4 py-10 text-center text-xs">
                  Carregando...
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={6} className="text-secondary h-full px-4 py-10 text-center text-xs">
                  Nenhuma consulta encontrada.
                </td>
              </tr>
            )}
            {rows.map(a => (
              <tr
                key={a.id}
                className="group border-background-button/10 cursor-pointer border-t transition hover:bg-[#F4F0FF]/60"
                onClick={() => setSelected(a)}
              >
                <td className="px-4 py-3 text-[13px] font-medium text-[#2d1b52]">
                  {a.patient.name}
                </td>
                <td className="text-secondary px-4 py-3 text-[13px]">{a.doctor.name}</td>
                <td className="text-secondary px-4 py-3 text-[13px]">{a.doctor.specialty}</td>
                <td className="text-secondary px-4 py-3 text-[13px]">
                  {new Date(a.date).toLocaleString('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </td>
                <td className="px-4 py-3 text-[13px]" onClick={e => e.stopPropagation()}>
                  <StatusSelect value={a.status} onChange={s => changeStatus(a, s)} />
                </td>
                <td className="relative px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => setOpenMenuId(openMenuId === a.id ? null : a.id)}
                    className="text-background-button rounded-md p-1 transition hover:bg-[#D6D3F9]/60"
                    data-appointments-menu
                  >
                    <FiMoreVertical />
                  </button>
                  {openMenuId === a.id && (
                    <div className="absolute top-8 right-2" data-appointments-menu>
                      <ActionMenu
                        onDelete={() => {
                          setOpenMenuId(null);
                          remove(a.id);
                        }}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableDesktop;
