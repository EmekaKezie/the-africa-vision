"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import BreadCrumb from "@/component/core/BreadCrumb";
import CampaignCreationForm from "@/component/core/CampaignCreationForm";
import {
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
              <CampaignCreationForm />
            </Grid>
          </Grid>
        </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(CreateCampaign);
