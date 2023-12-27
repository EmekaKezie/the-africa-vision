"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import StatsCard from "@/component/core/StatsCard";
import StoryActivities from "@/component/core/StoryActivities";
import StoryCampaign2 from "@/component/core/StoryCampaign2";
import StoryDonations from "@/component/core/StoryDonations";
import StoryProjects from "@/component/core/StoryProjects";
import Transactions from "@/component/core/Transactions";
import { activityData } from "@/data/activityData";
import { storyDonationData } from "@/data/storyDonationData";
import { transactionData } from "@/data/transactionData";
import { useAppSelector } from "@/redux/useReduxHooks";
import { AttachMoney, PieChart } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";

function Overview() {
  const auth = useAppSelector((state) => state.authReducer);
  return (
    <AuthenticatedLayout>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
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

          <Grid item lg={3} md={3} sm={6} xs={12}>
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

          <Grid item lg={3} md={3} sm={6} xs={12}>
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

          <Grid item lg={3} md={3} sm={6} xs={12}>
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

      <Box>
        <Grid container spacing={2}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
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
                  Recent Donations
                </Typography>
                <Typography sx={{ color: "#2F840B", fontSize: "0.7em" }}>
                  <Link href="/overview">See All</Link>
                </Typography>
              </Box>
              <StoryDonations
                swipeable
                data={storyDonationData}
                swipeButtons={false}
              />
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
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
                  Upcoming Projects
                </Typography>
              </Box>
              <StoryProjects
                data={storyDonationData}
                variation="pinned"
                startAt={0}
                stopAt={4}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br />

      <Box>
        <Grid container spacing={2}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Transactions data={transactionData}/>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#FFFFFF",
                height: "100%",
              }}>
              <Box display="flex" alignItems="center">
                <Typography
                  sx={{
                    flexGrow: 1,
                    color: "#120F0F",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                  }}>
                  Recent Activities
                </Typography>
              </Box>
              <StoryActivities data={activityData} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Overview);
