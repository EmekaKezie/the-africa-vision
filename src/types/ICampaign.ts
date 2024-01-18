import { ReactNode } from "react";
import { ICategory } from "./ICategory";

interface ICampaign {
  title: string;
  content: ReactNode | string;
  startDate: string;
  endDate: string;
  amountBudgeted: number;
  amountCurrency: string;
}

export interface ICampaignCreate extends ICampaign {
  categoryId: string;
  authorId: string;
  paymentOption: string;
  partnerIds: string[];
}
