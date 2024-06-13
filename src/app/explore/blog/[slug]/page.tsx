"use client";

import {
  ApiGetBlogByIdForAll,
  ApiGetBlogsForAll,
} from "@/component/api/blogApi";
import ReduxProvider from "@/component/common/ReduxProvider";
import {
  convertToReadableDate,
  getDateDifference,
} from "@/component/common/helpers";
import BlogCommentForm from "@/component/core/BlogCommentForm";
import BlogReactions from "@/component/core/BlogReactions";
import BlogCommentList from "@/component/core/BlogCommentList";
import LoadingPage from "@/component/core/LoadingPage";
import Nav from "@/component/core/Nav";
import PageEmpty from "@/component/core/PageEmpty";
import { IBlogComment, IBlogData } from "@/types/IBlog";
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
import SkeletonList from "@/component/core/SkeletonList";
import BlogList from "@/component/core/BlogList";
import SocialShare from "@/component/core/SocialShare";
import UnauthenticatedLayout from "@/component/common/UnauthenticatedLayout";

function ExploreBlogView() {
  const router = useRouter();
  const pathname = usePathname();
  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[3];

  const [blog, setBlog] = useState<IBlogData | undefined>();
  const [loadingBlog, setLoadingBlog] = useState<boolean>(false);
  const [allBlogs, setAllBlogs] = useState<IBlogData[]>([]);
  const [loadingAllBlogs, setLoadingAllBlogs] = useState<boolean>(false);
  const [tempComments, setTempComments] = useState<IBlogComment[]>([]);

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
      <UnauthenticatedLayout>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Box sx={{ padding: { md: "0 8rem", xs: "0 1rem" } }}>
          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={() => {
                router.push("/explore/blog");
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
            days ago{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>|</span>{" "}
            Created on {convertToReadableDate(blog?.created_at ?? "")}
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

              <br />

              <BlogCommentForm
                submitWithButtonClick={true}
                submitWithEnterKey={false}
                blogId={pageId}
                inputFieldHeight={4}
                onReturnComment={(comments: any[]) => {
                  setTempComments(comments);
                }}
              />
              <br />
              <br />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box component={"div"}>
                <SocialShare url={window.location.href} />
              </Box>
              <br />
              <br />
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
      </UnauthenticatedLayout>
    );
  };
  return renderContent();
}

const myTheme = createTheme({
  // Set up your custom MUI theme here
});

export default ReduxProvider(ExploreBlogView);
