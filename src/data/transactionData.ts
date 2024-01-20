import { IPayoutSummary, ITransaction } from "@/types/ITransaction";

export const transactionData: ITransaction[] = [
  {
    id: "1",
    donorFullname: "Olivia Ryne",
    transactionAmount: 200000,
    transactionCurrency: "NGN",
    transactionDate: "2023-12-02T09:21:30.123Z",
    transactionType: "donation",
    transactionStatus: "success",
    transactionRemark: "Suppor Program",
    transactionRef: "1234",
  },
  {
    id: "2",
    donorFullname: "Ken Chuks",
    transactionAmount: 20000,
    transactionCurrency: "USD",
    transactionDate: "2023-12-02T09:21:30.123Z",
    transactionType: "donation",
    transactionStatus: "failed",
    transactionRemark: "Suppor Program",
    transactionRef: "1234",
  },
  {
    id: "3",
    donorFullname: "Lara Ola",
    transactionAmount: 200000,
    transactionCurrency: "NGN",
    transactionDate: "2023-12-02T09:21:30.123Z",
    transactionType: "donation",
    transactionStatus: "success",
    transactionRemark: "Suppor Program",
    transactionRef: "1234",
  },
  {
    id: "4",
    donorFullname: "Moha Saki",
    transactionAmount: 200000,
    transactionCurrency: "NGN",
    transactionDate: "2023-12-02T09:21:30.123Z",
    transactionType: "donation",
    transactionStatus: "pending",
    transactionRemark: "Suppor Program",
    transactionRef: "1234",
  },
  {
    id: "5",
    donorFullname: "Ubong Bassey",
    transactionAmount: 200000,
    transactionCurrency: "NGN",
    transactionDate: "2023-12-02T09:21:30.123Z",
    transactionType: "donation",
    transactionStatus: "success",
    transactionRemark: "Suppor Program",
    transactionRef: "1234",
  },
  {
    id: "6",
    donorFullname: "Sim Bala",
    transactionAmount: 200000,
    transactionCurrency: "NGN",
    transactionDate: "2023-12-02T09:21:30.123Z",
    transactionType: "donation",
    transactionStatus: "success",
    transactionRemark:
      "Support program for the education of children in the Western-South coast of Malubri",
    transactionRef: "1234",
  },
  {
    id: "7",
    donorFullname: "Anga Jang",
    transactionAmount: 200000,
    transactionCurrency: "NGN",
    transactionDate: "2023-12-02T09:21:30.123Z",
    transactionType: "donation",
    transactionStatus: "failed",
    transactionRemark: "Suppor Program",
    transactionRef: "1234",
  },
];

export const payoutSummaryData: IPayoutSummary[] = [
  {
    description: "Total Amount Generated",
    amount: 2001149.94,
    currencyCode: "NGN",
  },
  {
    description: "Total Amount Due to organizer ",
  },
  {
    description: "Total Amount Due to payment Gateway",
  },
  {
    description: "Total Amount Due to payment Gateway",
  },
  {
    description: "Total Amount Due to TheAfrica Vision",
  },
  {
    description: "Amount Payable",
    amount: 1945149.94,
    currencyCode: "NGN",
  },
];
