import { Box } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/tavlogo.png";

export default function AuthenticatedNavLogo() {
  return (
    <Box width="150px" height="40px">
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
  );
}
