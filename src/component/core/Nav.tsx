import { AppBar, Box, Toolbar } from "@mui/material";
import NavMainMenuMd from "./NavMainMenuMd";
import NavAuthMenu from "./NavAuthMenu";
import NavLogo from "./NavLogo";
import NavMainMenuSm from "./NavMainMenuSm";

export default function Nav() {
  return (
    <Box>
      <AppBar sx={{ background: "#FFFFFF" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <NavLogo />
          </Box>
          <NavMainMenuMd />
          <NavAuthMenu />
          <NavMainMenuSm/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
