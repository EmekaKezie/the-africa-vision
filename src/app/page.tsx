"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AbcOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import NavHeader from "./home/NavHeader";
import Hero from "./home/Hero";
import AboutUs from "./home/AboutUs";
import Testimonials from "./home/Testimonials";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Home() {
  const classes = useStyles();

  return (
    <Box>
      <NavHeader />
      <Hero />

      <Box
        sx={{
          display: { xs: "none", md: "block" },
          padding: "2rem 10rem",
        }}>
        <AboutUs />
        <Testimonials />
      </Box>

      <Box
        sx={{
          display: { xs: "block", md: "none" },
          padding: "2rem 1rem",
        }}>
        <AboutUs />
        <Testimonials />
      </Box>
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
