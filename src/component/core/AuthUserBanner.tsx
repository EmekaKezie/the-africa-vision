import { Box } from "@mui/material";
import CoverImage from "@/assets/projects-thumbnail-1.png";

export default function AuthUserBanner() {
  return (
    <Box
      sx={{
        display: { md: "block", xs: "none" },
        height: "100vh",
        backgroundImage: `url(${CoverImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}></Box>
  );
}
