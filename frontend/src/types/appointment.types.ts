export interface BuildPayloadParams {
  patientName: string;
  patientCPF: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
}

export interface AppointmentPayload {
  patientName: string;
  patientCPF: string;
  doctorName: string;
  specialty: string;
  date: string;
}
