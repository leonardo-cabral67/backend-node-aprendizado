import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointments } from "../repositories/in-memory/in-memory-appointments";
import { CreateAppoitment } from "./create-appoitment";
import { getFutureDate } from "../tests/utils/get-future-date";
//  A classe create appoitment tem uma função assíncrona que recebe como parâmetro
//uma request (que tem os tipos dos atributos do appoitment) e uma response que seria o
//próprio appoitment criado, ou seja, o tipo é Appoitment.

// resumdindo: recebo uma request com as propriedades do appoitment e retorno um appotiment

describe("Create Appointment with create appointment method", () => {
  it("should be able to create an appointment", () => {
    const appointmentRepository = new InMemoryAppointments();
    const createAppointment = new CreateAppoitment(appointmentRepository);

    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-11");

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should be not able to create an appointment with overlaps dates", async () => {
    const appointmentRepository = new InMemoryAppointments();
    const createAppointment = new CreateAppoitment(appointmentRepository);

    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");

    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-14"),
        endsAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-09"),
        endsAt: getFutureDate("2022-08-12"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-08"),
        endsAt: getFutureDate("2022-08-16"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
