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

export const findConflictingAppointment = async (doctorId: string, date: Date, minutes = 30) => {
  const start = new Date(date.getTime() - minutes * 60 * 1000);
  const end = new Date(date.getTime() + minutes * 60 * 1000);
  return await prisma.appointment.findFirst({
    where: {
      doctorId,
      date: {
        gte: start,
        lte: end,
      },
    },
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

export const completeAppointment = async (id: string) => {
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: "Realizado" },
    include: { patient: true, doctor: true },
  });
  return appointment.status + "!";
};

export const rescheduleAppointment = async (id: string, newDate: Date) => {
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { date: newDate, status: "Agendado" },
    include: { patient: true, doctor: true },
  });
  return appointment;
};

export const deleteAppointment = async (id: string) => {
  return await prisma.appointment.delete({
    where: { id },
  });
};
