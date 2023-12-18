import { AppBar, Box, Toolbar } from "@mui/material";
import NavMainMenuMd from "./NavMainMenuMd";
import NavAuthMenu from "./NavAuthMenu";
import NavLogo from "./NavLogo";
import NavMainMenuSm from "./NavMainMenuSm";

export default function Nav() {
  return (
    <Box>
      <AppBar sx={{ background: "#FFFFFF", padding: "1rem" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <NavLogo />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}>
            <NavMainMenuMd />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}>
            <NavAuthMenu />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
            }}>
            <NavMainMenuSm />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
