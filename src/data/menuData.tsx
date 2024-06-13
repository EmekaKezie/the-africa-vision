import { IMenu } from "@/types/IMenu";
import {
  AutoGraph,
  AutoStories,
  Campaign,
  Dashboard,
  Logout,
  Payment,
  People,
  Quiz,
  Settings,
  Task,
} from "@mui/icons-material";

export const mainMenuData: IMenu[] = [
  {
    id: "1",
    url: "/",
    name: "Home",
    visibility: true,
  },
  // {
  //   id: "1",
  //   url: "/explore/campaign",
  //   name: "Campaigns",
  //   visibility: true,
  // },
  {
    id: "1",
    url: "/explore/donate",
    name: "Campaign",
    visibility: true,
  },
  {
    id: "1",
    url: "/explore/blog",
    name: "Blog",
    visibility: true,
  },
  {
    id: "1",
    url: "/explore/contact",
    name: "Contact us",
    visibility: true,
  },
];

export const authMenuData: IMenu[] = [
  {
    id: "1",
    url: "/auth/login",
    name: "Login",
    visibility: true,
  },
  {
    id: "1",
    url: "/auth/singup",
    name: "Sign up",
    visibility: true,
  },
];

export const authenticatedCreatorMenu1: IMenu[] = [
  {
    id: "1",
    url: "/creator/dashboard",
    name: "Overview",
    visibility: true,
    icon: <Dashboard />,
  },
  {
    id: "2",
    url: "/creator/story",
    name: "Stories",
    visibility: true,
    icon: <AutoStories />,
  },
  {
    id: "3",
    url: "/creator/campaign",
    name: "Campaign",
    visibility: true,
    icon: <Campaign />,
  },
  {
    id: "4",
    url: "/creator/payout",
    name: "Payment",
    visibility: true,
    icon: <Payment />,
  },
  // {
  //   id: "5",
  //   url: "/",
  //   name: "FAQ",
  //   visibility: true,
  //   icon: <Quiz />,
  // },
];

export const authenticatedSuperAdminMenu1: IMenu[] = [
  {
    id: "1",
    url: "/admin/dashboard",
    name: "Dashboard",
    visibility: true,
    icon: <Dashboard />,
  },
  {
    id: "2",
    url: "/admin/creators",
    name: "Creators",
    visibility: true,
    icon: <People />,
  },
    // {
    //   id: "3",
    //   url: "/admin/analytics",
    //   name: "Analytics",
    //   visibility: true,
    //   icon: <AutoGraph />,
    // },
  {
    id: "4",
    url: "/admin/payments",
    name: "Payments",
    visibility: true,
    icon: <Payment />,
  },
  {
    id: "5",
    url: "/admin/approvals",
    name: "Approvals",
    visibility: true,
    icon: <Task />,
  },
];

export const authenticatedCreatorMenu2: IMenu[] = [
  {
    id: "1",
    url: "/creator/setting",
    name: "Setting",
    visibility: true,
    icon: <Settings />,
  },
  {
    id: "2",
    url: "/auth/logout",
    name: "Log Out",
    visibility: true,
    icon: <Logout />,
  },
];

export const authenticatedSuperAdminMenu2: IMenu[] = [
  {
    id: "1",
    url: "/admin/setting",
    name: "Setting",
    visibility: true,
    icon: <Settings />,
  },
  {
    id: "2",
    url: "/auth/logout",
    name: "Log Out",
    visibility: true,
    icon: <Logout />,
  },
];
