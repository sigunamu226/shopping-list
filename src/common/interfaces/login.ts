export enum InputType {
  EMAIL,
  PASS,
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IError {
  email: boolean;
  password: boolean;
  emailErrorMessage: string;
  passwordErrorMessage: string;
}
