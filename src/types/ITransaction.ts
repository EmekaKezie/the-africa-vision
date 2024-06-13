import { IUser2 } from "./IUser";

export interface ITransaction {
  id: string;
  donorFullname: string;
  transactionAmount: number;
  transactionCurrency: string;
  transactionDate: string;
  transactionType: string;
  transactionRemark: string;
  transactionStatus: string;
  transactionRef?: string;
}

export interface IPayoutSummary {
  description: string;
  amount?: number;
  currencyCode?: string;
}

export interface IPaymentHistory {
  payment_id: number;
  invoice_no: string;
  invoice_date?: string;
  invoice_url?:string;
  paid_at?: string;
  status: string;
  is_approved: number;
  payment_method: string;
  subscription: string;
  amount: number;
  currency: string;
  user?: IUser2;
}
