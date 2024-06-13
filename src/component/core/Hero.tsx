import { Box, Chip, Typography } from "@mui/material";
import Image from "next/image";
import Banner from "@/assets/banner2.jpg";

type props = {
  pageName?: string;
};

export default function Hero(props: props) {
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
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
      }}>
      <Image
        src={Banner}
        alt="Banner"
        style={{
          width: "100%",
          objectFit: "cover",
          //marginTop: "0px",
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
          {/* <Box
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
          <br /> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Chip
              label={!props.pageName ? "The Africa Vision" : props.pageName}
              sx={{
                background: "white",
                fontWeight: "bold",
                fontSize: "1.5em",
                padding: "1rem",
                height: "50px",
                borderRadius: "50px",
                color:"#A8518A"
              }}
            />
          </Box>
          <br />
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "white", fontSize: "1.2rem" }}>
              Join Us in Empowering African Innovators
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
