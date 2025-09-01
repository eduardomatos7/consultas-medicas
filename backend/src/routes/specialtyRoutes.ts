import { Router } from "express";
import { listSpecialties } from "../controllers/specialty-controller";

const router = Router();

router.get("/", listSpecialties);

export default router;
