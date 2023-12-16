import { Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { authMenuData, mainMenuData } from "@/data/menuData";
import { IMenu } from "@/types/IMenu";

export default function NavMainMenuSm() {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "flex", md: "none" },
        justifyContent: "end",
      }}>
      <IconButton onClick={handleOpenMenu}>
        <MenuIcon style={{ color: "#A8518A", fontSize:"40px" }}  />
      </IconButton>
      <Menu
        id="menu-appbar"
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ marginTop: "40px" }}
        onClose={handleCloseMenu}>
        {mainMenuData?.map((item: IMenu) => {
          if (item.visibility) {
            return (
              <MenuItem key={item.id} onClick={handleCloseMenu}>
                <Link href={item.url}>{item.name}</Link>
              </MenuItem>
            );
          }
        })}
        <Divider />
        {authMenuData?.map((item: IMenu) => {
          if (item.visibility) {
            return (
              <MenuItem key={item.id} onClick={handleCloseMenu}>
                <Link href={item.url}>{item.name}</Link>
              </MenuItem>
            );
          }
        })}
      </Menu>
    </Box>
  );
}

