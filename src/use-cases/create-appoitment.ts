import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointment-repository";

interface createAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type createAppointmentResponse = Appointment;

export class CreateAppoitment {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: createAppointmentRequest): Promise<createAppointmentResponse> {
    const overLappingAppointment =
      await this.appointmentRepository.findOverLappingAppointment({
        startsAt,
        endsAt,
      });

    if (overLappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates.");
    }

    const appointment = new Appointment({ customer, startsAt, endsAt });

    await this.appointmentRepository.create(appointment);

    return appointment;
  }
}
