import { ReactNode } from "react";
import { IContact } from "./IContact";
import { IUser2 } from "./IUser";

export interface IStory {
  id: number;
  title: string;
  content: ReactNode | string;
  slug?: string;
  email?: string;
  image?: any;
  category_id: number;
  category: string;
  seo_keywords: string;

  ////////////////////////////////////

  power_point_url?: string;
  video_url?: string;
  reference_url?: string;

  /////////////////////////////////////

  created_at: string;
  updated_at: string;
  deleted_at: string;
  is_published: number;
  is_approved: number;

  /////////////////////////////////////

  views: number;
  likes?: number;
  dislikes?: number;
  comments?: number;
  shares?: number;
  reports?: number;
  user_comments: any[];

  ///////////////////////////////////////////////////////

  user: IUser2;

  //==================================================///

  startDate?: string;
  endDate?: string;
  venue?: string;
  categoryId?: string;
  categoryName?: string;
  coverImage?: any;

  budget: number;
  currency: string;
  revenue: number;
  contributors: number;

  approvalStatus?: string;

  creatorId?: string;
  creatorFullname?: string;
  //creatorFirstname?: string;
  //creatorLastname?: string;
  creatorEmail?: string;
  creatorImage?: any;

  //analytics?: IStoryAnalytics;
  //url?: string;
  //author?: string;
  facilitator?: IContact;

  createdDate?: string;
  imageStory?: any[];
}

export interface IStoryAnalytics {
  goal?: number;
  attanied?: number;
  outstanding?: number;
  percentage?: number;
  contributions?: number;
  currency?: string;
  countdown?: number;
}

export interface IActionOption {
  showView?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
}
