"use client";

import {
  ApiGetBlogByIdForAll,
  ApiGetBlogsForAll,
} from "@/component/api/blogApi";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import { getDateDifference } from "@/component/common/helpers";
import BlogCommentList from "@/component/core/BlogCommentList";
import BlogList from "@/component/core/BlogList";
import BlogReactions from "@/component/core/BlogReactions";
import LoadingPage from "@/component/core/LoadingPage";
import PageEmpty from "@/component/core/PageEmpty";
import SkeletonList from "@/component/core/SkeletonList";
import { IBlogData } from "@/types/IBlog";
import { KeyboardArrowLeft } from "@mui/icons-material";
import {
  Box,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import MUIRichTextEditor from "mui-rte";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CreatorBlogPage() {
  const router = useRouter();
  //const authStore = useAppSelector((state) => state.authReducer);
  const pathname = usePathname();
  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[4];

  const [blog, setBlog] = useState<IBlogData | undefined>();
  const [loadingBlog, setLoadingBlog] = useState<boolean>(false);
  const [allBlogs, setAllBlogs] = useState<IBlogData[]>([]);
  const [loadingAllBlogs, setLoadingAllBlogs] = useState<boolean>(false);

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchAllBlogs();
    // eslint-disable-next-line
  }, [blog]);

  const fetchBlog = () => {
    setLoadingBlog(true);
    ApiGetBlogByIdForAll(pageId)
      .then((response) => {
        const blogData = response?.data;
        setBlog(blogData);
        setLoadingBlog(false);
      })
      .catch((error: any) => {
        setLoadingBlog(false);
      });
  };

  const fetchAllBlogs = () => {
    setLoadingAllBlogs(true);
    ApiGetBlogsForAll()
      .then((response) => {
        const blogData = response.data.posts;

        const filtered = blogData.filter(
          (x: IBlogData) =>
            x.category.id === blog?.category.id /*&& x.id !== blog.id*/
        );
        setAllBlogs(filtered);
        setLoadingAllBlogs(false);
      })
      .catch((error: any) => {
        setLoadingAllBlogs(false);
      });
  };

  const renderContent = () => {
    if (loadingBlog) {
      return <LoadingPage />;
    }

    if (!loadingBlog && blog) {
      return content();
    }

    if (!loadingBlog && !blog) {
      return (
        <PageEmpty
          title="Page not found"
          subtitle={<Box>{`We can't find what you are looking for`}</Box>}
        />
      );
    }
  };

  const content = () => {
    return (
      <Box sx={{ padding: "1rem", background: "#FFFFFF" }}>
        <Stack direction="row" alignItems="center">
          <IconButton
            onClick={() => {
              router.push("/creator/story/all");
            }}>
            <KeyboardArrowLeft />
          </IconButton>
          <Typography>Back</Typography>
        </Stack>

        <br />

        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { md: "2em", xs: "1.5em" },
          }}>
          {blog?.title}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.7em",
            color: "#94A3B8",
          }}>
          {blog?.user?.fullname} •{" "}
          {getDateDifference(
            blog?.created_at!,
            new Date().toDateString()
          ).diffInDays.toFixed(0)}{" "}
          days ago
        </Typography>

        <br />

        <Box
          sx={{
            height: { md: "400px", xs: "200px" },
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: "rgba(0, 0, 0, 0.3)",
            },
          }}>
          <CardMedia component="img" image={blog?.image} />
        </Box>

        <br />

        <Box>
          <BlogReactions
            blogId={blog?.id!}
            likes={blog?.likes}
            shares={blog?.shares}
            dislikes={blog?.dislikes}
            comments={blog?.comments}
          />
        </Box>

        <br />
        <br />
        <br />

        <Grid container spacing={4}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box
              sx={{
                color: "#667085",
                fontSize: "0.9em",
                lineHeight: "30.45px",
              }}>
              <ThemeProvider theme={myTheme}>
                <MUIRichTextEditor
                  defaultValue={!blog ? "" : blog?.content}
                  readOnly
                  controls={[]}
                />
              </ThemeProvider>
            </Box>

            <br />

            <BlogCommentList blogId={pageId} comments={blog?.user_comments} />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Box>
              {loadingAllBlogs ? (
                <SkeletonList itemcount={3} cardType="type2" />
              ) : (
                <Box>
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1.2em",
                    }}>
                    Related Blogs
                  </Typography>
                  <BlogList
                    data={allBlogs}
                    variation="pinned"
                    startAt={0}
                    stopAt={6}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return <AuthenticatedLayout>{renderContent()}</AuthenticatedLayout>;
}

const myTheme = createTheme({
  // Set up your custom MUI theme here
});

export default ReduxProvider(CreatorBlogPage);
