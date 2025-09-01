import { AxiosError } from 'axios';

import api from './api';

export interface AppointmentDTO {
  id: string;
  date: string;
  status: 'Agendado' | 'Cancelado' | 'Realizado';
  patient: { id: string; name: string; cpf: string };
  doctor: { id: string; name: string; specialty: string };
}

export async function fetchAppointments(): Promise<AppointmentDTO[]> {
  try {
    const res = await api.get<AppointmentDTO[]>('/');
    return res.data;
  } catch {
    return [];
  }
}

export async function getAppointment(id: string): Promise<AppointmentDTO | null> {
  try {
    const res = await api.get<AppointmentDTO>(`/${id}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function cancelAppointment(id: string) {
  try {
    const res = await api.post<{ status: string }>(`/${id}/cancel`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError)
      return error.response?.data.message || 'Erro ao cancelar consulta';
  }
}

export async function completeAppointment(id: string) {
  try {
    const res = await api.post<{ status: string }>(`/${id}/complete`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError)
      return error.response?.data.message || 'Erro ao completar consulta';
  }
}

export async function reopenAppointment(id: string) {
  try {
    const res = await api.post<{ status: string }>(`/${id}/reopen`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError)
      return error.response?.data.message || 'Erro ao reabrir consulta';
  }
}

export async function deleteAppointment(id: string) {
  try {
    const res = await api.delete<{ message: string }>(`/${id}/delete`);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError)
      return error.response?.data.message || 'Erro ao deletar consulta';
  }
}

export async function rescheduleAppointment(id: string, newDate: string) {
  try {
    const res = await api.put<{ message: string }>(`/${id}/reschedule`, { newDate });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError)
      return error.response?.data.message || 'Erro ao reagendar consulta';
  }
}
