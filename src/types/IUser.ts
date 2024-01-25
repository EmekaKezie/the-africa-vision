export interface IUser {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  entryDate: string;
  totalEarning?: number;
  totalPayout?: number;
  currencyCode?:string
  photo?:any
}
