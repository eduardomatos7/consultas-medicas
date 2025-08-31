jest.mock("../src/models/appointmentModel", () => require("./mocks/appointmentModelMock").default);
jest.mock("../src/models/patientModel", () => require("./mocks/patientModelMock").default);
jest.mock("../src/models/doctorModel", () => require("./mocks/doctorModelMock").default);
