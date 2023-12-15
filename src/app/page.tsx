"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Hero from "./home/Hero";
import Testimonials from "./home/Testimonials";
import Donate from "./home/Donate";
import Nav from "@/component/core/Nav";
import PgAboutUs from "../component/core/PgAboutUs";
import PgCoreServices from "@/component/core/PgCoreServices";
import PgProjects from "@/component/core/PgProjects";
import PgStory from "@/component/core/PgStory";
import PgLatestCauses from "@/component/core/PgLatestCauses";
import PgDonateAds from "@/component/core/PgDonateAds";
import PgBlog from "@/component/core/PgBlog";
import PgFooter from "@/component/core/PgFooter";
import PgNewsLetter from "@/component/core/PgNewsLetter";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Home() {
  const classes = useStyles();

  return (
    <Box>
      <Nav />
      <Hero />

      <Box sx={{ display: { xs: "none", md: "block" }, padding: "0 8rem" }}>
        <PgAboutUs />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" }, padding: "0 1rem" }}>
        <PgAboutUs />
      </Box>

      <Box sx={{ display: { xs: "none", md: "block" }, padding: "0 8rem" }}>
        <PgCoreServices />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" }, padding: "0 1rem" }}>
        <PgCoreServices />
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
          padding: "0 8rem",
          background: "#F5F7FA",
        }}>
        <PgProjects />
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          padding: "0 1rem",
          background: "#F5F7FA",
        }}>
        <PgProjects />
      </Box>

      <PgStory />

      <Box sx={{ display: { xs: "none", md: "block" }, padding: "0 8rem" }}>
        <PgLatestCauses />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" }, padding: "0 1rem" }}>
        <PgLatestCauses />
      </Box>

      <PgDonateAds />

      <Box sx={{ display: { xs: "none", md: "block" }, padding: "0 8rem" }}>
        <PgBlog />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" }, padding: "0 1rem" }}>
        <PgBlog />
      </Box>

      <Box sx={{ display: { xs: "none", md: "block" }, padding: "0 8rem" }}>
        <PgNewsLetter />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" }, padding: "0 1rem" }}>
        <PgNewsLetter />
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
          padding: "0 8rem",
          backgroundColor: "#FFF9FD",
        }}>
        <PgFooter />
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          padding: "0 1rem",
          backgroundColor: "#FFF9FD",
        }}>
        <PgFooter />
      </Box>

      {/* <Box
        sx={{
          display: { xs: "none", md: "block" },
          padding: "0 8rem",
        }}>
        <PgAboutUs />
        <PgCoreServices />
        <PgProjects />
        <Testimonials />
        <Donate />
      </Box>

      <Box
        sx={{
          display: { xs: "block", md: "none" },
          padding: "2rem 1rem",
        }}>
        <PgAboutUs />
        <PgCoreServices />
        <PgProjects />
        <Testimonials />
        <Donate />
      </Box> */}
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  subContainerMax: {
    border: "1px solid gray",
    padding: "3rem 10rem",
  },

  subContainerMin: {
    border: "1px solid red",
    padding: "3rem 2rem",
  },
}));
