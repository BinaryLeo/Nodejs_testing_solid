import { Appointment } from "../entities/appointment";

export interface AppointmentRepository{
 create(appoitment: Appointment): Promise<void>;
FindOverlapingAppointment(startsAt:Date,endsAt:Date):Promise<Appointment|null>
}