import { Router } from "express";
import * as controller from "../controllers/appointment-controller";
import { validate } from "../middlewares/validate";
import {
  createAppointmentSchema,
  cancelAppointmentSchema,
  deleteAppointmentSchema,
  completeAppointmentSchema,
  rescheduleAppointmentSchema,
  getAppointmentSchema,
  reopenAppointmentSchema,
} from "../schemas/appointmentSchema";

const router = Router();

router.post("/", validate(createAppointmentSchema), controller.createAppointment);
router.get("/", controller.listAppointments);
router.get("/:id", validate(getAppointmentSchema), controller.getAppointment);
router.post("/:id/cancel", validate(cancelAppointmentSchema), controller.cancelAppointment);
router.delete("/:id/delete", validate(deleteAppointmentSchema), controller.deleteAppointment);
router.post("/:id/complete", validate(completeAppointmentSchema), controller.completeAppointment);
router.put("/:id/reschedule", validate(rescheduleAppointmentSchema), controller.rescheduleAppointment);
router.post("/:id/reopen", validate(reopenAppointmentSchema), controller.reopenAppointment);

export default router;
