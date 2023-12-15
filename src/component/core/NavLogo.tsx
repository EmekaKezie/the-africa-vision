import { Box } from "@mui/material";
import Logo from "@/assets/tavlogo.png";
import Image from "next/image";

export default function NavLogo() {
  return (
    <Box>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: "150px",
          height: "50px",
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
      <Box
        sx={{
          display: { xs: "block", md: "none" },
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
  );
}
