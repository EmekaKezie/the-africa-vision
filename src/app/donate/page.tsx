"use client";
import StoryDonations from "@/component/core/StoryDonations";
import { storyCategoryData } from "@/data/storyData";
import { storyDonationData } from "@/data/storyDonationData";
import { Box } from "@mui/material";
import StoryCategories from "@/component/core/StoryCategories";
import { useEffect, useState } from "react";
import { IStory, IStoryCategory } from "@/types/IStory";
import Nav from "@/component/core/Nav";
import HeroHome from "@/component/core/HeroHome";

export default function DonatePage() {
  const [donations, setDonations] = useState<IStory[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<IStory[]>([]);
  const [categories, setCategories] = useState<IStoryCategory[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    setDonations(storyDonationData);
  }, []);

  useEffect(() => {
    setCategories(storyCategoryData);
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
    <Box>
      <Nav />
      <HeroHome/>
      
      <br/>
      <br/>
      <br/>
      <br/>
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
          <StoryDonations data={displayDonations()} />
        </Box>
      </Box>
    </Box>
  );
}
