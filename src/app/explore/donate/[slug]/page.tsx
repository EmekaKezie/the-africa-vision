"use client";
import {
  Box,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { KeyboardArrowLeft } from "@mui/icons-material";
import Nav from "@/component/core/Nav";
import PurpleButton from "@/component/common/PurpleButton";
import PgFooter from "@/component/core/PgFooter";
import { ThemeProvider } from "@mui/styles";
import MUIRichTextEditor from "mui-rte";
import { useEffect, useState } from "react";
import PageEmpty from "@/component/core/PageEmpty";
import { ICampaignData } from "@/types/ICampaign";
import { enqueueSnackbar } from "notistack";
import { ApiGetCampaignByIdForAll } from "@/component/api/campaignApi";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import CampaignViewContributionProgress from "@/component/core/CampaignViewContributionProgress";
import CampaignViewContributionAnalytics from "@/component/core/CampaignViewContributionAnalytics";
import { getDateDifference } from "@/component/common/helpers";
import SocialShare from "@/component/core/SocialShare";
import LoadingPage from "@/component/core/LoadingPage";

export default function ExploreDonateViewPage() {
  const router = useRouter();
  const pathname = usePathname();

  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[splitPathname.length - 1];

  const [campaign, setCampaign] = useState<ICampaignData | undefined>();
  const [loadingCampaign, setLoadingCampaign] = useState<boolean>(true);

  useEffect(() => {
    fetchCampaign();
    // eslint-disable-next-line
  }, []);

  const fetchCampaign = () => {
    setLoadingCampaign(true);
    ApiGetCampaignByIdForAll(pageId)
      .then((response: IResponse<any>) => {
        setLoadingCampaign(false);
        if (response.status === ResponseEnum.success) {
          const campaignData = response?.data;
          setCampaign(campaignData);
        }
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

  const renderContent = () => {
    if (loadingCampaign) {
      return <LoadingPage />;
    } else {
      if (!campaign) {
        return (
          <PageEmpty
            title="Page not found"
            subtitle={<Box>{emptyPageSubtitle}</Box>}
          />
        );
      } else {
        return content();
      }
    }
  };

  const content = () => {
    return (
      <Box>
        <Nav />
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
                router.push("/explore/donate");
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
                <Divider/>
                <br />
                <br />
                 <Typography color={"black"} paddingBottom={"1rem"}>
                  Send private message to the organisers of this campaign
                </Typography> 
                <Box>
                  <TextField
                    placeholder="Write your message"
                    multiline
                    fullWidth
                    rows={10}
                  />
                  <br />
                  <br />
                  <PurpleButton
                    text="Send Message"
                    style={{ width: "150px" }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box>
                <CampaignViewContributionAnalytics
                  targetAmount={campaign?.target_amount ?? 0}
                  raisedAmount={campaign?.raised_amount ?? 0}
                  currency={campaign?.base_currency ?? "NGN"}
                  startDate={campaign?.start_date ?? ""}
                  endDate={campaign?.end_date ?? ""}
                  contributors={campaign?.contributors ?? 0}
                  hasActionButton={true}
                  buttonText="Donate"
                  redirectUrl={`/explore/donate/${pageId}/action`}
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

        <br />
        <br />
        <Box
          sx={{
            padding: { md: "0 8rem", xs: "0 1rem" },
            backgroundColor: "#FFF9FD",
          }}>
          <PgFooter />
        </Box>
      </Box>
    );
  };

  return <Box>{renderContent()}</Box>;
}

const myTheme = createTheme({
  // Set up your custom MUI theme here
});

const emptyPageSubtitle = "We can't find what you are looking for";
