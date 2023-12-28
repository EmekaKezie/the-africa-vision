import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  Stack,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
} from "@mui/material";
import {
  Menu,
  Menu as MenuIcon,
  Notifications,
  Search,
} from "@mui/icons-material";
import AuthenticatedNavMenu1 from "./AuthenticatedNavMenu1";
import AuthenticatedNavMenu2 from "./AuthenticatedNavMenu2";
import AuthenticatedNavLogo from "./AuthenticatedNavLogo";
import AuthenticatedNavUserMenu from "./AuthenticatedNavUserMenu";
import TextInput from "../common/TextInput";
import AuthenticatedNavNotification from "./AuthenticatedNavNotification";

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

export default function AuthenticatedNavDrawer(props: props) {
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
        <Stack direction="row" spacing={1} padding="1rem">
          <IconButton
            onClick={handleCloseDrawer}
            sx={
              {
                //backgroundColor: "#FFE1F5",
              }
            }>
            <MenuIcon />
          </IconButton>
          <AuthenticatedNavLogo />
        </Stack>

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
          <Stack
            direction="row"
            spacing={1}
            sx={{ padding: "1rem 0", width: { md: "230px" } }}>
            <IconButton
              onClick={handleOpenDrawer}
              sx={
                {
                  //backgroundColor: "#FFE1F5"
                }
              }>
              <Menu />
            </IconButton>
            <AuthenticatedNavLogo />
          </Stack>

          <Box
            sx={{
              color: "red",
              flexGrow: 1,
              display: { md: "block", xs: "none" },
              marginLeft: "1rem",
            }}>
            <TextInput
              placeholder="Search..."
              size="small"
              inputStyle={{
                background: "#FFF9FD",
                border: "1px solid #CCCCCC",
              }}
              startIcon={
                <Search
                  sx={{
                    color: "#898989",
                  }}
                />
              }
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              gap: 2,
              flexGrow: { md: 0, xs: 1 },
              alignItems: "center",
            }}>
            <AuthenticatedNavNotification />
            <AuthenticatedNavUserMenu />
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
