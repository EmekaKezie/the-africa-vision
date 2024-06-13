import { ReactNode } from "react";
import { ICategory } from "./ICategory";
import { IUser2 } from "./IUser";

interface ICampaign {
  title: string;
  content: ReactNode | string;
  venue: string;
  start_date: string;
  end_date: string;
  target_amount: number;
  payment_options: string[];
  partners?: string[];
}

export interface ICampaignData extends ICampaign {
  id: number;
  email: string;
  image: any;
  category: ICategory;
  raised_amount?: number;
  contributors?: number;
  published_at?: string;
  is_published: number;
  base_currency?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  approval_status: string;
  user?: IUser2;
}

export interface ICampaignInput extends ICampaign {
  imageBase64?: string;
  category_id: number | string;
  draft: boolean;
}

export interface ICampaignDonation {
  id: string;
  name: string;
  email: string;
  amount: number;
  phone_number: string;
  description: string;
  currency: string;
  converted_amount: number;
  base_currenty: string;
  campaign_id: string;
  status: string;
  is_paid: number;
  campaign_owner_id: 6;
  reference: string;
  payment_gateway: string;
  created_at: string;
}
