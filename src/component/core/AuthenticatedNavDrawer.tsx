import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  Toolbar,
} from "@mui/material";
import ReduxProvider from "../common/ReduxProvider";
import { Menu, Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import Logo from "@/assets/tavlogo.png";
import Image from "next/image";
import AuthenticatedNavMenu1 from "./AuthenticatedNavMenu1";
import AuthenticatedNavMenu2 from "./AuthenticatedNavMenu2";

type props = {
  drawerWidthMd: number;
  drawerWidthSm: number;
  openDrawer: boolean;
  onToggleDrawer: (
    newDrawerValue: boolean,
    newDrawerWidthMd: number,
    newDrawerWidthSm: number
  ) => void;
};

function AuthenticatedNavDrawer(props: props) {
  const handleCloseDrawer = () => {
    if (props.onToggleDrawer) props.onToggleDrawer(false, 0, 0);
  };

  const handleOpenDrawer = () => {
    if (props.onToggleDrawer) props.onToggleDrawer(true, 250, 250);
  };

  return (
    <Box>
      <Drawer
        open={props.openDrawer}
        variant="persistent"
        anchor="left"
        PaperProps={{
          sx: {
            width: {
              md: `${props.drawerWidthMd}px`,
              xs: `${props.drawerWidthSm}px`,
            },
          },
        }}>
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
          }}>
          <Box marginRight="10px">
            <IconButton onClick={handleCloseDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "150px",
              height: "40px",
            }}>
            <Image
              src={Logo}
              alt="Logo"
              style={{
                objectFit: "fill",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Box>

        <Box sx={{ height: "100%" }}>
          <Box sx={{ height: "80%" }}>
            <AuthenticatedNavMenu1 />
          </Box>
          <Box>
          <AuthenticatedNavMenu2 />
          </Box>
        </Box>
      </Drawer>

      <AppBar sx={{ background: "#FFFFFF" }}>
        <Toolbar>
          <Box
            sx={{
              padding: "1rem",
              display: "flex",
            }}>
            <Box marginRight="10px">
              <IconButton onClick={handleOpenDrawer}>
                <Menu />
              </IconButton>
            </Box>
            <Box
              sx={{
                width: "150px",
                height: "40px",
              }}>
              <Image
                src={Logo}
                alt="Logo"
                style={{
                  objectFit: "fill",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Box>
          <Box color="red" border="0px solid gray" flexGrow={1}>
            search
          </Box>
        </Toolbar>
      </AppBar>

      {/* <SwipeableDrawer open={open} onClose={() => {}} onOpen={() => {}}>
        <Box>
          <IconButton onClick={() => setOpen(false)}>
            <MenuIcon />
          </IconButton>
          <List>
            <ListItem>Item one</ListItem>
          </List>
        </Box>
      </SwipeableDrawer> */}
    </Box>
  );
}

export default ReduxProvider(AuthenticatedNavDrawer);
