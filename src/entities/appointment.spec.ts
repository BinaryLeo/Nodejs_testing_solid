import { getFutureDate } from "../tests/utils/get-future-date";
import { Appointment } from "./appointment";
import { expect, test } from "vitest";
test("create an appointment", () => {
  const startsAt = getFutureDate('2023-06-25')
  const endsAt = getFutureDate('2023-06-26')
  const appointment = new Appointment({
    customer: "John Doe",
    startsAt: startsAt,
    endsAt: endsAt,
  });
  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});
test("Cannot create an appointment with start Date biggest than end Date", () => {
  const startsAt = new Date();
  const endsAt = new Date();
  startsAt.setDate(startsAt.getDate() + 2);
  endsAt.setDate(endsAt.getDate() + 1);
  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  });
});
test("Cannot create an appointment with start Date before now", () => {
  const startsAt = getFutureDate('2023-06-27')
  const endsAt = getFutureDate('2023-06-26')
  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  });
});
