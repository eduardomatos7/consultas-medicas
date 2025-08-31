import { Router } from "express";
import * as controller from "../controllers/appointment-controller";
import { validate } from "../middlewares/validate";
import { createAppointmentSchema, cancelAppointmentSchema } from "../schemas/appointmentSchema";

const router = Router();

router.post("/", validate(createAppointmentSchema), controller.createAppointment);

export default router;
