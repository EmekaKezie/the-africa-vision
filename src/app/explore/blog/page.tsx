"use client";
import { ApiGetBlogsForAll } from "@/component/api/blogApi";
import ReduxProvider from "@/component/common/ReduxProvider";
import UnauthenticatedLayout from "@/component/common/UnauthenticatedLayout";
import BlogList from "@/component/core/BlogList";
import Hero from "@/component/core/Hero";
import PageEmpty from "@/component/core/PageEmpty";
import PgFooter from "@/component/core/PgFooter";
import PgSectionDescription from "@/component/core/PgSectionDescription";
import SkeletonList from "@/component/core/SkeletonList";
import { IBlogData } from "@/types/IBlog";
import { Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

function ExploreBlog() {
  const [blogs, setBlogs] = useState<IBlogData[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

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

  const renderBlogs = () => {
    if (loadingBlogs) {
      return (
        <Box sx={{ marginTop: "10vh" }}>
          <SkeletonList itemcount={6} cardType="type1" />
        </Box>
      );
    }

    if (!loadingBlogs && blogs.length > 0) {
      return (
        <BlogList
          data={blogs}
          variation="grid"
          cardType="type1"
          redirectUrl="blog"
        />
      );
    }

    if (!loadingBlogs && blogs.length < 1) {
      return (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <PageEmpty title="There are no blogs yet" />
        </Box>
      );
    }
  };

  return (
    <UnauthenticatedLayout>
      <br />
      <br />
      <br />
      <br />

      <Hero pageName="Blogs" />
      <br />
      <br />

      <Box
        sx={{
          padding: { xs: "0 1rem", md: "0 8rem" },
        }}>
        <Box>
          <PgSectionDescription
            title="Blog Posts ____"
            subtitle="Articles you will like to read"
          />
        </Box>
      </Box>
      <br />
      <br />
      <Box>
        <Box
          sx={{
            padding: { md: "0 8rem", xs: "0 1rem" },
          }}>
          {renderBlogs()}
        </Box>
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

export default ReduxProvider(ExploreBlog);
