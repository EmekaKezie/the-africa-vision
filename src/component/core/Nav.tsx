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
          <Box
            sx={{
              flexGrow: 1,
            }}>
            <NavLogo />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "block" },
            }}>
            <NavMainMenuMd />
          </Box>

          {/* <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "end",
            }}>
            <Box
              sx={{
                display: { xs: "none", md: "block" },
              }}>
              <NavAuthMenu />
            </Box>

            <Box
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              <NavMainMenuSm/>
            </Box>
          </Box> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
