import { AppBar, Box, Toolbar } from "@mui/material";
import NavMenuMd from "./NavMenuMd";
import NavUserMenu from "./NavUserMenu";
import NavLogo from "./NavLogo";
import NavMenuSm from "./NavMenuSm";

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
            <NavMenuMd />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}>
            <NavUserMenu />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
            }}>
            <NavMenuSm />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
