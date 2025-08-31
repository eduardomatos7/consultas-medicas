export function makeReq(date: Date) {
  return {
    body: {
      patientName: "Paciente",
      patientCPF: "00000000000",
      doctorName: "Doutor",
      specialty: "Cardio",
      date: date.toISOString(),
    },
  } as any;
}

export function makeRes() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

export function makeNext() {
  return jest.fn();
}
