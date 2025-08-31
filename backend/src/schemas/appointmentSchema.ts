import { z } from "zod";

export const createAppointmentSchema = z.object({
  body: z.object({
    patientName: z.string().min(3, "Nome do Paciente inválido, insira ao menos 3 caracteres"),
    patientCPF: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
    doctorName: z.string().min(3, "Nome do Médico inválido, insira ao menos 3 caracteres"),
    specialty: z.string().min(3, "Especialidade inválida"),
    date: z.string().nonempty("Data é obrigatória"),
  }),
  params: z.object({}),
  query: z.object({}),
});

export const cancelAppointmentSchema = z.object({
  params: z.object({
    id: z.string().nonempty("Id da consulta é obrigatório"),
  }),
  body: z.object({}),
  query: z.object({}),
});
