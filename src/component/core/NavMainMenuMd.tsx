import { mainMenuData } from "@/data/menuData";
import { IMenu } from "@/types/IMenu";
import { Box, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMainMenuMd() {
  const pathname = usePathname();
  const classes = useStyles();

  return (
    <Stack direction="row">
      {mainMenuData?.map((item: IMenu) => {
        if (item.visibility) {
          return (
            <Link
              //className={classes.link}
              href={item.url}
              key={item.id}
              style={{ display: "block" }}>
              <Typography
                sx={{
                  padding: "0.5rem 1rem",
                  fontSize: "16px",
                  color: pathname === item.url ? "#A8518A" : "#120F0F",
                  fontWeight: pathname === item.url ? "bold" : "normal",
                  "&:hover": {
                    opacity: 0.7,
                    color: "#A8518A",
                  },
                }}>
                {item.name}
              </Typography>
            </Link>
          );
        }

        // if (item.visibility) {
        //   if (pathname === item.url) {
        //     return (
        //       <Link
        //         key={item.id}
        //         href={item.url}
        //         style={{
        //           padding: "0.5rem 1rem",
        //           fontSize: "16px",
        //           color: "#120F0F",
        //           fontWeight: "bold",
        //         }}
        //         className={classes.link}>
        //         {item.name}
        //       </Link>
        //     );
        //   }
        //   return (
        //     <Link
        //       key={item.id}
        //       href={item.url}
        //       style={{
        //         padding: "0.5rem 1rem",
        //         fontSize: "16px",
        //         color: "#120F0F",
        //       }}
        //       className={classes.link}>
        //       {item.name}
        //     </Link>
        //   );
        // }
      })}
    </Stack>
  );
}

const useStyles = makeStyles(() => ({
  link: {
    "&:hover": {
      opacity: 0.7,
    },
  },
}));
