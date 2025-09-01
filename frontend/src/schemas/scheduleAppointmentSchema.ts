import { z } from 'zod';

import { especialidades } from '../config';

const specialtyValues = especialidades.map(e => e.value) as [string, ...string[]];

export const schedule = z.object({
  patientName: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome do Paciente inválido').trim(),
  patientCPF: z
    .string()
    .min(1, 'CPF é obrigatório')
    .min(11, 'CPF inválido')
    .max(14, 'CPF inválido')
    .regex(/^[0-9.-]+$/, 'CPF inválido'),
  doctorName: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome do Médico inválido').trim(),
  specialty: z.enum(specialtyValues, 'Especialidade obrigatória'),
  date: z.string().nonempty('Data é obrigatória'),
  time: z.string().nonempty('Hora é obrigatória'),
});
