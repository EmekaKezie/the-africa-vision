import { mainMenuData } from "@/data/menuData";
import { IMenu } from "@/types/IMenu";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenuMd() {
  const pathname = usePathname();

  return (
    <Stack direction="row">
      {mainMenuData?.map((item: IMenu) => {
        if (item.visibility) {
          return (
            <Link
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
      })}
    </Stack>
  );
}
