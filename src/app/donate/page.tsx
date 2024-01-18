"use client";
import DonationList from "@/component/core/DonationList";
import { categoryData } from "@/data/categoryData";
import { storyData } from "@/data/storyData";
import { Box } from "@mui/material";
import StoryCategories from "@/component/core/StoryCategories";
import { useEffect, useState } from "react";
import { IStory } from "@/types/IStory";
import Nav from "@/component/core/Nav";
import HeroHome from "@/component/core/HeroHome";
import UnauthenticatedLayout from "@/component/common/UnauthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import { ICategory } from "@/types/ICategory";

function DonatePage() {
  const [donations, setDonations] = useState<IStory[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<IStory[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    setDonations(storyData);
  }, []);

  useEffect(() => {
    setCategories(categoryData);
  }, []);

  useEffect(() => {
    const filtered = donations?.filter((x: IStory) =>
      selectedCategoryIds.includes(x.categoryId!)
    );
    setFilteredDonations(filtered);
  }, [selectedCategoryIds, donations]);

  const displayDonations = (): IStory[] => {
    if (!selectedCategoryIds?.length || selectedCategoryIds[0] === "all") {
      return donations;
    } else {
      return filteredDonations;
    }
  };

  return (
    <UnauthenticatedLayout>
      <HeroHome />

      <br />
      <br />
      <br />
      <br />
      <Box
        sx={{
          padding: { xs: "0 1rem", md: "0 8rem" },
        }}>
        <Box>
          <StoryCategories
            data={categories}
            onSelected={(categoryIds) => {
              setSelectedCategoryIds(categoryIds);
            }}
          />
        </Box>
        <Box>
          <DonationList
            variation="grid"
            data={displayDonations()}
            redirectUrl="donate"
          />
        </Box>
      </Box>
    </UnauthenticatedLayout>
  );
}

export default ReduxProvider(DonatePage);
