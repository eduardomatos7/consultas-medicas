import { useEffect, useMemo, useState } from 'react';

import { AppointmentModal } from '../components/appointments/AppointmentModal';
import { MobileAppointmentsList } from '../components/appointments/MobileAppointmentsList';
import TableDesktop from '../components/appointments/TableDesktop';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useAppointments } from '../hooks/useAppointments';

export default function Appointments() {
  const { appointments, loading, setSelected, selected, changeStatus, remove, reschedule } =
    useAppointments();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [confirmData, setConfirmData] = useState<null | { action: () => void; message: string }>(
    null
  );
  const rows = useMemo(() => appointments, [appointments]);

  useEffect(() => {
    if (!openMenuId) return;
    const handleClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('[data-appointments-menu]')) return;
      setOpenMenuId(null);
    };

    document.addEventListener('mousedown', handleClick, true);
    return () => {
      document.removeEventListener('mousedown', handleClick, true);
    };
  }, [openMenuId]);
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-figtree to-textPink bg-gradient-to-b from-[#674ac8] via-[#6a50a7] bg-clip-text text-3xl font-bold text-transparent">
            Consultas
          </h1>
          <p className="text-secondary mt-1 text-sm">
            Gerencie e acompanhe todas as consultas agendadas. Clicando em uma consulta, você pode
            ver mais detalhes e reagendá-la.
          </p>
        </div>
      </div>
      <TableDesktop
        loading={loading}
        rows={rows}
        setSelected={setSelected}
        changeStatus={(a, status) =>
          setConfirmData({
            message: `Confirmar alteração de status para "${status}"?`,
            action: () => changeStatus(a, status),
          })
        }
        remove={id =>
          setConfirmData({
            message: 'Confirmar exclusão da consulta?',
            action: () => remove(id),
          })
        }
        openMenuId={openMenuId}
        setOpenMenuId={setOpenMenuId}
      />

      <MobileAppointmentsList
        loading={loading}
        rows={rows}
        setSelected={setSelected}
        changeStatus={(a, status) =>
          setConfirmData({
            message: `Confirmar alteração de status para "${status}"?`,
            action: () => changeStatus(a, status),
          })
        }
        remove={id =>
          setConfirmData({
            message: 'Confirmar exclusão da consulta?',
            action: () => remove(id),
          })
        }
        openMenuId={openMenuId}
        setOpenMenuId={setOpenMenuId}
      />
      {selected && (
        <AppointmentModal
          appointment={selected}
          onClose={() => setSelected(null)}
          onReschedule={d => reschedule(selected.id, d)}
        />
      )}
      <ConfirmDialog
        open={!!confirmData}
        message={confirmData?.message}
        onCancel={() => setConfirmData(null)}
        onConfirm={() => {
          confirmData?.action();
          setConfirmData(null);
        }}
      />
    </section>
  );
}
