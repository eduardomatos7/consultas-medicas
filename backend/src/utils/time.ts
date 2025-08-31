import { isAfter, differenceInHours } from "date-fns";

export const isFuture = (date: Date) => isAfter(date, new Date());

export const canCancel = (appointmentDate: Date) => {
  const diff = differenceInHours(appointmentDate, new Date());
  const isMoreThan24h = diff >= 24;
  return isMoreThan24h;
};

export const asDate = (input: string | Date) => (typeof input === "string" ? new Date(input) : input);

export const isWithinBusinessHours = (date: Date) => {
  const hour = date.getHours();
  return hour >= 7 && hour < 17;
};
