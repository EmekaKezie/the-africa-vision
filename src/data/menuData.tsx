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
  {
    id: "1",
    url: "/campaign",
    name: "Campaigns",
    visibility: true,
  },
  {
    id: "1",
    url: "/donate",
    name: "Donate",
    visibility: true,
  },
  {
    id: "1",
    url: "/blog",
    name: "Blog",
    visibility: true,
  },
  {
    id: "1",
    url: "/contactus",
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

export const authenticatedUserAdminMenu: IMenu[] = [
  {
    id: "1",
    url: "/overview",
    name: "Overview",
    visibility: true,
    icon: <Dashboard />,
  },
  {
    id: "2",
    url: "/stories",
    name: "Stories",
    visibility: true,
    icon: <AutoStories />,
  },
  {
    id: "3",
    url: "/campaign-uadm",
    name: "Campaign",
    visibility: true,
    icon: <Campaign />,
  },
  {
    id: "4",
    url: "/transaction",
    name: "Payment",
    visibility: true,
    icon: <Payment />,
  },
  {
    id: "5",
    url: "/",
    name: "FAQ",
    visibility: true,
    icon: <Quiz />,
  },
];

export const authenticatedSuperAdminMenu: IMenu[] = [
  {
    id: "1",
    url: "/dashboard",
    name: "Dashboard",
    visibility: true,
    icon: <Dashboard />,
  },
  {
    id: "2",
    url: "/",
    name: "Creators",
    visibility: true,
    icon: <People />,
  },
  {
    id: "3",
    url: "/",
    name: "Analytics",
    visibility: true,
    icon: <AutoGraph />,
  },
  {
    id: "4",
    url: "/",
    name: "Payment",
    visibility: true,
    icon: <Payment />,
  },
  {
    id: "5",
    url: "/",
    name: "Approval",
    visibility: true,
    icon: <Task />,
  },
];

export const authenticatedMenu: IMenu[] = [
  {
    id: "1",
    url: "/Setting",
    name: "Setting",
    visibility: true,
    icon: <Settings />,
  },
  {
    id: "2",
    url: "../auth/logout",
    name: "Log Out",
    visibility: true,
    icon: <Logout />,
  },
];
