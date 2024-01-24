import {
  authenticatedCreatorMenu2,
  authenticatedSuperAdminMenu2,
} from "@/data/menuData";
import { useAppSelector } from "@/redux/useReduxHooks";
import { IMenu } from "@/types/IMenu";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthenticatedNavMenu2() {
  const pathname = usePathname();
  const authStore = useAppSelector((state) => state.authReducer);

  const getPathHome = (): string => {
    const splitPath: string[] = pathname.split("/");
    const pathHome = `${splitPath[1]}/${splitPath[2]}`;
    return pathHome;
  };
  getPathHome();

  const renderCreatorMenu = () => {
    return authenticatedCreatorMenu2?.map((item: IMenu) => {
      if (item.visibility) {
        return (
          <Link key={item.id} href={item.url}>
            <ListItem
              sx={{
                borderRadius: "5px",
                backgroundColor:
                  getPathHome().toLowerCase() ===
                  item.url.slice(1).toLowerCase()
                    ? "#FFE1F5"
                    : null,
                ":hover": {
                  backgroundColor: "#F0F1F3",
                },
              }}>
              <ListItemIcon
                sx={{
                  color:
                    getPathHome().toLowerCase() ===
                    item.url.slice(1).toLowerCase()
                      ? "#A9518B"
                      : null,
                }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      color: "#202020",
                      fontSize: "0.9em",
                      fontWeight:
                        getPathHome().toLowerCase() ===
                        item.url.slice(1).toLowerCase()
                          ? "bold"
                          : "normal",
                    }}>
                    {item.name}
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        );
      }
    });
  };

  const renderSuperAdminMenu = () => {
    return authenticatedSuperAdminMenu2?.map((item: IMenu) => {
      if (item.visibility) {
        return (
          <Link key={item.id} href={item.url}>
            <ListItem
              sx={{
                borderRadius: "5px",
                backgroundColor:
                  getPathHome().toLowerCase() ===
                  item.url.slice(1).toLowerCase()
                    ? "#FFE1F5"
                    : null,
                ":hover": {
                  backgroundColor: "#F0F1F3",
                },
              }}>
              <ListItemIcon
                sx={{
                  color:
                    getPathHome().toLowerCase() ===
                    item.url.slice(1).toLowerCase()
                      ? "#A9518B"
                      : null,
                }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      color: "#202020",
                      fontSize: "0.9em",
                      fontWeight:
                        getPathHome().toLowerCase() ===
                        item.url.slice(1).toLowerCase()
                          ? "bold"
                          : "normal",
                    }}>
                    {item.name}
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        );
      }
    });
  };

  const renderContent = () => {
    switch (authStore.role.toUpperCase()) {
      case "USER":
        return renderCreatorMenu();
      case "SUPER ADMIN":
        return renderSuperAdminMenu();
      default:
        //return "No roles found";
        break;
    }
  };

  return (
    <List
      sx={{
        border: "0px solid gray",
        padding: "1rem 0.5rem",
      }}>
      {renderContent()}
    </List>
  );
}
