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
