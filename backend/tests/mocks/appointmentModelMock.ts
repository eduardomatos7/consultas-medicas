export const mockFindConflicting = jest.fn();
export const mockCreateAppointment = jest.fn();
export const mockFindById = jest.fn();
export const mockCancel = jest.fn();
export const mockReschedule = jest.fn();
export const mockList = jest.fn();

export default {
  findConflictingAppointment: (doctorId: string, date: Date, minutes = 30) =>
    mockFindConflicting(doctorId, date, minutes),
  createAppointment: (patientId: string, doctorId: string, date: Date) =>
    mockCreateAppointment(patientId, doctorId, date),
  findById: (id: string) => mockFindById(id),
  cancelAppointment: (id: string) => mockCancel(id),
  rescheduleAppointment: (id: string, newDate: Date) => mockReschedule(id, newDate),
  listAppointments: () => mockList(),
};
