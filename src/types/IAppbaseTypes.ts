export interface IResponse<T> {
  status: ResponseEnum;
  message: string;
  data: T;
}

export enum ResponseEnum {
  success = "success",
  fail = "fail",
  expired_token = "token_failure"
}

export const RoleTypes = {
  user: "user",
  admin: "admin",
};

export interface IPagination {
  perPage: number;
  currentPage: number;
  nextPage: string;
  prevPage: string;
  totalPages: number;
  total: number;
}
