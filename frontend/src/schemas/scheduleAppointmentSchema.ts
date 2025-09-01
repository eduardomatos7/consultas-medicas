import { z } from 'zod';

// Especialidades agora vêm da API; validação básica apenas de preenchimento.

export const schedule = z.object({
  patientName: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome do Paciente inválido').trim(),
  patientCPF: z
    .string()
    .min(1, 'CPF é obrigatório')
    .min(11, 'CPF inválido')
    .max(14, 'CPF inválido')
    .regex(/^[0-9.-]+$/, 'CPF inválido'),
  doctorName: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome do Médico inválido').trim(),
  specialty: z.string().min(1, 'Especialidade obrigatória'),
  date: z.string().nonempty('Data é obrigatória'),
  time: z.string().nonempty('Hora é obrigatória'),
});
