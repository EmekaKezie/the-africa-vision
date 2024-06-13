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
  currencyCode?: string;
  photo?: any;
}

export interface IUser2 {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  country: string;
  zip_code?: string;
  role?: string;
  is_verified?: number;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  last_login?: string;
  _blocked?: number;
  email_verified?: number;
  email_verified_at?: string;
}
