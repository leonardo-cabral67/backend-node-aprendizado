import { Appointment } from "../entities/appointment";

interface createAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type createAppointmentResponse = Appointment;

export class CreateAppoitment {
  async execute({
    customer,
    startsAt,
    endsAt,
  }: createAppointmentRequest): Promise<createAppointmentResponse> {
    const createAppointment = new Appointment({ customer, startsAt, endsAt });
    return createAppointment;
  }
}
