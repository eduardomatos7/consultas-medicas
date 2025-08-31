import prisma from "../lib/database";

export const findOrCreateDoctor = async (name: string, specialty: string) => {
  let doctor = await prisma.doctor.findFirst({
    where: { name, specialty },
  });
  if (!doctor) {
    doctor = await prisma.doctor.create({ data: { name, specialty } });
  }
  return doctor;
};
