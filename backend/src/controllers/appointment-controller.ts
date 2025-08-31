import { Request, Response, NextFunction } from "express";
import * as patientModel from "../models/patientModel";
import * as doctorModel from "../models/doctorModel";
import * as appointmentModel from "../models/appointmentModel";
import { Prisma } from "@prisma/client";
import { isFuture, canCancel, asDate, isWithinBusinessHours } from "../utils/time";
import { HttpError } from "../errors/HttpError";

const TIMETABLE_IN_USE = "Já existe uma consulta para este médico neste horário.";
const APPOINTMENT_NOT_FOUND = "Consulta não encontrada.";
const PAST_DATE_ERROR = "Não é permitido agendar consultas para o passado.";
const BUSINESS_HOURS_ERROR = "Uma consulta só pode ser agendada entre 07:00 e 17:00.";
const CANCELATION_TIME_ERROR = "Consultas só podem ser canceladas com mais de 24 horas de antecedência.";

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { patientName, patientCPF, doctorName, specialty, date } = req.body;
    const appointmentDate = asDate(date);
    console.log(appointmentDate.toString(), new Date().toString());

    if (!isFuture(appointmentDate)) {
      return next(new HttpError(400, PAST_DATE_ERROR));
    }

    if (!isWithinBusinessHours(appointmentDate)) {
      return next(new HttpError(400, BUSINESS_HOURS_ERROR));
    }

    const patient = await patientModel.findOrCreatePatient(patientName, patientCPF);
    const doctor = await doctorModel.findOrCreateDoctor(doctorName, specialty);

    const existing = await appointmentModel.findConflictingAppointment(doctor.id, appointmentDate, 30);
    if (existing) {
      return next(new HttpError(400, TIMETABLE_IN_USE));
    }

    const appointment = await appointmentModel.createAppointment(patient.id, doctor.id, appointmentDate);
    return res.status(201).json(appointment);
  } catch (err: any) {
    // pra pegar tambem violacoes de unique constraints do mysql que o prisma gera
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return next(new HttpError(400, TIMETABLE_IN_USE));
    }
    next(err);
  }
};

export const listAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointments = await appointmentModel.listAppointments();
    res.json(appointments);
  } catch (err: any) {
    next(err);
  }
};

export const getAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentModel.findById(id);
    if (!appointment) return next(new HttpError(404, APPOINTMENT_NOT_FOUND));
    res.json(appointment);
  } catch (err: any) {
    next(err);
  }
};

export const cancelAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentModel.findById(id);
    if (!appointment) return next(new HttpError(404, APPOINTMENT_NOT_FOUND));

    const isMoreThan24h = canCancel(appointment.date);
    if (!isMoreThan24h) {
      return next(new HttpError(400, CANCELATION_TIME_ERROR));
    }

    const canceled = await appointmentModel.cancelAppointment(id);
    res.json(canceled);
  } catch (err: any) {
    next(err);
  }
};

export const completeAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentModel.findById(id);
    if (!appointment) return next(new HttpError(404, APPOINTMENT_NOT_FOUND));
    const completed = await appointmentModel.completeAppointment(id);
    res.json(completed);
  } catch (err: any) {
    next(err);
  }
};

export const rescheduleAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { newDate } = req.body;
    const appointment = await appointmentModel.findById(id);
    if (!appointment) return next(new HttpError(404, APPOINTMENT_NOT_FOUND));
    const appointmentDate = asDate(newDate);

    if (!isFuture(appointmentDate)) {
      return next(new HttpError(400, PAST_DATE_ERROR));
    }
    if (!isWithinBusinessHours(appointmentDate)) {
      return next(new HttpError(400, BUSINESS_HOURS_ERROR));
    }
    const existing = await appointmentModel.findConflictingAppointment(appointment.doctorId, appointmentDate, 30);
    if (existing) {
      return next(new HttpError(400, TIMETABLE_IN_USE));
    }
    const rescheduled = await appointmentModel.rescheduleAppointment(id, appointmentDate);
    res.json({ message: "Data alterada com sucesso!", data: rescheduled });
  } catch (err: any) {
    next(err);
  }
};

export const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id);
    const appointment = await appointmentModel.findById(id);
    if (!appointment) return next(new HttpError(404, APPOINTMENT_NOT_FOUND));
    const deleted = await appointmentModel.deleteAppointment(id);
    res.json({ message: "Consulta deletada com sucesso", appointment: deleted });
  } catch (err: any) {
    next(err);
  }
};
