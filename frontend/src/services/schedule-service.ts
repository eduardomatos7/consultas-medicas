import { AxiosError } from 'axios';

import api from './api';

interface PostScheduleAppointmentResponse {
  patientName: string;
  patientCPF: string;
  doctorName: string;
  specialty: string;
  date: string;
}

export async function postScheduleAppointment(data: PostScheduleAppointmentResponse) {
  const { patientName, patientCPF, doctorName, specialty, date } = data;
  try {
    const appointments = await api.post('/', {
      patientName,
      patientCPF,
      doctorName,
      specialty,
      date,
    });
    return appointments;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message || 'Não foi possível conectar ao servidor';
    }
  }
}
