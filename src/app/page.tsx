"use client";

import { Box } from "@mui/material";
import React from "react";
import HeroHome from "@/component/core/HeroHome";
import Nav from "@/component/core/Nav";
import PgAboutUs from "../component/core/PgAboutUs";
import PgCoreServices from "@/component/core/PgCoreServices";
import PgProjects from "@/component/core/PgProjects";
import PgStory from "@/component/core/PgStory";
import PgDonateAds from "@/component/core/PgDonateAds";
import PgFooter from "@/component/core/PgFooter";
import PgNewsLetter from "@/component/core/PgNewsLetter";
import StoryArticles from "@/component/core/StoryArticles";
import { storyDonationData } from "@/data/storyData";
import StoryCampaign from "@/component/core/StoryCampaign";

export default function Home() {
  return (
    <Box>
      <Nav />
      <HeroHome />

      <Box sx={{ padding: { xs: "0 1rem", md: "0 8rem" } }}>
        <PgAboutUs />
      </Box>

      <Box sx={{ padding: { xs: "0 1rem", md: "0 8rem" } }}>
        <PgCoreServices />
      </Box>

      <Box
        sx={{
          padding: { xs: "0 1rem", md: "0 8rem" },
          background: "#F5F7FA",
        }}>
        <PgProjects />
      </Box>

      <PgStory />

      <Box sx={{ padding: { xs: "0 1rem", md: "0 8rem" } }}>
        <StoryCampaign data={storyDonationData} swipeable />
      </Box>

      <br />
      <br />
      <br />

      <PgDonateAds />

      <br />
      <br />
      <br />

      <Box sx={{ padding: { xs: "0 1rem", md: "0 8rem" } }}>
        <StoryArticles data={storyDonationData} swipeable />
      </Box>

      <br />
      <br />
      <br />

      <Box sx={{ display: { xs: "none", md: "block" }, padding: "0 8rem" }}>
        <PgNewsLetter />
      </Box>

      <br />
      <br />
      <br />

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
    </Box>
  );
}
