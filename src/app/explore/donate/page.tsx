"use client";
import { ApiGetCampaignsForAll } from "@/component/api/campaignApi";
import ReduxProvider from "@/component/common/ReduxProvider";
import UnauthenticatedLayout from "@/component/common/UnauthenticatedLayout";
import CampaignList from "@/component/core/CampaignList";
import Hero from "@/component/core/Hero";
import HeroHome from "@/component/core/HeroHome";
import PageEmpty from "@/component/core/PageEmpty";
import PgFooter from "@/component/core/PgFooter";
import PgSectionDescription from "@/component/core/PgSectionDescription";
import SkeletonList from "@/component/core/SkeletonList";
import StoryCategories from "@/component/core/StoryCategories";
import { categoryData } from "@/data/categoryData";
import { ICampaignData } from "@/types/ICampaign";
import { ICategory } from "@/types/ICategory";
import { Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

function ExploreDonatePage() {
  const [filteredDonations, setFilteredDonations] = useState<ICampaignData[]>(
    []
  );
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState<ICampaignData[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(false);

  useEffect(() => {
    setCategories(categoryData);
  }, []);

  useEffect(() => {
    const filtered = campaigns?.filter((x: ICampaignData) =>
      selectedCategoryIds.includes(x.category.id)
    );
    setFilteredDonations(filtered);
  }, [selectedCategoryIds, campaigns]);

  useEffect(() => {
    fetchCampaigns();
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
        enqueueSnackbar("Error fetching donations", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const renderCampaigns = () => {
    if (loadingCampaigns) {
      return (
        <Box sx={{ paddingTop: "1rem" }}>
          <SkeletonList itemcount={3} cardType="type1" />
        </Box>
      );
    }
    if (!loadingCampaigns && campaigns.length > 0) {
      return (
        <CampaignList
          variation="grid"
          data={campaigns}
          cardType="type4"
          buttonText="Donate"
          redirectUrl="donate"
          onActionClick={(item: ICampaignData, url: string) => {}}
        />
      );
    }
    if (!loadingCampaigns && campaigns.length < 1) {
      return <PageEmpty title="There are no campaings yet" />;
    }
  };

  return (
    <UnauthenticatedLayout>
      <br />
      <br />
      <br />
      <br />

      <Hero pageName="Donate" />
      <br />
      <br />
      <Box
        sx={{
          padding: { xs: "0 1rem", md: "0 8rem" },
        }}>
        {/* <Box>
          <StoryCategories
            data={categories}
            onSelected={(categoryIds) => {
              setSelectedCategoryIds(categoryIds);
            }}
          />
        </Box> */}
        <br />
        <br />
        <Box>
          <PgSectionDescription
            title="Latest Campaigns ____"
            subtitle="Find Your Prefered Campaigns And Donate To Them"
          />
        </Box>
        <br />
        <br />
        <Box>{renderCampaigns()}</Box>
      </Box>
      <br />
      <br />
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

export default ReduxProvider(ExploreDonatePage);
