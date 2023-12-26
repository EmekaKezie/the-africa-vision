import { authenticatedUserAdminMenu } from "@/data/menuData";
import { useAppSelector } from "@/redux/useReduxHooks";
import { IMenu } from "@/types/IMenu";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

export default function AuthenticatedNavMenu1() {
  const authStore = useAppSelector((state) => state.authReducer);

  const renderUserAdminMenu = () => {
    return (
      <List>
        {authenticatedUserAdminMenu?.map((item: IMenu) => {
          if (item.visibility) {
            return (
              <Link key={item.id} href={item.url}>
                <ListItem>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} sx={{ color: "#202020" }} />
                </ListItem>
              </Link>
            );
          }
        })}
      </List>
    );
  };

  const renderSuperAdminMenu = () => {
    return (
      <List>
        {authenticatedUserAdminMenu?.map((item: IMenu) => {
          if (item.visibility) {
            return (
              <Link key={item.id} href={item.url}>
                <ListItem>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} sx={{ color: "#202020" }} />
                </ListItem>
              </Link>
            );
          }
        })}
      </List>
    );
  };

  const renderContent = () => {
    if (authStore.roleName.toUpperCase() === "USER ADMIN")
      return renderUserAdminMenu();
    else return renderSuperAdminMenu();
  };

  return (
    <List>
      {renderContent()}
      {/* <Link href="/overview">
        <ListItem>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItem>
      </Link>

      <Link href="/overview">
        <ListItem>
          <ListItemIcon>
            <AutoStories />
          </ListItemIcon>
          <ListItemText primary="Stories" />
        </ListItem>
      </Link>

      <Link href="/overview">
        <ListItem>
          <ListItemIcon>
            <Campaign />
          </ListItemIcon>
          <ListItemText primary="Campaign" />
        </ListItem>
      </Link> */}
    </List>
  );
}
