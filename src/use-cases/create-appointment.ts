import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointment-repository";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}
type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}
  async excecute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlapingAppointment =
      await this.appointmentRepository.FindOverlapingAppointment(
        startsAt,
        endsAt
      );
      if(overlapingAppointment){
        throw new Error('Another appointment overlaps this appointment dates')
      }
    const appointment = new Appointment({ customer, startsAt, endsAt });
    await this.appointmentRepository.create(appointment);
    return appointment;
  }
}
