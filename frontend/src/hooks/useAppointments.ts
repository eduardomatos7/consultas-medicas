import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { AppointmentDTO } from '../services/appointment-list-service';
import {
  cancelAppointment,
  completeAppointment,
  deleteAppointment,
  fetchAppointments,
  rescheduleAppointment,
  reopenAppointment,
} from '../services/appointment-list-service';

export function useAppointments() {
  const [appointments, setAppointments] = useState<AppointmentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AppointmentDTO | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchAppointments();
    setAppointments(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = useCallback(
    async (a: AppointmentDTO, status: AppointmentDTO['status']) => {
      try {
        if (status === 'Cancelado') {
          const res = await cancelAppointment(a.id);
          if (typeof res === 'string') toast.success('Consulta cancelada');
        } else if (status === 'Realizado') {
          const res = await completeAppointment(a.id);
          if (typeof res === 'string') toast.success('Consulta concluída');
        } else if (status === 'Agendado') {
          const res = await reopenAppointment(a.id);
          if (typeof res === 'string') toast.success('Consulta reaberta');
        }
      } catch {
        toast.error('Erro inesperado ao alterar status');
      } finally {
        await load();
      }
    },
    [load]
  );

  const remove = useCallback(
    async (id: string) => {
      if (!confirm('Deseja realmente excluir esta consulta?')) return;
      const res = await deleteAppointment(id);
      if (!res) toast.error(res);
      else toast.success('Consulta excluída');
      await load();
    },
    [load]
  );

  const reschedule = useCallback(
    async (id: string, newDate: string) => {
      const res = await rescheduleAppointment(id, newDate);
      if (typeof res === 'string') toast.error(res);
      else toast.success('Consulta reagendada');
      setSelected(null);
      await load();
    },
    [load]
  );

  return {
    appointments,
    loading,
    selected,
    setSelected,
    load,
    changeStatus,
    remove,
    reschedule,
  };
}
