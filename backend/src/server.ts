import express from "express";
import cors from "cors";
import router from "./routes/appointmentRoutes";
import specialtyRouter from "./routes/specialtyRoutes";
import { PORT } from "./config/env";
import { errorHandlerMiddleware } from "./middlewares/error-handle";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/appointments", router);
app.use("/specialties", specialtyRouter);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
