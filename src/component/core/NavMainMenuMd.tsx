import { mainMenuData } from "@/data/menuData";
import { IMenu } from "@/types/IMenu";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function NavMainMenuMd() {
  const pathname = usePathname();
  const classes = useStyles();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
      }}>
      {mainMenuData?.map((item: IMenu) => {
        if (item.visibility) {
          if (pathname === item.url) {
            return (
              <Link
                key={item.id}
                href={item.url}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "16px",
                  color: "#120F0F",
                  fontWeight: "bold",
                }}
                className={classes.link}>
                {item.name}
              </Link>
            );
          }
          return (
            <Link
              key={item.id}
              href={item.url}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "16px",
                color: "#120F0F",
              }}
              className={classes.link}>
              {item.name}
            </Link>
          );
        }
      })}
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  link: {
    "&:hover": {
      opacity: 0.7,
    },
  },
}));

