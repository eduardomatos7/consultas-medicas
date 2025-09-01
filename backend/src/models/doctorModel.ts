import prisma from "../lib/database";

export const findOrCreateDoctor = async (name: string, specialty: string) => {
  let doctor = await prisma.doctor.findFirst({
    where: { name, specialty },
  });
  if (!doctor) {
    doctor = await prisma.doctor.create({ data: { name, specialty } });
  }
  // Apenas levando em consideração que um medico nao pode ter mais de uma especialidade
  // poderia ter varias especialidades, mas seria melhor poder escolher os medicos e especialidades no select ao inves de digitar
  // como no desafio pediu no min 3 digitos no nome, deduzi que seria inserido manualmente, por alguem da recpção, nao o proprio paciente
  if (doctor && doctor.specialty !== specialty) {
    return undefined;
  }

  return doctor;
};
