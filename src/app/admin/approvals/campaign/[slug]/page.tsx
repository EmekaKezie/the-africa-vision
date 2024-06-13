"use client";
import {
  ApiApproveCampaign,
  ApiDeclineCampaign,
  ApiGetCampaignByIdForAdmin,
} from "@/component/api/campaignApi";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import { getDateDifference, statusHandler } from "@/component/common/helpers";
import BreadCrumb from "@/component/core/BreadCrumb";
import CampaignDonationListView from "@/component/core/CampaignDonationListView";
import CampaignViewContributionAnalytics from "@/component/core/CampaignViewContributionAnalytics";
import CampaignViewContributionProgress from "@/component/core/CampaignViewContributionProgress";
import PageEmpty from "@/component/core/PageEmpty";
import { useAppSelector } from "@/redux/useReduxHooks";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { ICampaignData } from "@/types/ICampaign";
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

function AdminApproveCampignView() {
  const router = useRouter();
  const authStore = useAppSelector((state) => state.authReducer);
  const pathname = usePathname();
  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[4];

  const [campaign, setCampaign] = useState<ICampaignData | undefined>();
  const [loadingCampaign, setLoadingCampaign] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isDeclining, setIsDeclining] = useState<boolean>(false);
  const [openApproveDialog, setOpenApproveDialog] = useState<boolean>(false);
  const [openDeclineDialog, setOpenDeclineDialog] = useState<boolean>(false);
  const [approvalStatus, setApprovalStatus] = useState<string>("");

  useEffect(() => {
    fetchCampaign();
    // eslint-disable-next-line
  }, []);

  const fetchCampaign = () => {
    setLoadingCampaign(true);
    ApiGetCampaignByIdForAdmin(pageId, authStore.token)
      .then((response) => {
        const campaignData = response?.data;
        setCampaign(campaignData);
        setApprovalStatus(campaignData.approval_status);
        setLoadingCampaign(false);
      })
      .catch((error: any) => {
        setLoadingCampaign(false);
        enqueueSnackbar("Error fetching content", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const handleApprove = () => {
    setIsApproving(true);
    ApiApproveCampaign(pageId, authStore.token)
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
    ApiDeclineCampaign(pageId, authStore.token)
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
    if (loadingCampaign) {
      <Box sx={{ padding: "0.5rem" }}>loading</Box>;
    }

    if (!loadingCampaign && campaign) {
      return content();
    }

    if (!loadingCampaign && !campaign) {
      return (
        <PageEmpty
          title="Page not found"
          subtitle={<Box>{"We can't find what you are looking for"}</Box>}
        />
      );
    }
  };

  const renderToolBar = (approvalStatus: string) => {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        {approvalStatus === "pending" && (
          <Tooltip title="Approve this campaign">
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
          <Tooltip title="Decline this campaign">
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
            {campaign?.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.7em",
              color: "#94A3B8",
            }}>
            {campaign?.user?.fullname} •{" "}
            {getDateDifference(
              campaign?.created_at!,
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
          <CardMedia component="img" image={campaign?.image} />
        </Box>

        <br />
        <br />
        <br />

        <Grid container spacing={4}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box>
              <CampaignViewContributionProgress
                targetAmount={campaign?.target_amount ?? 0}
                raisedAmount={campaign?.raised_amount ?? 0}
                currency={campaign?.base_currency ?? "NGN"}
              />

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
                    defaultValue={!campaign ? "" : campaign?.content}
                    readOnly
                    controls={[]}
                  />
                </ThemeProvider>
              </Box>

              <br />
              <br />

              <Box>
                <TextField
                  placeholder="Add message here"
                  multiline
                  fullWidth
                  rows={10}
                />
                <br />
                <br />
                <PurpleButton text="Send Message" style={{ width: "150px" }} />
              </Box>
            </Box>

            <br />
              <br />
              
            {/* <Box>
              <CampaignDonationListView campaignId={campaign?.id!} />
            </Box> */}
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Box>
              <CampaignViewContributionAnalytics
                targetAmount={campaign?.target_amount ?? 0}
                raisedAmount={campaign?.raised_amount ?? 0}
                currency={campaign?.base_currency ?? "NGN"}
                startDate={campaign?.start_date ?? ""}
                contributors={campaign?.contributors ?? 0}
                hasActionButton={false}
                endDate={campaign?.end_date ?? ""}
                //buttonText="Donate"
                //redirectUrl={`/explore/donate/${pageId}/action`}
              />
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
          <DialogTitle>Approve Campaign</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`You are about the approve this campaign. Are you sure you want to continue`}
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
          <DialogTitle>Decline Campaign</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`You are about the decline this campaign. Are you sure you want to continue`}
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

const myTheme = createTheme({
  // Set up your custom MUI theme here
});
export default ReduxProvider(AdminApproveCampignView);
