"use client";
import StoryBlogs from "@/component/core/StoryBlogs";
import StoryImages from "@/component/core/StoryImages";
import { storyBlogData } from "@/data/storyData";
import { Box } from "@mui/material";

export default function BlogPage() {
  return (
    <Box>
      <Box>
        <Box sx={{ display: { xs: "none", md: "block" }, padding: "0 8rem" }}>
          <StoryBlogs data={storyBlogData} />
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" }, padding: "0 1rem" }}>
          <StoryBlogs data={storyBlogData} />
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: { xs: "none", md: "block" }, padding: "0 8rem" }}>
          <StoryImages data={storyBlogData} />
        </Box>
        <Box sx={{ display: { xs: "block", md: "none" }, padding: "0 1rem" }}>
          <StoryImages data={storyBlogData} />
        </Box>
      </Box>
    </Box>
  );
}
