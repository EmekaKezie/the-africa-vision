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
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ICampaignData } from "@/types/ICampaign";
import { IBlogData } from "@/types/IBlog";
import { ApiGetCampaignsForAll } from "@/component/api/campaignApi";
import { enqueueSnackbar } from "notistack";
import { ApiGetBlogsForAll } from "@/component/api/blogApi";

function ExploreHomePage() {
  const [campaigns, setCampaigns] = useState<ICampaignData[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<IBlogData[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

  const fetchCampaigns = () => {
    setLoadingCampaigns(true);
    ApiGetCampaignsForAll()
      .then((response) => {
        const campaignData = response?.data?.campaigns;
        setCampaigns(campaignData);
        setLoadingCampaigns(false);
      })
      .catch((error: any) => {
        setLoadingCampaigns(false);
        enqueueSnackbar("Error fetching some content", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const fetchBlogs = () => {
    setLoadingBlogs(true);
    ApiGetBlogsForAll()
      .then((response) => {
        const blogData = response.data.posts;
        setBlogs(blogData);
        setLoadingBlogs(false);
      })
      .catch((error: any) => {
        setLoadingBlogs(false);
        enqueueSnackbar("Error fetching blogs", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

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
          data={campaigns}
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
          data={blogs}
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
          padding: { md: "0 8rem", xs: "0 1rem" },
          backgroundColor: "#FFF9FD",
        }}>
        <PgFooter />
      </Box>
    </UnauthenticatedLayout>
  );
}

export default ReduxProvider(ExploreHomePage);
