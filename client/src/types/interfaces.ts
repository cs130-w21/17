import { E_ERROR } from './enum';

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
  login(user : IUser): void
}

export interface ILogoutState {}

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


export interface IError {
  id: E_ERROR;
  msg: IMsg;
}

export interface IAuthReduxProps {
  auth: { isAuthenticated: boolean };
  error: IError;
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

export interface IItemReduxProps extends IAuthReduxProps {
  item: {
    items: IExistingItem[];
  };
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
