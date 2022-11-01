export interface IAppointmentProps {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  constructor(private props: IAppointmentProps) {
    const { startsAt, endsAt } = props;
    if (startsAt <= new Date()) {
      throw new Error("Invalid start date");
    }
    
    if (endsAt <= startsAt) {
      throw new Error("Invalid end Date");
    }

    this.props = props;
  }

  get customer() {
    return this.props.customer;
  }
  get startAt() {
    return this.props.startsAt;
  }
  get endsAt() {
    return this.props.endsAt;
  }
}
