"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import NavHeader from "./home/NavHeader";
import Hero from "./home/Hero";
import AboutUs from "./home/AboutUs";
import Testimonials from "./home/Testimonials";
import Donate from "./home/Donate";

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
        <Donate />
      </Box>

      <Box
        sx={{
          display: { xs: "block", md: "none" },
          padding: "2rem 1rem",
        }}>
        <AboutUs />
        <Testimonials />
        <Donate />
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
