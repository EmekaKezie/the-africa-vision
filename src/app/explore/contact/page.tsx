"use client";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import TextInput from "@/component/common/TextInput";
import UnauthenticatedLayout from "@/component/common/UnauthenticatedLayout";
import Hero from "@/component/core/Hero";
import PgFooter from "@/component/core/PgFooter";
import config from "@/config";
import {
  Email,
  Facebook,
  Grid3x3,
  Instagram,
  LinkedIn,
  Phone,
  Twitter,
} from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";

function ExploreContactPage() {
  return (
    <UnauthenticatedLayout>
      <br />
      <br />
      <br />
      <br />

      <Hero pageName="Contact Us" />
      <br />
      <br />
      <Box
        sx={{
          padding: { md: "0 3rem", sx: "0 1rem" },
        }}>
        <Grid
          container
          sx={{
            border: "0px solid gray",
          }}>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Box
              sx={{
                background: "#EAD0E2",
                padding: "1.5rem",
                height: "600px",
              }}>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextInput label="First Name" fullWidth />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextInput label="Last Name" fullWidth />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextInput label="Phone" fullWidth />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextInput label="Email" fullWidth />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextInput label="Message" rows={5} fullWidth />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <br />
                  <PurpleButton text="Submit" style={{ width: "150px" }} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid lg={6} md={6} sm={6} xs={6}>
            <Box sx={{ height: "600px" }}>
              <iframe
                style={{ width: "100%", height: "100%", border: "0" }}
                src="https://www.google.com/maps?q=6.5276507,3.2913568"></iframe>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br />
      <br />
      <br />

      <Box
        sx={{
          padding: { md: "0 3rem", sx: "0 1rem" },
        }}>
        <Grid container>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <IconButton sx={{ background: "#A9518B", color: "#FFFFFF" }}>
                <Email />
              </IconButton>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: "1.1em",
                }}>
                Email
              </Typography>
              <Typography  sx={{ fontSize: "1.1em" }}>{config.baseContact.email}</Typography>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <IconButton
                sx={{
                  background: "#A9518B",
                  color: "#FFFFFF",
                  fontSize: "1.1em",
                }}>
                <Phone />
              </IconButton>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: "1.1em",
                }}>
                Phone
              </Typography>
              <Typography  sx={{ fontSize: "1.1em" }}>{config.baseContact.phone}</Typography>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <IconButton sx={{ background: "#A9518B", color: "#FFFFFF" }}>
                <Grid3x3 />
              </IconButton>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#000000",
                  fontSize: "1.1em",
                }}>
                Socials
              </Typography>
              <Typography sx={{ fontSize: "1.1em" }}>
                <Link href={`${config.social.facebook}`}>
                  <Facebook />
                </Link>
                <Link href={`${config.social.twitter}`}>
                  <Twitter />
                </Link>
                <Link href={`${config.social.instagram}`}>
                  <Instagram />
                </Link>
                <Link href={`${config.social.likedIn}`}>
                  <LinkedIn />
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br />
      <br />
      <br />
      <Box
        sx={{
          padding: { md: "0 8rem", sx: "0 1rem" },
          backgroundColor: "#FFF9FD",
        }}>
        <PgFooter />
      </Box>
    </UnauthenticatedLayout>
  );
}

export default ReduxProvider(ExploreContactPage);
