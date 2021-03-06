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
});

export const mapAppointmentToEvent = (
  appointment: customAppointment
): Event => ({
  location: appointment.location,
  summary: appointment.title,
  description: appointment.description,
  start: {
    dateTime: new Date(appointment.startDate),
  },
  end: {
    dateTime: new Date(appointment.endDate),
  },
  attendees: appointment.attendees,
});
