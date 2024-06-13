interface IBank {
  bank_code: string;
  bank_name: string;
  account_number: string;
}

export interface IBankData extends IBank {
  id: string;
  account_name: string;
  is_default: boolean;
  user_id: string;
  is_verified: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IBankInput extends IBank {
  default: boolean;
}

export interface IBankVerification {
  code: string;
  name: string;
}
