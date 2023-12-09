import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Logo from "../../assets/tavlogo.png";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

type menuProps = {
  key: number;
  href: string;
  desc: string;
};

export default function NavHeader() {
  const classes = useStyles();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <AppBar className={classes.appbar} style={{ background: "#ffffff" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Image
                src={Logo}
                alt="Logo"
                style={{ width: "150px", height: "40px" }}
              />
            </Box>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Image
                src={Logo}
                alt="Logo"
                style={{ width: "100px", height: "30px" }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}>
            {menuitems?.map((item: menuProps) => (
              <Link
                key={item.key}
                href={item.href}
                className={classes.mainLink}>
                {item.desc}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "end",
              }}>
              <Link href="#" className={classes.loginlink}>
                Login
              </Link>
              <Link href="#" className={classes.signuplink}>
                Sign up
              </Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "end",
              }}>
              <IconButton onClick={handleOpenMenu}>
                <MenuIcon style={{ color: "#A8518A" }} />
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
                {menuitems2?.map((item: menuProps) => (
                  <MenuItem key={item.key} onClick={handleCloseMenu}>
                    <Link
                      key={item.key}
                      href={item.href}
                      className={classes.mainLink}>
                      {item.desc}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const useStyles = makeStyles(() => ({
  appbar: {
    // background: "#ffffff",
  },

  mainLink: {
    padding: "0.5rem 1rem",
    fontSize: "0.85em",
    color: "#000",
    "&:hover": {
      fontWeight: "bolder",
      color: "#A8518A",
    },
  },

  loginlink: {
    border: "2px solid #2F840B",
    background: "#FFFFFF",
    color: "#A8518A",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    fontSize: "0.85em",
    width: "100px",
    textAlign: "center",
    margin: "0 0.5rem",
    fontWeight: "bolder",
    "&:hover": {
      opacity: 0.75,
    },
  },

  signuplink: {
    background: "#A8518A",
    color: "#FFFFFF",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    fontSize: "0.85em",
    width: "100px",
    textAlign: "center",
    margin: "0 0.5rem",
    fontWeight: "bolder",
    "&:hover": {
      opacity: 0.8,
    },
  },
}));

const menuitems: menuProps[] = [
  {
    key: 1,
    href: "/",
    desc: "Home",
  },
  {
    key: 1,
    href: "/campaigns",
    desc: "Campaigns",
  },
  {
    key: 1,
    href: "/donate",
    desc: "Donate",
  },
  {
    key: 1,
    href: "/contactu-us",
    desc: "Contact Us",
  },
];

const menuitems2: menuProps[] = [
  {
    key: 1,
    href: "/",
    desc: "Home",
  },
  {
    key: 1,
    href: "/campaigns",
    desc: "Campaigns",
  },
  {
    key: 1,
    href: "/donate",
    desc: "Donate",
  },
  {
    key: 1,
    href: "/contactu-us",
    desc: "Contact Us",
  },
  {
    key: 1,
    href: "/#",
    desc: "Login",
  },
  {
    key: 1,
    href: "/#",
    desc: "Sign up",
  },
];
