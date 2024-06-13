"use client";
import {
  ApiGetBlogByIdForAdmin,
  ApiGetBlogsForAll,
  ApiUpdateBlogByUser,
} from "@/component/api/blogApi";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import { getDateDifference, statusHandler } from "@/component/common/helpers";
import BlogCommentForm from "@/component/core/BlogCommentForm";
import BlogCommentList from "@/component/core/BlogCommentList";
import BlogList from "@/component/core/BlogList";
import BlogReactions from "@/component/core/BlogReactions";
import PageEmpty from "@/component/core/PageEmpty";
import SkeletonList from "@/component/core/SkeletonList";
import SocialShare from "@/component/core/SocialShare";
import { useAppSelector } from "@/redux/useReduxHooks";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { IBlogComment, IBlogData, IBlogInput } from "@/types/IBlog";
import { KeyboardArrowLeft, PublishOutlined } from "@mui/icons-material";
import {
  Box,
  CardMedia,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import MUIRichTextEditor from "mui-rte";
import { usePathname, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

function UserBlogView() {
  const router = useRouter();
  const authStore = useAppSelector((state) => state.authReducer);
  const pathname = usePathname();
  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[3];

  const [blog, setBlog] = useState<IBlogData | undefined>();
  const [loadingBlog, setLoadingBlog] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false);
  const [approvalStatus, setApprovalStatus] = useState<string>("");
  const [isPublished, setIsPublished] = useState<number>(0);
  const [tempComments, setTempComments] = useState<IBlogComment[]>([]);

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
    ApiGetBlogByIdForAdmin(pageId, authStore.token)
      .then((response) => {
        const blogData = response?.data;
        setBlog(blogData);

        //to be removed
        if (blogData.is_approved === 0) {
          setApprovalStatus("pending");
        }
        if (blogData.is_approved === 1) {
          setApprovalStatus("approved");
        }

        //to be uncommented when api is updated
        //setApprovalStatus(blogData.approval_status);

        setIsPublished(blogData.is_published);
        setLoadingBlog(false);
      })
      .catch((error: any) => {
        setLoadingBlog(false);
        enqueueSnackbar("Error fetching content", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
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

  const handlePublish = () => {
    setIsPublishing(true);

    const payload: IBlogInput = {
      title: blog?.title!,
      content: blog?.content!,
      //imageBase64: imageBase64,
      //powerPointBase64: powerPointBase64 ?? " ",
      category_id: blog?.category_id!,
      video_url: blog?.video_url!,
      seo_keywords: blog?.seo_keywords!,
      referenceUrl: blog?.referenceUrl!,
      draft: false,
    };
    ApiUpdateBlogByUser(blog?.id.toString()!, payload, authStore.token)
      .then((response: IResponse<any>) => {
        if (response.status === ResponseEnum.success) {
          setIsPublished(Number(!isPublished));
          enqueueSnackbar(response.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        } else {
          enqueueSnackbar(response.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
        setIsPublishing(false);
        setOpenPublishDialog(false);
      })
      .catch((error: any) => {
        setIsPublishing(false);
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const renderContent = () => {
    if (loadingBlog) {
      return (
        <Box
          sx={{
            padding: "0.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CircularProgress />
        </Box>
      );
    }

    if (!loadingBlog && blog) {
      return content();
    }

    if (!loadingBlog && !blog) {
      return (
        <PageEmpty
          title="Page not found"
          subtitle={<Box>{"We can't find what you are looking for"}</Box>}
        />
      );
    }
  };

  const renderToolBar = (approvalStatus: string, isPublished: number) => {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        {/* {approvalStatus === "pending" && (
            <Tooltip title="Approve this campaign">
              <Chip
                label="Approve"
                clickable
                onClick={() => setopenPublishDialog(true)}
                onDelete={() => {}}
                deleteIcon={<ThumbUpAlt />}
                color="success"
              />
            </Tooltip>
          )} */}

        {isPublished === 0 && (
          <Tooltip title="Publish this blog">
            <Chip
              label="Publish"
              clickable
              onClick={() => setOpenPublishDialog(true)}
              onDelete={() => {}}
              deleteIcon={<PublishOutlined />}
              color="warning"
            />
          </Tooltip>
        )}

        <Chip
          sx={{
            backgroundColor: statusHandler(approvalStatus).backgroundColor,
            color: statusHandler(approvalStatus).color,
            padding: "0 0.5rem",
            textTransform: "capitalize",
          }}
          label={approvalStatus}
        />
      </Box>
    );
  };

  const content = () => {
    return (
      <Box
        sx={{
          padding: "1rem",
          backgroundColor: "#FFFFFF",
          height: "100%",
          //boxShadow: "1px 1px 5px lightgray",
          borderRadius: "5px",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}>
          <Stack direction="row" alignItems="center" flexGrow={1}>
            <IconButton
              onClick={() => {
                router.push("/creator/story");
              }}>
              <KeyboardArrowLeft />
            </IconButton>
            <Typography>Back</Typography>
          </Stack>
          <Box>{renderToolBar(approvalStatus, isPublished)}</Box>
        </Box>

        <br />

        <Box>
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
        </Box>

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
              background: "rgba(0, 0, 0, 0.1)",
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

        <Grid container spacing={4}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box>
              {/* <CampaignViewContributionProgress
                targetAmount={campaign?.target_amount ?? 0}
                raisedAmount={campaign?.raised_amount ?? 0}
                currency={campaign?.base_currency ?? "NGN"}
              /> */}

              <br />
              <br />

              <Box
                sx={{
                  color: "#667085",
                  fontSize: "0.9em",
                  lineHeight: "30.45px",
                }}>
                <ThemeProvider theme={myTheme}>
                  <MUIRichTextEditor
                    defaultValue={blog?.content ?? ""}
                    readOnly
                    controls={[]}
                  />
                </ThemeProvider>
              </Box>

              <br />

              <BlogCommentList
                blogId={pageId}
                comments={blog?.user_comments}
                tempComments={tempComments}
              />

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

              {/* <Box>
                <TextField
                  placeholder="Add message here"
                  multiline
                  fullWidth
                  rows={10}
                />
                <br />
                <br />
                <PurpleButton text="Send Message" style={{ width: "150px" }} />
              </Box> */}
            </Box>
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
              {/* <CampaignViewContributionAnalytics
                targetAmount={campaign?.target_amount ?? 0}
                raisedAmount={campaign?.raised_amount ?? 0}
                currency={campaign?.base_currency ?? "NGN"}
                startDate={campaign?.start_date ?? ""}
                contributors={campaign?.contributors ?? 0}
                hasActionButton={false}
                //buttonText="Donate"
                //redirectUrl={`/explore/donate/${pageId}/action`}
              /> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <AuthenticatedLayout>
      <br />
      {renderContent()}

      <Box>
        <Dialog
          open={openPublishDialog}
          onClose={() => setOpenPublishDialog(false)}>
          <DialogTitle>Publish Story</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`You are about to publish this story. If you want to proceed, please click on the publish button below`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <PurpleButton
              text="Publish"
              size="small"
              loading={isPublishing}
              disabled={isPublishing}
              onClick={handlePublish}
            />
          </DialogActions>
        </Dialog>
      </Box>
    </AuthenticatedLayout>
  );
}

const myTheme = createTheme({
  // Set up your custom MUI theme here
});
export default ReduxProvider(UserBlogView);
