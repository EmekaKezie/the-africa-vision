"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import StatsCard from "@/component/core/StatsCard";
import CampaignList from "@/component/core/CampaignList";
import { storyData } from "@/data/storyData";
import { Add, AttachMoney } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import BreadCrumb from "@/component/core/BreadCrumb";

function CampaignUAdmn() {
  return (
    <AuthenticatedLayout>
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
            Campaign
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
                  isActive: true,
                },
              ]}
            />
          </Box>
        </Box>

        <Box
          sx={{
            justifyContent: { md: "end" },
          }}>
          <Link href={`/creator/campaign/create`}>
            <PurpleButton
              text="Create Campaign"
              shade="purple"
              size="small"
              startIcon={<Add />}
            />
          </Link>
        </Box>
      </Box>

      <br />

      <Box>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={6} xs={6}>
            <StatsCard
              type="type1"
              data={{
                label: "+10%",
                currency: "NGN",
                title: "Total Revenue",
                amount: 1224600,
                icon: (
                  <IconButton sx={{ backgroundColor: "#D4E3FF" }}>
                    <AttachMoney sx={{ color: "#2773FF" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={6}>
            <StatsCard
              type="type1"
              data={{
                label: "+10%",
                currency: "NGN",
                title: "Total Donation",
                amount: 32424600,
                icon: (
                  <IconButton sx={{ backgroundColor: "#D4E3FF" }}>
                    <AttachMoney sx={{ color: "#2773FF" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={6}>
            <StatsCard
              type="type1"
              data={{
                label: "+10%",
                currency: "NGN",
                title: "Received",
                amount: 24600,
                icon: (
                  <IconButton sx={{ backgroundColor: "#D4E3FF" }}>
                    <AttachMoney sx={{ color: "#2773FF" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={6}>
            <StatsCard
              type="type1"
              data={{
                label: "+10%",
                currency: "NGN",
                title: "Donated",
                amount: 32424600,
                icon: (
                  <IconButton sx={{ backgroundColor: "#D4E3FF" }}>
                    <AttachMoney sx={{ color: "#2773FF" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <br />

      <Box
        sx={{
          padding: "1rem",
          backgroundColor: "#FFFFFF",
          height: "100%",
          boxShadow: "1px 1px 5px lightgray",
        }}>
        <Box display="flex" alignItems="center">
          <Typography
            sx={{
              flexGrow: 1,
              color: "#120F0F",
              fontWeight: "bold",
              fontSize: "1.1em",
            }}>
            New Projects
          </Typography>
          <Typography sx={{ color: "#2F840B", fontSize: "0.7em" }}>
            <Link href="/overview">See All</Link>
          </Typography>
        </Box>
        {/* <StoryProjects
          variation="swipeable"
          data={storyDonationData}
          swipeButtons={false}
        /> */}
        <CampaignList
          swipeButtons={false}
          variation="swipeable"
          data={storyData}
        />
      </Box>

      <br />

      <Box
        sx={{
          //padding: "0.5rem",
          backgroundColor: "#FFFFFF",
          height: "100%",
          boxShadow: "1px 1px 5px lightgray",
        }}>
        {/* <StoryProjects
          variation="swipeable"
          data={storyDonationData}
          swipeButtons={false}
        /> */}
        <CampaignList
          swipeButtons={false}
          variation="tabular"
          data={storyData}
          actionOptions={{
            //showDelete: false,
          }}
        />
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(CampaignUAdmn);
