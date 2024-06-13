export interface IPaystackInitialize {
  email: string;
  amount: number;
  currency: string;
  callback_url: string;
}

export interface IPaymentOption {
  id: string;
  desc: string;
  name: string;
}

export interface IPaymentInitiate {
  amount: number;
  campaign_id: string;
  payment_gateway: string;
  currency: string;
  description: string;
  email: string;
  name: string;
}




