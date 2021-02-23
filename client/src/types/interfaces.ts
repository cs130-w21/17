// REACT
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
  refreshToken: string;
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
