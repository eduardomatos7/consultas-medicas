export interface AppointmentDTO {
  id: string;
  date: string;
  status: 'Agendado' | 'Cancelado' | 'Realizado';
  patient: { id: string; name: string; cpf: string };
  doctor: { id: string; name: string; specialty: string };
}
