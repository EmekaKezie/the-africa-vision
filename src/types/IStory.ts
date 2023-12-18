import { IContact } from "./IContact";

export interface IStory {
  id: string;
  image: IStoryImage;
  title: string;
  content: any;
  date?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  categoryId?: string;
  categoryName?: string;
  analytics?: IStoryAnalytics;
  url?: string;
  author?: string;
  facilitator?: IContact;
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

export interface IStoryCategory {
  id: string;
  name: string;
}
