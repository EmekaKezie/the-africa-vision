export interface IStory {
  id: string;
  image: string | any;
  title: string;
  content: string | JSX.Element;
  date?: string;
  author?: string;
  likes?: number;
  comments?: number;
  categoryId?: string;
  categoryName?: string;
  analytics?: IStoryAnalytics;
}

interface IStoryAnalytics {
  raised?: number;
  goal?: number;
  percentage?: number;
  count?: number;
}

export interface IStoryCategory {
  id: string;
  name: string;
}
