export interface IPayout {}

export interface IPayoutData {
  id: string;
  name?: string;
  user_id: string;
  campaign_id: string;
  amount: number;
  total_payments: number;
  payment_gateway_local: number;
  payment_gateway_international: number;
  company_percentage_local: number;
  company_percentage_international: number;
  status: string;
  payment_method: string;
  bank_name?: string;
  bank_code?: string;
  account_name?: string;
  account_number?: number;
  email: string;
  approved_by?: string;
  created_at: string;
  updated_at?: string;
  currency?: string;
}

export interface IPayoutCalculation {
  total_payments: number;
  payment_gateway_fee: number;
  company_percentage: number;
  payment_gateway_local: number;
  company_percentage_local: number;
  payout: number;
}
