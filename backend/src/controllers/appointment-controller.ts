import { Request, Response, NextFunction } from "express";
import * as patientModel from "../models/patientModel";
import * as doctorModel from "../models/doctorModel";
import * as appointmentModel from "../models/appointmentModel";
import { Prisma } from "@prisma/client";
import { isFuture, canCancel, asDate } from "../utils/time";
import { HttpError } from "../errors/HttpError";

const TIMETABLE_IN_USE = "Já existe uma consulta para este médico neste horário.";

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { patientName, patientCPF, doctorName, specialty, date } = req.body;
    const appointmentDate = asDate(date);
    console.log(appointmentDate.toString(), new Date().toString());

    if (!isFuture(appointmentDate)) {
      return next(new HttpError(400, "Não é permitido agendar consultas no passado."));
    }

    const patient = await patientModel.findOrCreatePatient(patientName, patientCPF);
    const doctor = await doctorModel.findOrCreateDoctor(doctorName, specialty);

    const existing = await appointmentModel.findByDoctorAndDate(doctor.id, appointmentDate);
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

export const cancelAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentModel.findById(id);
    if (!appointment) return next(new HttpError(404, "Consulta não encontrada."));

    const isMoreThan24h = canCancel(appointment.date);
    if (!isMoreThan24h) {
      return next(new HttpError(400, "Não é permitido cancelar a consulta menos de 24 horas antes."));
    }

    const canceled = await appointmentModel.cancelAppointment(id);
    res.json(canceled);
  } catch (err: any) {
    next(err);
  }
};
