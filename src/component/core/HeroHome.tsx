import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Banner from "@/assets/banner1.jpg";

export default function HeroHome() {
  return (
    <Box
      sx={{
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}>
      <Image
        src={Banner}
        alt="Banner"
        style={{
          width: "100%",
          objectFit: "cover",
          marginTop: "-100px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
        }}>
        <Box>
          <Box
            sx={{
              textAlign: "center",
              justifyContent: "center",
              "& span": {
                fontSize: { md: "5em", xs: "2.8em" },
                lineHeight: { md: "70px", xs: "50px" },
                fontWeight: "bold",
              },
            }}>
            <Typography
              component="span"
              style={{ marginRight: "10px", color: "#A8518A" }}>
              Crowdfunding
            </Typography>
            <Typography component="span" style={{ marginRight: "10px" }}>
              the future of
            </Typography>
            <Typography component="span" style={{ color: "#A8518A" }}>
              Africa
            </Typography>
          </Box>
          <br />
          <br />
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "white", fontSize: "1.5rem" }}>
              Join Us in Empowering African Innovators
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
