import { authenticatedMenu } from "@/data/menuData";
import { IMenu } from "@/types/IMenu";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

export default function AuthenticatedNavMenu2() {
  return (
    <List>
      {authenticatedMenu?.map((item: IMenu) => {
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
}
