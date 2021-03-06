import { customAppointment, Event, FormProps } from '../../types/interfaces';

const usaTime = (date: any) =>
  new Date(date).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

export const mapEventToAppointment = (
  googleEvent: Event
): customAppointment => ({
  id: googleEvent.id,
  startDate: usaTime(googleEvent.start.dateTime),
  endDate: usaTime(googleEvent.end.dateTime),
  title: googleEvent.summary,
  location: googleEvent.location,
  description: googleEvent.description,
  attendees: googleEvent.attendees,
  readOnly: true,
  isInviteeEvent: googleEvent.isInviteeEvent,
<<<<<<< HEAD
  rRule: googleEvent.recurrence ? googleEvent.recurrence[0] : undefined,
=======
>>>>>>> 4df434238ee4bef06ff28b6df9dcbef5bb1d9ccc
});

export const mapAppointmentToEvent = (
  appointment: customAppointment
): Event => ({
  location: appointment.location,
  summary: appointment.title,
  description: appointment.description,
  start: {
    dateTime: new Date(appointment.startDate),
    timeZone: 'America/Los_Angeles',
  },
  end: {
    dateTime: new Date(appointment.endDate),
    timeZone: 'America/Los_Angeles',
  },
  attendees: appointment.attendees,
  recurrence: appointment.rRule ? [appointment.rRule] : undefined,
});
