import prisma from "../lib/database";

export const findOrCreatePatient = async (name: string, cpf: string) => {
  let patient = await prisma.patient.findUnique({ where: { cpf } });
  if (!patient) {
    patient = await prisma.patient.create({ data: { name, cpf } });
  }
  if (patient && patient.name !== name) {
    return undefined;
  }
  return patient;
};
