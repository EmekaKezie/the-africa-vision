"use client";

import { ApiGetBlogsForAll } from "@/component/api/blogApi";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import BlogList from "@/component/core/BlogList";
import BreadCrumb from "@/component/core/BreadCrumb";
import PageEmpty from "@/component/core/PageEmpty";
import PgSectionDescription from "@/component/core/PgSectionDescription";
import SkeletonList from "@/component/core/SkeletonList";
import { IBlogData } from "@/types/IBlog";
import { Box, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

function CreatorBlogsPage() {
  const [data, setData] = useState<IBlogData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, []);

  const fetch = () => {
    setLoading(true);
    ApiGetBlogsForAll()
      .then((response) => {
        const blogData = response.data.posts;
        setData(blogData);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        enqueueSnackbar("Error fetching blogs", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ marginTop: "10vh" }}>
          <SkeletonList itemcount={6} cardType="type1" />
        </Box>
      );
    }

    if (!loading && data.length > 0) {
      return (
        <BlogList
          data={data}
          variation="grid"
          cardType="type1"
          redirectUrl={`../story`}
        />
      );
    }

    if (!loading && data.length < 1) {
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
    <AuthenticatedLayout>
      <Box>
        <br />
        <Box
          sx={{
            display: { md: "flex", xs: "flex" },
          }}>
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#0F172A",
                fontSize: "1.5em",
              }}>
              All Stories
            </Typography>

            <Box>
              <BreadCrumb
                data={[
                  {
                    displayName: "Dashboard",
                    url: "/creator/dashboard",
                    isActive: false,
                    divider: "/",
                  },
                  {
                    displayName: "Story",
                    url: "/creator/story",
                    isActive: false,
                    divider: "/",
                  },
                  {
                    displayName: "All Stories",
                    isActive: true,
                  },
                ]}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <br/>
      <br/>
      <Box>{renderContent()}</Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(CreatorBlogsPage);
