export interface IPaystackInitialize {
  email: string;
  amount: number;
  currency: string;
  callback_url: string;
}

export interface IPaymentOption {
  id: string;
  optionCode: string;
  name: string;
}
