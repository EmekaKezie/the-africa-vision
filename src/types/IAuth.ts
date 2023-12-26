import { IRole } from "./IRole";

export interface IAuth {
  id: string;
  token: string;
  email: string;
  firstname: string;
  lastname: string;
  role: IRole;
}

export interface IAuthStore {
  id: string;
  token: string;
  email: string;
  firstname: string;
  lastname: string;
  roleId: string;
  roleName: string;
}
