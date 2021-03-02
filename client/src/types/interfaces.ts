// REACT
import { SchedulerDateTime } from "@devexpress/dx-react-scheduler";
import {RouteComponentProps} from "react-router";

export interface ITarget {
  target: {
    value: React.SetStateAction<string>;
  };
  preventDefault(): void;
}

// ERRORS
export interface IMsg {
  msg: string | any;
}

// AUTH
export interface IUser {
  id: string;
  fullName: string;
  givenName: string;
  familyName: string;
  imageURL: string;
  email: string;
  accessToken: string;
}

export interface IAuthHandlerProps {
  isAuthenticated: boolean;
  login(user: IUser): void;
  logout(): void;
}

export interface IAuthHandlerState {}

export interface ILoginProps {
  login(user : IUser): void;
}

export interface ILoginState {
  failedLogin: boolean;
}

export interface ILogoutProps {
  logout(): void;
}

export interface ILogoutState {}



//APP
export interface IAppState {
  isAuthenticated: boolean;
  user: IUser | null;
}

export interface IAppProps {}


// NAVBAR
export interface INavbarProps {
  isAuthenticated: boolean;
  user: IUser | null;

  login(user: IUser): void;
  logout(): void;
}

export interface INavbarState {
  isOpen: boolean;
}


//PAGES
export interface HomePageProps {
  user:IUser | null;
  isAuthenticated: boolean;

}
export interface HomePageState {}

export interface CalendarPageProps extends RouteComponentProps {
  user:IUser | null;
  isAuthenticated: boolean;
}
export interface CalendarPageState {}

export interface InvitationPageProps extends RouteComponentProps {
  user: IUser | null;
  isAuthenticated: boolean;
}

export interface InvitationPageState {
  inviterProfile: IUser | null;
  inviteeProfile: IUser | null;
  inviteeEmail: string | null;
}

export interface InvitationProps {
  user: IUser | null;
}
export interface InvitationState {
  modal_opened?: boolean;
  invitee_name?: string;
  invitee_email?: string;
  submitted?: boolean;
  invite_sent?: boolean;
  backend_error?: boolean;
}


//CALENDAR

export interface DemoProps {}
export interface DemoState {
  data: any
  currentViewName: string
}

export interface SyncedCalendarProps {
  user:IUser | null;
  isAuthenticated: boolean;
}

export interface InviteeCalendarProps {
  user:IUser | null;
  isAuthenticated: boolean;
  inviteeEmail: string | null;
}
interface Attendee {
  email: string;

}
export interface Event {
  id: string;
  location: string;
  summary: string;
  description: string;
  start: {
    date?: any,
    dateTime: any,
    timeZone?: string
  }
  end: {
    date?: any,
    dateTime: any,
    timeZone?: string
  }
  attendees:Attendee[]
}

export interface customAppointment {
  startDate:SchedulerDateTime
  endDate:SchedulerDateTime
  title: string;
  allDay?:boolean
  id: string;
  rRule?:string;
  exDate?: string;

  location: string;
  description: string;
  attendees: Attendee[];
}

export interface FormProps
  { onFieldChange: any;
     appointmentData: customAppointment;
      restProps: any }
