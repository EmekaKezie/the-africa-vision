import {
  Box,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Banner from "@/assets/banner1.jpg";
import PurpleButton from "@/component/common/PurpleButton";

export default function Hero() {
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          padding: "1rem",
          textAlign: "center",
        }}>
        <Box>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              textAlign: "center",
              justifyContent: "center",
              "& span": {
                fontSize: "4em",
                lineHeight: "70px",
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

          <Box
            sx={{
              display: { xs: "block", md: "none" },
              marginTop: "-20px",
              textAlign: "center",
              justifyContent: "center",
              "& span": {
                fontSize: "2rem",
                fontWeight: "bold",
              },
            }}>
            <Typography
              component="span"
              style={{ marginRight: "10px", color: "#A8518A" }}>
              Crowdfunding
            </Typography>
            <Typography component="span" style={{ marginRight: "10px" }}>
              the Future
            </Typography>
            <Typography component="span" style={{ color: "#A8518A" }}>
              of Africa
            </Typography>
          </Box>
        </Box>
        <Box sx={{ padding: "1rem" }}>
          <Typography sx={{ color: "#FFFFFF", fontSize: "0.9rem" }}>
            Join Us in Empowering African Innovators
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}>
          <TextField
            placeholder="Search for Crowdfunding Project"
            sx={{
              width: "50%",
            }}
            InputProps={{
              style: {
                margin: 0,
                outline: 0,
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                color: "#FFFFFF",
              },
            }}
          />
          <PurpleButton text="Search" style={{ width: "150px" }} />
        </Box>

        <Box
          sx={{
            display: { xs: "block", md: "none" },
            justifyContent: "center",
          }}>
          <TextField
            placeholder="Search for Crowdfunding Project"
            sx={{
              width: "100%",
              marginBottom: "2px",
            }}
            InputProps={{
              style: {
                margin: 0,
                outline: 0,
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                color: "#FFFFFF",
              },
            }}
          />
          <br />
          <PurpleButton text="Search" style={{ width: "100%" }} />
        </Box>
      </Box>
    </Box>
  );
}
