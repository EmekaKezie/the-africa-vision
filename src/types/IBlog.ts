import { ICategory } from "./ICategory";
import { IUser2 } from "./IUser";

export interface IBlog {
  title: string;
  content: string;
  seo_keywords: string;
  video_url: string;
  referenceUrl: string;
}

export interface IBlogData extends IBlog {
  id: number;
  user_id: string;
  category_id: number;
  email: string;
  image: string;
  is_published: number;
  published_at: string;
  is_approved: number;
  approval_status: string;
  views: number;
  likes: number;
  post_likes: any[];

  dislikes: number;
  post_dislikes: any[];

  comments: number;
  shares: number;
  reports: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  user: IUser2;
  category: ICategory;
  user_comments: IBlogComment[];
}

export interface IBlogInput extends IBlog {
  imageBase64?: string;
  powerPointBase64?: string;
  category_id: number;
  draft: boolean;
}

export interface IBlogComment {
  id: string;
  avatar: any;
  comment: string;
  email: string;
  created_at: string;
  updated_at: string;
  post_id: string;
  user_id: string;
}

export interface IBlogCommentInput {
  comment: string;
}
