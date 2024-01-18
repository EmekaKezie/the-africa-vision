import { IPaymentOption } from "@/types/IPayment";

export const paymentOptionData: IPaymentOption[] = [
  {
    id: "1",
    optionCode: "OFFLINE_GTB",
    name: "GTBank. Acct No: 2203324532",
  },
  {
    id: "2",
    optionCode: "ALLONLINE",
    name: "All Online Option",
  },
  {
    id: "3",
    optionCode: "ONLINE_PAYSTACK",
    name: "Paystack",
  },
  {
    id: "3",
    optionCode: "ONLINE_FLUTTERWAVE",
    name: "Flutterwave",
  },
];
