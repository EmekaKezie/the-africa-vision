"use client";
import ReduxProvider from "@/component/common/ReduxProvider";
import UnauthenticatedLayout from "@/component/common/UnauthenticatedLayout";
import HeroHome from "@/component/core/HeroHome";
import BlogList from "@/component/core/BlogList";
import CampaignList from "@/component/core/CampaignList";
import PgAboutUs from "@/component/core/PgAboutUs";
import PgCoreServices from "@/component/core/PgCoreServices";
import PgDonateAds from "@/component/core/PgDonateAds";
import PgFooter from "@/component/core/PgFooter";
import PgNewsLetter from "@/component/core/PgNewsLetter";
import PgProjects from "@/component/core/PgProjects";
import PgSectionDescription from "@/component/core/PgSectionDescription";
import PgStory from "@/component/core/PgStory";
import { storyData } from "@/data/storyData";
import { Box } from "@mui/material";

function ExploreHomePage() {
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

      <Box
        sx={{
          padding: { xs: "0 1rem", md: "0 8rem" },
        }}>
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

export default ReduxProvider(ExploreHomePage);
