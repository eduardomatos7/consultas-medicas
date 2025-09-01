import type { BuildPayloadParams, AppointmentPayload } from '../types/appointment.types';

export function buildAppointmentPayload(p: BuildPayloadParams): AppointmentPayload {
  const isoDate = new Date(`${p.date}T${p.time || '00:00'}:00`).toISOString();
  return {
    patientName: p.patientName.trim(),
    patientCPF: p.patientCPF,
    doctorName: p.doctorName.trim(),
    specialty: p.specialty,
    date: isoDate,
  };
}
