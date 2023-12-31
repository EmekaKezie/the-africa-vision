"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import StatsCard from "@/component/core/StatsCard";
import StoryCampaign from "@/component/core/StoryCampaign";
import StoryCampaign2 from "@/component/core/StoryCampaign2";
import StoryProjects from "@/component/core/StoryProjects";
import { storyDonationData } from "@/data/storyDonationData";
import { Add, AttachMoney } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";

function CampaignUAdmn() {
  return (
    <AuthenticatedLayout>
      <br />
      <Box>
        <Grid container>
          <Grid item lg={6} md={6} sm={5} xs={5}>
            <Box
              sx={{
                height: "100%",
                alignItems: "center",
                display: "flex",
              }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#0F172A",
                  fontSize: "1.5em",
                }}>
                Campaign
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={7} xs={7}>
            <Box
              sx={{
                justifyContent: { md: "end" },
                float:"right"
              }}>
               <PurpleButton
                  text="Create new campaign"
                  shade="purple"
                  size="small"
                  startIcon={<Add />}
                />
            </Box>
          </Grid>
        </Grid>
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
        <StoryCampaign
          swipeButtons={false}
          variation="swipeable"
          data={storyDonationData}
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
        <StoryCampaign
          swipeButtons={false}
          variation="tabular"
          data={storyDonationData}
        />
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(CampaignUAdmn);
