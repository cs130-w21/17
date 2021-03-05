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

/**
 * A User object interface. Contains information about the user,
 * including their email which uniquely identifies them and an
 * accessToken which allows the Application to call Google API's
 * on their behalf.
 */
export interface IUser {
  id: string;
  fullName: string;
  givenName: string;
  familyName: string;
  imageURL: string;
  email: string;
  accessToken: string;
}

/**
 * An interface for components to extend when they need to know if a
 * user is logged in, as well as information about that user.
 */
interface IUserState {
  isAuthenticated: boolean;
  user: IUser | null;
}

/**
 * AuthHandler Component props which contain information about the user's
 * login state, as well as callback functions for setting the App State.
 */
export interface IAuthHandlerProps {
  isAuthenticated: boolean;
  login(user: IUser): void;
  logout(): void;
}

/**
 * AuthHandler Component state. No state information needed currently.
 */
export interface IAuthHandlerState {}

/**
 * Login Component props. Contains a callback function for setting the application state.
 */
export interface ILoginProps {
  login(user : IUser): void;
}

/**
 * Login Component state. Only contains information about whether a login attempt has failed or not.
 */
export interface ILoginState {
  failedLogin: boolean;
}

/**
 * Logout Component props. Contains a callback function for setting the application state.
 */
export interface ILogoutProps {
  logout(): void;
}

/**
 * Logout Component state. No information needed currently.
 */
export interface ILogoutState {}


/**
 * App Component state. Only extends the IUserState interface for now.
 */
export interface IAppState extends IUserState {}

/**
 * App Component props. Nothing needed to pass in currently, as this is the
 * top level component of the application.
 */
export interface IAppProps {}


/**
 * Navbar Component props. Extends IUserState to also contain callback functions
 * for setting the application state.
 */
export interface INavbarProps extends IUserState {
  login(user: IUser): void;
  logout(): void;
}

/**
 * Navbar Component state. Contains information about whether
 * the navbar is open/closed.
 */
export interface INavbarState {
  isOpen: boolean;
}


/**
 * HomePage Component props. Only contains information about the user.
 */
export interface HomePageProps extends IUserState {}

/**
 * HomePage Component state. No information needed currently.
 */
export interface HomePageState {}

/**
 * Calendar Component props. Contains information about the user as
 * well as information about the URL/browsing session.
 */
export interface CalendarPageProps extends RouteComponentProps, IUserState {}

/**
 * Calendar Component state. No information needed currently.
 */
export interface CalendarPageState {}

/**
 * InvitationPage Component props. Contains information about the user as
 * well as information about the URL/browsing session.
 */
export interface InvitationPageProps extends RouteComponentProps, IUserState {}

/**
 * InvitationPage Component state. Needs information about both the inviter
 * and invitee, as well as information about whether or not the meeting
 * was created.
 */
export interface InvitationPageState {
  inviterProfile: IUser | null;
  inviteeProfile: IUser | null;
  inviteeEmail: string | null;
  inviteeName: string | null;
  success: boolean;
  error:boolean;
  isExpired: boolean;
  isLoading: boolean;

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


export interface SyncedCalendarProps {
  user:IUser | null;
  isAuthenticated: boolean;
}

export interface InviteeCalendarProps {
  user:IUser | null;
  isAuthenticated: boolean;
  inviteeEmail: string | null;
  setSuccess(): void;
  getId(): string;
  sendConfirmation(start: SchedulerDateTime, end: SchedulerDateTime, location: string): void;
}
interface Attendee {
  email: string;

}
export interface Event {
  id?: string;
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
  id?: string;
  rRule?:string;
  exDate?: string;
  readOnly?: boolean;
  location: string;
  description: string;
  attendees: Attendee[];
}

export interface FormProps
  { onFieldChange: any;
     appointmentData: customAppointment;
      restProps: any }
