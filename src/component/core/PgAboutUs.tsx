import PurpleButton from "@/component/common/PurpleButton";
import config from "@/config";
import { East, MarkEmailUnread, PhoneInTalk } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function PgAboutUs() {
  return (
    <Box
      sx={{
        color: "#4B5563",
        padding: "4rem 0",
      }}>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box>
            <Typography
              component="h1"
              sx={{
                paddingBottom: "2rem",
                fontSize: "2em",
                fontWeight: "bold",
              }}>
              OUR MISSION
            </Typography>
            <Typography component="div" sx={{ fontSize: "1.1em" }}>
              {`To empower individuals, communities, and organizations across Africa by providing essential resources, innovative technology solutions, and comprehensive support systems`}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "3rem 0",
              }}>
              <Link href="/auth/login">
                <PurpleButton
                  text="Get Started"
                  endIcon={<East />}
                  style={{ width: "150px" }}
                />
              </Link>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex" },
                }}>
                <MarkEmailUnread
                  sx={{ color: "#A8518A", marginRight: "5px" }}
                />
                <Typography sx={{ fontSize: "1.1em" }}>
                  {config.baseContact.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box>
            <Typography
              sx={{
                paddingBottom: "2rem",
                fontSize: "1.2em",
                fontWeight: "bold",
                color: "#A8518A",
              }}>
              ABOUT
            </Typography>

            <Typography
              sx={{
                color: "#4B5563",
                fontSize: "1.1rem",
                paddingBottom: "2rem",
              }}>
              {texts[0]}
            </Typography>

            <Typography
              sx={{
                color: "#4B5563",
                fontSize: "1.1rem",
              }}>
              {texts[1]}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const texts: string[] = [
  "TheAfrica Vision Info Technology Company Limited is a private company that provide a cutting-edge, tech-driven crowdfunding platform to empower innovative businesses and projects in Africa. We pride ourselves to be a catalyst for change, innovation, and cultural preservation in Africa.",
  "Africa is a land of untapped brilliance, where countless groundbreaking ideas and ventures struggle to find the support they need. We understand the unique challenges and opportunities that Africa presents, and we're here to nurture its vibrant entrepreneurial spirit.",
];
