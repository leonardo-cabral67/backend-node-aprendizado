import { areIntervalsOverlapping } from "date-fns";

import { Appointment } from "../../entities/appointment";
import {
  AppointmentDate,
  AppointmentRepository,
} from "../appointment-repository";

export class InMemoryAppointments implements AppointmentRepository {
  public items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  // prettier-ignore
  async findOverLappingAppointment(date: AppointmentDate): Promise<Appointment | null> {
    const overLappingAppointment = this.items.find(appointment => {
      return areIntervalsOverlapping(
        {start: date.startsAt, end: date.endsAt},
        {start: appointment.startAt, end: appointment.endsAt},
        {inclusive: true}
      )
    })
    return !overLappingAppointment ? null : overLappingAppointment 
  }
}
