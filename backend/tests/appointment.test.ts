import {
  mockFindConflicting,
  mockCreateAppointment,
  mockFindById,
  mockCancel,
  mockReschedule,
  mockList,
} from "./mocks/appointmentModelMock";

import { createAppointment } from "../src/controllers/appointment-controller";
import { HttpError } from "../src/errors/HttpError";
import { makeReq, makeRes, makeNext } from "./utils/test-helpers";

describe("createAppointment controller - 30 minute rule", () => {
  beforeEach(() => {
    mockFindConflicting.mockReset();
    mockCreateAppointment.mockReset();
  });

  test("should return error when there is a conflicting appointment within 30 minutes", async () => {
    mockFindConflicting.mockResolvedValue({ id: "appt-1" });

    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(10, 0, 0, 0);

    const req = makeReq(date);
    const res = makeRes();
    const next = makeNext();

    await createAppointment(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = (next as jest.Mock).mock.calls[0][0];
    expect(err).toBeInstanceOf(HttpError);
    expect(err.status).toBe(400);
    expect(err.message).toMatch(/Já existe uma consulta/);
  });

  test("should create appointment when no conflicting appointment within 30 minutes", async () => {
    mockFindConflicting.mockResolvedValue(null);
    mockCreateAppointment.mockResolvedValue({ id: "appt-2" });

    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(12, 0, 0, 0);

    const req = makeReq(date);
    const res = makeRes();
    const next = makeNext();

    await createAppointment(req, res, next);

    expect(mockCreateAppointment).toHaveBeenCalledWith(
      "patient-1",
      "doctor-1",
      new Date(req.body.date)
    );
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("other appointment flows", () => {
  afterEach(() => {
    mockFindById.mockReset();
    mockCancel.mockReset();
    mockReschedule.mockReset();
    mockList.mockReset();
    mockFindConflicting.mockReset();
  });

  test("should return 404 when canceling non existing appointment", async () => {
    mockFindById.mockResolvedValue(null);

    const controller = require("../src/controllers/appointment-controller");
    const req: any = { params: { id: "non-existent" } };
    const res = makeRes();
    const next = makeNext();

    await controller.cancelAppointment(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = (next as jest.Mock).mock.calls[0][0];
    expect(err.status).toBe(404);
  });

  test("should return 400 when canceling within 24h", async () => {
    const soonDate = new Date();
    soonDate.setHours(soonDate.getHours() + 5);
    mockFindById.mockResolvedValue({ id: "appt-3", date: soonDate });

    const controller = require("../src/controllers/appointment-controller");
    const req: any = { params: { id: "appt-3" } };
    const res = makeRes();
    const next = makeNext();

    await controller.cancelAppointment(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = (next as jest.Mock).mock.calls[0][0];
    expect(err.status).toBe(400);
  });

  test("should cancel appointment when allowed", async () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 48);
    mockFindById.mockResolvedValue({ id: "appt-4", date: futureDate });
    mockCancel.mockResolvedValue("Cancelado");

    const controller = require("../src/controllers/appointment-controller");
    const req: any = { params: { id: "appt-4" } };
    const res = makeRes();
    const next = makeNext();

    await controller.cancelAppointment(req, res, next);

    expect(mockCancel).toHaveBeenCalledWith("appt-4");
    expect(res.json).toHaveBeenCalled();
  });

  test("should reschedule appointment with valid new date", async () => {
    const appointmentDate = new Date();
    appointmentDate.setHours(appointmentDate.getHours() + 48);
    mockFindById.mockResolvedValue({
      id: "appt-5",
      doctorId: "doctor-1",
      date: appointmentDate,
    });
    mockFindConflicting.mockResolvedValue(null);
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 10);
    newDate.setHours(10, 0, 0, 0);
    mockReschedule.mockResolvedValue({ id: "appt-5", date: newDate });

    const controller = require("../src/controllers/appointment-controller");
    const req: any = {
      params: { id: "appt-5" },
      body: { newDate: newDate.toISOString() },
    };
    const res = makeRes();
    const next = makeNext();

    await controller.rescheduleAppointment(req, res, next);

    expect(mockReschedule).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  test("should list appointments", async () => {
    mockList.mockResolvedValue([{ id: "a1" }, { id: "a2" }]);
    const controller = require("../src/controllers/appointment-controller");
    const req: any = {};
    const res = makeRes();
    const next = makeNext();

    await controller.listAppointments(req, res, next);

    expect(res.json).toHaveBeenCalledWith([{ id: "a1" }, { id: "a2" }]);
  });
});
