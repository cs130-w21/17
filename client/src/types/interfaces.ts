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

export interface ILoginState {}

export interface ILogoutProps {
  logout(): void;
}

export interface ILogoutState {}



//APP
export interface IAppState {
  isAuthenticated: boolean;
  user: IUser | null;
}

export interface IAppProps {

}


export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

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
export interface HomePageProps {}
export interface HomePageState {}

export interface InvitationProps {}
export interface InvitationState {}

// ITEMS
export interface IExistingItem {
  _id: string;
  name: string;
}

export interface IItem {
  _id?: string;
  name: string;
}

export interface IItemModal {
  isAuthenticated: boolean;
  addItem(item: IItem): void;
}


export interface IShoppingList {
  item: {
    items: IExistingItem[];
  };
  getItems(): void;
  deleteItem(id: string): void;
  isAuthenticated: boolean;
}

// <<<<<<<<<<<>>>>>>>>>>>>
// <<<<<<<< FLUX >>>>>>>>>
// <<<<<<<<<<<>>>>>>>>>>>>

export interface IAuthFunction {
  name?: string;
  email: string;
  password: string;
}

export interface IReturnErrors {
  msg: {
    msg: string | any;
  };
  status: string;
  id: any;
}

export interface IAction {
  type: string;
  payload?: any;
}
