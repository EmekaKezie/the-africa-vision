"use client";
import ReduxProvider from "@/component/common/ReduxProvider";
import UnauthenticatedLayout from "@/component/common/UnauthenticatedLayout";
import BlogList from "@/component/core/BlogList";
import StoryImages from "@/component/core/StoryImages";
import { storyData } from "@/data/storyData";
import { Box } from "@mui/material";

function ExploreBlogPage() {
  return (
    <UnauthenticatedLayout>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Box>
        <Box
          sx={{
            padding: { md: "0 8rem", xs: "0 1rem" },
          }}>
          <BlogList data={storyData} variation="grid" cardType="type1" />
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: { xs: "none", md: "block" }, padding: "0 8rem" }}>
          <StoryImages data={storyData} />
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" }, padding: "0 1rem" }}>
          <StoryImages data={storyData} />
        </Box>
      </Box>
    </UnauthenticatedLayout>
  );
}

export default ReduxProvider(ExploreBlogPage);
