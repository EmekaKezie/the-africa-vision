import { authenticatedMenu } from "@/data/menuData";
import { IMenu } from "@/types/IMenu";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthenticatedNavMenu2() {
  const pathname = usePathname();

  const getPathHome = (): string => {
    const splitPath: string[] = pathname.split("/");
    const pathHome = splitPath[1];
    return pathHome;
  };
  getPathHome();
  return (
    <List
      sx={{
        border: "0px solid gray",
        padding: "1rem 0.5rem",
      }}>
      {authenticatedMenu?.map((item: IMenu) => {
        if (item.visibility) {
          return (
            <Link key={item.id} href={item.url}>
              <ListItem
                sx={{
                  borderRadius: "5px",
                  ":hover": {
                    backgroundColor: "#F0F1F3",
                  },
                }}>
                <ListItemIcon
                  sx={{
                    color:
                      getPathHome().toLowerCase() === item.name.toLowerCase()
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
                        fontSize:"0.9em",
                        fontWeight:
                          getPathHome().toLowerCase() ===
                          item.name.toLowerCase()
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
      })}
    </List>
  );
}
