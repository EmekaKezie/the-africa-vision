"use client";
import {
  ApiApproveBlog,
  ApiDeclineBlog,
  ApiGetBlogByIdForAdmin,
} from "@/component/api/blogApi";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import { getDateDifference, statusHandler } from "@/component/common/helpers";
import BlogCommentForm from "@/component/core/BlogCommentForm";
import BlogCommentList from "@/component/core/BlogCommentList";
import BlogReactions from "@/component/core/BlogReactions";
import BreadCrumb from "@/component/core/BreadCrumb";
import LoadingPage from "@/component/core/LoadingPage";
import PageEmpty from "@/component/core/PageEmpty";
import { useAppSelector } from "@/redux/useReduxHooks";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { IBlogComment, IBlogData } from "@/types/IBlog";
import {
  KeyboardArrowLeft,
  ThumbDownAlt,
  ThumbUpAlt,
} from "@mui/icons-material";
import {
  Box,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import MUIRichTextEditor from "mui-rte";
import { usePathname, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

function AdminApproveStoryView() {
  const router = useRouter();
  const authStore = useAppSelector((state) => state.authReducer);
  const pathname = usePathname();
  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[4];

  const [blog, setBlog] = useState<IBlogData | undefined>();
  const [loadingBlog, setLoadingBlog] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isDeclining, setIsDeclining] = useState<boolean>(false);
  const [openApproveDialog, setOpenApproveDialog] = useState<boolean>(false);
  const [openDeclineDialog, setOpenDeclineDialog] = useState<boolean>(false);
  const [approvalStatus, setApprovalStatus] = useState<string>("");
  const [tempComments, setTempComments] = useState<IBlogComment[]>([]);

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, []);

  const fetchBlog = () => {
    setLoadingBlog(true);
    ApiGetBlogByIdForAdmin(pageId, authStore.token)
      .then((response) => {
        const blogData = response?.data;
        setBlog(blogData);
        setApprovalStatus(blogData.approval_status);
        setLoadingBlog(false);
      })
      .catch((error: any) => {
        setLoadingBlog(false);
      });
  };

  const handleApprove = () => {
    setIsApproving(true);
    ApiApproveBlog(pageId, authStore.token)
      .then((response: IResponse<any>) => {
        setIsApproving(false);
        setOpenApproveDialog(false);
        if (response.status === ResponseEnum.success) {
          setApprovalStatus("approved");
          enqueueSnackbar(response.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        } else {
          setIsApproving(false);
          setOpenApproveDialog(false);
          enqueueSnackbar(response.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      })
      .catch((error: any) => {
        enqueueSnackbar("Error! Something went wrong", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const handleDecline = () => {
    setIsDeclining(true);
    ApiDeclineBlog(pageId, authStore.token)
      .then((response: IResponse<any>) => {
        setIsDeclining(false);
        setOpenDeclineDialog(false);
        if (response.status === ResponseEnum.success) {
          setApprovalStatus("declined");
          enqueueSnackbar(response.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        } else {
          setIsDeclining(false);
          setOpenDeclineDialog(false);
          enqueueSnackbar(response.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      })
      .catch((error: any) => {
        enqueueSnackbar("Error! Something went wrong", {
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

  const renderToolBar = (approvalStatus: string) => {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        {approvalStatus === "pending" && (
          <Tooltip title="Approve this blog">
            <Chip
              label="Approve"
              clickable
              onClick={() => setOpenApproveDialog(true)}
              onDelete={() => {}}
              deleteIcon={<ThumbUpAlt />}
              color="success"
            />
          </Tooltip>
        )}

        {approvalStatus === "pending" && (
          <Tooltip title="Decline  this blog">
            <Chip
              label="Decline"
              clickable
              onClick={() => setOpenDeclineDialog(true)}
              onDelete={() => {}}
              deleteIcon={<ThumbDownAlt />}
              color="error"
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
          boxShadow: "1px 1px 5px lightgray",
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
                router.push("/admin/approvals");
              }}>
              <KeyboardArrowLeft />
            </IconButton>
            <Typography>Back</Typography>
          </Stack>
          {/* <Box flexGrow={1}>
          <BreadCrumb
            data={[
              {
                displayName: "Dashboard",
                url: "/admin/dashboard",
                isActive: false,
                divider: "/",
              },
              {
                displayName: "Approvals",
                url: "/admin/approvals",
                isActive: false,
                divider: "/",
              },
              {
                displayName: !campaign ? "" : campaign.title,
                isActive: true,
              },
            ]}
          />
        </Box> */}
          <Box>{renderToolBar(approvalStatus)}</Box>
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
              background: "rgba(0, 0, 0, 0.5)",
            },
          }}>
          <CardMedia component="img" image={blog?.image} />
        </Box>

        <br />

        <BlogReactions
          blogId={blog?.id!}
          comments={blog?.comments}
          likes={blog?.likes}
          dislikes={blog?.dislikes}
        />

        <br />

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
              <br />

              <BlogCommentList
                blogId={pageId}
                tempComments={tempComments}
                comments={blog?.user_comments}
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
            </Box>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Box>
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
          open={openApproveDialog}
          onClose={() => setOpenApproveDialog(false)}>
          <DialogTitle>Approve Blog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`You are about the approve this blog. Are you sure you want to continue`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <PurpleButton
              text="Yes"
              size="small"
              loading={isApproving}
              disabled={isApproving}
              onClick={handleApprove}
            />
          </DialogActions>
        </Dialog>
      </Box>

      <Box>
        <Dialog
          open={openDeclineDialog}
          onClose={() => setOpenDeclineDialog(false)}>
          <DialogTitle>Decline Blog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`You are about the decline this blog. Are you sure you want to continue`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <PurpleButton
              text="Yes"
              size="small"
              loading={isDeclining}
              disabled={isDeclining}
              onClick={handleDecline}
            />
          </DialogActions>
        </Dialog>
      </Box>
    </AuthenticatedLayout>
  );
}

const emptyPageSubtitle = "We can't find what you are looking for";

const myTheme = createTheme({
  // Set up your custom MUI theme here
});
export default ReduxProvider(AdminApproveStoryView);
