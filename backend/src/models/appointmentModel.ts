import prisma from "../lib/database";

export const createAppointment = async (patientId: string, doctorId: string, date: Date) => {
  return await prisma.appointment.create({
    data: { patientId, doctorId, date },
    include: { patient: true, doctor: true },
  });
};

export const findByDoctorAndDate = async (doctorId: string, date: Date) => {
  return await prisma.appointment.findFirst({
    where: { doctorId, date },
  });
};

export const findById = async (id: string) => {
  return await prisma.appointment.findUnique({
    where: { id },
  });
};

export const listAppointments = async () => {
  return await prisma.appointment.findMany({
    include: { patient: true, doctor: true },
    orderBy: { date: "asc" },
  });
};

export const cancelAppointment = async (id: string) => {
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: "Cancelado" },
    include: { patient: true, doctor: true },
  });
  return appointment.status;
};
