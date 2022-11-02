import { Appointment } from "../entities/appointment";

export interface AppointmentDate {
  startsAt: Date;
  endsAt: Date;
}

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  findOverLappingAppointment(date: AppointmentDate): Promise<Appointment | null>;
}
