"use client";

import { Box } from "@mui/material";
import React from "react";
import HeroHome from "@/component/core/HeroHome";
import PgAboutUs from "../component/core/PgAboutUs";
import PgCoreServices from "@/component/core/PgCoreServices";
import PgProjects from "@/component/core/PgProjects";
import PgStory from "@/component/core/PgStory";
import PgDonateAds from "@/component/core/PgDonateAds";
import PgFooter from "@/component/core/PgFooter";
import PgNewsLetter from "@/component/core/PgNewsLetter";
import { storyData } from "@/data/storyData";
import CampaignList from "@/component/core/CampaignList";
import PgSectionDescription from "@/component/core/PgSectionDescription";
import UnauthenticatedLayout from "@/component/common/UnauthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import BlogList from "@/component/core/BlogList";

function HomePage() {
  return (
    <UnauthenticatedLayout>
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
        <PgSectionDescription
          title="Latest Causes ____"
          subtitle="Find The Popular Cause And Donate To Them"
        />
        <CampaignList
          data={storyData}
          variation="swipeable"
          swipeButtons
          cardType="type1"
        />
      </Box>

      <br />
      <br />
      <br />

      <PgDonateAds />

      <br />
      <br />
      <br />

      <Box sx={{ padding: { xs: "0 1rem", md: "0 8rem" } }}>
        <PgSectionDescription
          title="Latest News _____"
          subtitle="Articles You May Read"
        />
        <BlogList
          variation="swipeable"
          data={storyData}
          cardType="type3"
          swipeButtons
        />
      </Box>

      <br />

      <Box sx={{ display: { xs: "none", md: "block" }, padding: "0 8rem" }}>
        <PgNewsLetter />
      </Box>

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
    </UnauthenticatedLayout>
  );
}

export default ReduxProvider(HomePage);
