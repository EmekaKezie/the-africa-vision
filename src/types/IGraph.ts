export interface IGraphRevenueOutflow {
  name: string;
  revenue: number;
  outflow: number;
}

export interface IGraphActiveVisitors {
  totalVisitors: number;
  isIncrease: boolean;
  percentage: number;
  analytics: {
    name: string;
    count: number;
  }[];
}
