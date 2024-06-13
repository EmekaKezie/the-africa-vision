"use client";
import {
  ApiGetCampaignByIdForAdmin,
  ApiGetCampaignByIdForAll,
  ApiUpdateCampaignByUser,
} from "@/component/api/campaignApi";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import { getDateDifference, statusHandler } from "@/component/common/helpers";
import CampaignDonationListView from "@/component/core/CampaignDonationListView";
import CampaignViewContributionAnalytics from "@/component/core/CampaignViewContributionAnalytics";
import CampaignViewContributionProgress from "@/component/core/CampaignViewContributionProgress";
import PageEmpty from "@/component/core/PageEmpty";
import SocialShare from "@/component/core/SocialShare";
import { useAppSelector } from "@/redux/useReduxHooks";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { ICampaignData, ICampaignInput } from "@/types/ICampaign";
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

function UserCampaignView() {
  const router = useRouter();
  const authStore = useAppSelector((state) => state.authReducer);
  const pathname = usePathname();
  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[3];

  const [campaign, setCampaign] = useState<ICampaignData | undefined>();
  const [loadingCampaign, setLoadingCampaign] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [openPublishDialog, setOpenPublishDialog] = useState<boolean>(false);
  const [approvalStatus, setApprovalStatus] = useState<string>("");
  const [isPublished, setIsPublished] = useState<number>(0);

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
        setIsPublished(campaignData.is_published);
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

  const handlePublish = () => {
    setIsPublishing(true);

    const payload: ICampaignInput = {
      title: campaign?.title!,
      content: campaign?.content!,
      //imageBase64: imageBase64,
      start_date: campaign?.start_date!,
      end_date: campaign?.end_date!,
      category_id: campaign?.category?.id!,
      target_amount: campaign?.target_amount!,
      payment_options: ["paystack", "flutterwave"],
      partners: campaign?.partners,
      venue: campaign?.venue!,
      draft: false,
    };
    console.log(payload);
    ApiUpdateCampaignByUser(campaign?.id.toString()!, payload, authStore.token)
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
    if (loadingCampaign) {
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
          <Tooltip title="Publish this campaign">
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
                router.push("/creator/campaign");
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
              background: "rgba(0, 0, 0, 0.1)",
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

              {/* <Box>
                <CampaignDonationListView campaignId={campaign?.id!} />
              </Box>  */}

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
            <br />
            <br />
            <Box component={"div"}>
              <SocialShare url={window.location.href} />
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
          <DialogTitle>Publish Campaign</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`You are about to publish this campaign. If you want to proceed, please click on the publish button below`}
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
export default ReduxProvider(UserCampaignView);
