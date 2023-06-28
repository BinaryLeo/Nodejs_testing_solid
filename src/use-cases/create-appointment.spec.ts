import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-appointment-repository";


describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    const appointmentsRepository = new InMemoryAppointmentRepository
    const createAppointment = new CreateAppointment(appointmentsRepository);
    const startsAt = getFutureDate("2023-06-25");
    const endsAt = getFutureDate("2023-06-26");

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);
    expect(
      createAppointment.excecute({
        customer: "John Doe",
        startsAt: startsAt,
        endsAt: endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
  it("should not be able to create an appointment with ovelapping dates", async () => {
    const appointmentsRepository = new InMemoryAppointmentRepository
    const createAppointment = new CreateAppointment(appointmentsRepository);
    const startsAt = getFutureDate("2023-06-25");
    const endsAt = getFutureDate("2023-06-28");

    
    await createAppointment.excecute({
        customer: "John Doe",
        startsAt: startsAt,
        endsAt: endsAt,
      })
   expect(createAppointment.excecute({
    customer :'John Doe',
    startsAt:getFutureDate('2023-06-26'),
    endsAt:getFutureDate('2023-06-28')
   })).rejects.toBeInstanceOf(Error)
   
   
   
  });
});
