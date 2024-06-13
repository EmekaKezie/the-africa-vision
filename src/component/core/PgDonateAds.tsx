import { Box, Grid, Typography } from "@mui/material";
import PurpleButton from "../common/PurpleButton";
import Link from "next/link";
import Thumbnail from "@/assets/donate-ads-thumbnail.png";
import Image from "next/image";

export default function PgDonateAds() {
  return (
    <Box
      sx={{
        backgroundColor: "#F5F7FA",
      }}>
      <Grid container>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box
            sx={{ display: { xs: "none", md: "block" }, padding: "4rem 8rem" }}>
            <Typography
              sx={{
                fontSize: "1.8rem",
                lineHeight: "50px",
                fontWeight: "bold",
                letterSpacing: "-1px",
                color: "#120F0F",
              }}>
              {`“Together, we can nurture talents, foster innovation, and drive 
economic growth across Africa. Join the exclusive lists of backers 
today!” `}
            </Typography>
            <br />
            <br />
            {/* <Link href="/donate"> */}
              <PurpleButton text="LEARN MORE" style={{ width: "150px" }} />
            {/* </Link> */}
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" }, padding: "1rem" }}>
            <Typography
              sx={{
                fontSize: "1.8rem",
                lineHeight: "50px",
                fontWeight: "bold",
                letterSpacing: "-2px",
              }}>
              {`“Together, we can nurture talents, foster innovation, and drive 
economic growth across Africa. Join the exclusive lists of backers 
today!” `}
            </Typography>
            <br />
            <br />
            {/* <Link href="/donate"> */}
              <PurpleButton text="LEARN MORE" style={{ width: "150px" }} />
            {/* </Link> */}
          </Box>
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              height: "350px",
              overflow: "hidden",
            }}>
            <Image
              src={Thumbnail}
              alt="Thumbnail"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
