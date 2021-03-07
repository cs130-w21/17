import { customAppointment, Event } from '../../types/interfaces';

const usaTime = (date: any) => {
  const temp = new Date(date).toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  return temp;
};

const allDayTime = (date: any) => {
  const temp = new Date(date).setHours(24, 0, 0, 0);

  return usaTime(temp);
};
export const checkStatus = (googleEvent: Event): boolean => {
  if (googleEvent.status) {
    if (googleEvent.status === 'cancelled') {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const mapEventToAppointment = (
  googleEvent: Event
): customAppointment => ({
  id: googleEvent.id,
  allDay: googleEvent.start.dateTime ? false : true,
  startDate: googleEvent.start.dateTime
    ? usaTime(googleEvent.start.dateTime)
    : allDayTime(googleEvent.start.date),
  endDate: googleEvent.end.dateTime
    ? usaTime(googleEvent.end.dateTime)
    : allDayTime(googleEvent.end.date),
  title: googleEvent.summary,
  location: googleEvent.location,
  description: googleEvent.description,
  attendees: googleEvent.attendees,
  readOnly: true,
  isInviteeEvent: googleEvent.isInviteeEvent,
  rRule: googleEvent.recurrence ? googleEvent.recurrence[0] : undefined,
  exDate: googleEvent.recurrence ? googleEvent.recurrence[3] : undefined,
  status: googleEvent.status ? googleEvent.status : undefined,
});

const getDate = (date: Date): string => {
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
};

export const mapAppointmentToEvent = (
  appointment: customAppointment
): Event => {
  return {
    location: appointment.location,
    summary: appointment.title,
    description: appointment.description,
    start: {
      dateTime: appointment.allDay
        ? undefined
        : new Date(appointment.startDate),
      date: appointment.allDay
        ? getDate(new Date(appointment.startDate))
        : undefined,
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: appointment.allDay ? undefined : new Date(appointment.endDate),
      date: appointment.allDay
        ? getDate(new Date(appointment.endDate))
        : undefined,
      timeZone: 'America/Los_Angeles',
    },
    attendees: appointment.attendees,
    recurrence: appointment.rRule
      ? appointment.exDate
        ? [appointment.rRule, appointment.exDate]
        : [appointment.rRule]
      : undefined,
  };
};
