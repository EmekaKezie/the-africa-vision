import { Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

type menuProps = {
  id: string;
  url: string;
  name: string;
  visibility: boolean;
};

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
        {menu?.map((item: menuProps) => {
          if (item.visibility) {
            return (
              <MenuItem key={item.id} onClick={handleCloseMenu}>
                <Link href={item.url}>{item.name}</Link>
              </MenuItem>
            );
          }
        })}
        <Divider />
        {authMenu?.map((item: menuProps) => {
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

const menu: menuProps[] = [
  {
    id: "1",
    url: "/",
    name: "Home",
    visibility: true,
  },
  {
    id: "1",
    url: "/project",
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

const authMenu: menuProps[] = [
  {
    id: "1",
    url: "/login",
    name: "Login",
    visibility: true,
  },
  {
    id: "1",
    url: "/singup",
    name: "Sign up",
    visibility: true,
  },
];
