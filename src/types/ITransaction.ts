export interface ITransaction {
  id: string;
  donorFullname: string;
  transactionDate: string;
  transactionType: string;
  transactionRemark: string;
  transactionStatus: string;
  transactionRef?: string;
}
