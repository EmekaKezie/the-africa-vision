import { IRole } from "./IRole";

export interface IAuth {
  id: string;
  token: string;
  email: string;
  fullname: string;
  role: string;
}

export interface IAuthStore {
  isLoggedIn: boolean;
  id: string;
  token: string;
  email: string;
  fullname: string;
  role: string;
}
