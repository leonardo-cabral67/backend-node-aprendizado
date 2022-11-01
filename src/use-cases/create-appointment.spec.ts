import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { CreateAppoitment } from "./create-appoitment";
//  A classe create appoitment tem uma função assíncrona que recebe como parâmetro
//uma request (que tem os tipos dos atributos do appoitment) e uma response que seria o
//próprio appoitment criado, ou seja, o tipo é Appoitment.

// resumdindo: recebo uma request com as propriedades do appoitment e retorno um appotiment

describe("Create Appointment with create appointment method", () => {
  it("should be able to create an appointment", () => {
    const createAppointment = new CreateAppoitment();

    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});
