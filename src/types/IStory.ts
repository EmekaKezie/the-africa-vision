import { ReactNode } from "react";
import { IContact } from "./IContact";

export interface IStory {
  id: string;
  title: string;
  content: ReactNode | string;
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

  likes?: number;
  comments?: number;
  shares?: number;

  creatorId?: string;
  creatorFirstname?: string;
  creatorLastname?: string;
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

interface IStoryImage {
  src: any;
  col?: number;
  row?: number;
}

