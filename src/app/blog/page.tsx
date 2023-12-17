"use client";
import StoryBlogs from "@/component/core/StoryBlogs";
import { storyBlogData } from "@/data/storyData";
import { Box } from "@mui/material";

export default function BlogPage() {
  return (
    <Box>
      <StoryBlogs data={storyBlogData} swipeable />
    </Box>
  );
}
