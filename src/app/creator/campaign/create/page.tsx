"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import BreadCrumb from "@/component/core/BreadCrumb";
import CampaignCreationForm from "@/component/core/CampaignCreationForm";
import {
  Alert,
  AlertTitle,
  Box,
  Grid,
  Typography,
} from "@mui/material";

function CreateCampaign() {
  return (
    <AuthenticatedLayout>
      <br/>
        <Box
          sx={{
            display: { md: "flex", xs: "Block" },
          }}>
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#0F172A",
                fontSize: "1.5em",
              }}>
              Create Campaign
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
                    displayName: "Campaign",
                    url: "/creator/campaign",
                    isActive: false,
                    divider: "/",
                  },
                  {
                    displayName: "Create",
                    isActive: true,
                  },
                ]}
              />
            </Box>
          </Box>
        </Box>
        <br />
        <br />
        <Box>
          <Grid container>
            <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box>
              <Alert variant="outlined" severity="warning">
                <AlertTitle>Post Submission Notice:</AlertTitle>
                {` 
                  As part of our vibrant community, we encourage you to be true and fair when you share your inspiring stories, photos, and videos on our website.
                  Please be aware that by submitting your story, photo, or video, you agree that we feature / post your content on @theafricavision social media pages. This is a fantastic opportunity to showcase your experiences, insights, and creativity to a broader audience, amplifying the impact of your story.
                  We respect your ownership over your content. Kindly include your social media @ handles so we can tag you when we make the posts
                `}
              </Alert>
            </Box>
            <br />
            <br />
              <CampaignCreationForm />
            </Grid>
          </Grid>
        </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(CreateCampaign);
