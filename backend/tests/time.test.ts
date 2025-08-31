import { isWithinBusinessHours } from "../src/utils/time";

function makeDate(hour: number, minute = 0) {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  return d;
}

describe("isWithinBusinessHours", () => {
  test("06:59 should be outside business hours", () => {
    expect(isWithinBusinessHours(makeDate(6, 59))).toBe(false);
  });

  test("07:00 should be allowed", () => {
    expect(isWithinBusinessHours(makeDate(7, 0))).toBe(true);
  });

  test("16:59 should be allowed", () => {
    expect(isWithinBusinessHours(makeDate(16, 59))).toBe(true);
  });

  test("17:00 should be outside business hours", () => {
    expect(isWithinBusinessHours(makeDate(17, 0))).toBe(false);
  });
});
