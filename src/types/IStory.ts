export interface IStory {
  id: string;
  image: IStoryImage;
  title: string;
  content: any;
  date?: string;
  author?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  categoryId?: string;
  categoryName?: string;
  analytics?: IStoryAnalytics;
  url?: string;
}

interface IStoryAnalytics {
  raised?: number;
  goal?: number;
  percentage?: number;
  count?: number;
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
