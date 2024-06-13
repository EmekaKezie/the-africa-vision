import { IUser2 } from "./IUser";

export interface IAuth {
  id: string;
  token: string;
  email: string;
  fullname: string;
  role: string;
}

export interface IAuthStore {
  isLoggedIn: boolean;
  id: number;
  token: string;
  email: string;
  fullname: string;
  role: string;
  country: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  fullname: string;
  email: string;
  phone: string;
  country: string;
  password: string;
}

export interface ILoginSignupResponse {
  token: string;
  user: IUser2;
}

export interface IVerifyEmail {
  email: string;
  otp: string;
}

export interface IResendVerificationCode {
  email: string;
}
