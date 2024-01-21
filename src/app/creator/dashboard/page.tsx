"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import CampaignList from "@/component/core/CampaignList";
import StatsCard from "@/component/core/StatsCard";
import ActivityList from "@/component/core/ActivityList";
import DonationList from "@/component/core/DonationList";
import TransactionTable from "@/component/core/TransactionTable";
import { activityData } from "@/data/activityData";
import { storyData } from "@/data/storyData";
import { transactionData } from "@/data/transactionData";
import { useAppSelector } from "@/redux/useReduxHooks";
import { AttachMoney, BarChart } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";

function Overview() {
  const auth = useAppSelector((state) => state.authReducer);
  return (
    <AuthenticatedLayout>
      <br />
      <Box>
        <Typography
          sx={{
            color: "#120F0F",
            fontSize: { md: "2.25em", xs: "1.8em" },
            fontWeight: "bold",
            lineHeight: "46px",
          }}>
          Hi {auth.firstname} {auth.lastname}
        </Typography>
        <Typography
          sx={{
            color: "#898989",
            fontSize: "0.8em",
            fontWeight: "bold",
          }}>
          Welcome to your dashboard
        </Typography>
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
                    <BarChart sx={{ color: "#2773FF" }} />
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
                    <BarChart sx={{ color: "#2773FF" }} />
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
                    <BarChart sx={{ color: "#2773FF" }} />
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
                    <BarChart sx={{ color: "#2773FF" }} />
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
              <DonationList variation="swipeable" data={storyData} />
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
              <CampaignList
                variation="pinned"
                data={storyData}
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
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                height: "100%",
                boxShadow: "1px 1px 5px lightgray",
              }}>
              <TransactionTable
                data={transactionData}
                title={
                  <Box
                    sx={{
                      padding: "0.5rem 0 0 0",
                    }}>
                    <Typography
                      sx={{
                        color: "#120F0F",
                        fontWeight: "bold",
                        fontSize: "1.1em",
                      }}>
                      Transactions
                    </Typography>
                    <Typography
                      sx={{
                        color: "#898989",
                        fontSize: "0.9em",
                      }}>
                      Last 2 Weeks
                    </Typography>
                  </Box>
                }
                startAt={0}
                stopAt={6}
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
                  Recent Activities
                </Typography>
              </Box>
              <ActivityList data={activityData} startAt={0} stopAt={5} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Overview);
