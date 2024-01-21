import { IGraphActiveVisitors, IGraphRevenueOutflow } from "@/types/IGraph";

export const graphRevenueOutflowData: IGraphRevenueOutflow[] = [
  {
    name: "Jan",
    revenue: 4000,
    outflow: 2400,
    //amt: 2400,
  },
  {
    name: "Feb",
    revenue: 3000,
    outflow: 1398,
    //amt: 2210,
  },
  {
    name: "Mar",
    revenue: 2000,
    outflow: 9800,
    //amt: 2290,
  },
  {
    name: "Apr",
    revenue: 2780,
    outflow: 6908,
  },
  {
    name: "May",
    revenue: 1890,
    outflow: 4800,
  },
  {
    name: "Jun",
    revenue: 2390,
    outflow: 3800,
  },
  {
    name: "Jul",
    revenue: 3490,
    outflow: 4300,
  },
  {
    name: "Aug",
    revenue: 3490,
    outflow: 4300,
  },
  {
    name: "Sep",
    revenue: 8490,
    outflow: 4300,
  },
  {
    name: "Oct",
    revenue: 3490,
    outflow: 4300,
  },
  {
    name: "Nov",
    revenue: 2780,
    outflow: 3908,
  },
  {
    name: "Dec",
    revenue: 2780,
    outflow: 3908,
  },
];

export const activeVisitorsData: IGraphActiveVisitors = {
  totalVisitors: 157367,
  isIncrease: true,
  percentage: 6.7,
  analytics: [
    {
      name: "May",
      count: 2400,
    },
    {
      name: "Jun",
      count: 3400,
    },
    {
      name: "Jul",
      count: 5400,
    },
    {
      name: "Aug",
      count: 4400,
    },
    {
      name: "Sept",
      count: 2400,
    },
    {
      name: "Oct",
      count: 5400,
    },
  ],
};

export const graphConversionRateData: IGraphActiveVisitors = {
  totalVisitors: 157367,
  isIncrease: false,
  percentage: 6.7,
  analytics: [
    {
      name: "May",
      count: 2400,
    },
    {
      name: "Jun",
      count: 3400,
    },
    {
      name: "Jul",
      count: 5400,
    },
    {
      name: "Aug",
      count: 4400,
    },
  ],
};
