import { Router } from "express";
import * as controller from "../controllers/appointment-controller";
import { validate } from "../middlewares/validate";
import { createAppointmentSchema, cancelAppointmentSchema } from "../schemas/appointmentSchema";

const router = Router();

router.post("/", validate(createAppointmentSchema), controller.createAppointment);
router.get("/", controller.listAppointments);
router.post("/:id/cancel", validate(cancelAppointmentSchema), controller.cancelAppointment);

export default router;
