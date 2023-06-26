import { Appointment } from "./appointment";
import { expect, test } from "vitest";
test("create an appontment", () => {
  const startsAt = new Date();
  const endsAt = new Date();
  endsAt.setDate(endsAt.getDate() + 1);
  const appointment = new Appointment({
    customer: "John Doe",
    startsAt: startsAt,
    endsAt: endsAt,
  });
  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});
test("Cannot create an appointment with start Date biggets than end Date", () => {
  const startsAt = new Date();
  const endsAt = new Date();
  endsAt.setDate(endsAt.getDate() - 1);
  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  });
});
