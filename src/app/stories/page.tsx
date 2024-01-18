"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import StatsCard from "@/component/core/StatsCard";
import { useAppSelector } from "@/redux/useReduxHooks";
import { Add, AttachMoney } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { storyData } from "@/data/storyData";
import ActivityList from "@/component/core/ActivityList";
import { activityData } from "@/data/activityData";
import PurpleButton from "@/component/common/PurpleButton";
import BlogCardType2 from "@/component/core/BlogListCardType2";
import CampaignList from "@/component/core/CampaignList";

function Stories() {
  const auth = useAppSelector((state) => state.authReducer);
  return (
    <AuthenticatedLayout>
      <br />
      <Box>
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
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
                Stories
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: { md: "end" },
              }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ marginTop: { xs: "10px", md: "0" } }}>
                <PurpleButton
                  text="Create a project"
                  shade="white"
                  size="small"
                  startIcon={<Add />}
                />
                <PurpleButton
                  text="Create new story"
                  shade="purple"
                  size="small"
                  startIcon={<Add />}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br />

      <Box
        sx={{
          padding: "1em",
          background: "#FFFFFF",
          boxShadow: "1px 1px 5px lightgray",
        }}>
        <Grid container spacing={0}>
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            borderRight="1px solid lightgray">
            <StatsCard
              type="type2"
              data={{
                label: "+10%",
                currency: "NGN",
                title: "Total Revenue",
                amount: 1224600,
                icon: (
                  <IconButton
                    sx={{ backgroundColor: "#D4E3FF", fontSize: "0.5em" }}
                    size="small">
                    <AttachMoney sx={{ color: "#2773FF" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            sx={{ borderRight: { md: "1px solid lightgray" } }}>
            <StatsCard
              type="type2"
              data={{
                label: "+10%",
                currency: "NGN",
                title: "Total Revenue",
                amount: 1224600,
                icon: (
                  <IconButton
                    sx={{ backgroundColor: "#D4E3FF", fontSize: "0.5em" }}
                    size="small">
                    <AttachMoney sx={{ color: "#2773FF" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={6}
            borderRight="1px solid lightgray">
            <StatsCard
              type="type2"
              data={{
                label: "+10%",
                currency: "NGN",
                title: "Total Revenue",
                amount: 1224600,
                icon: (
                  <IconButton
                    sx={{ backgroundColor: "#D4E3FF", fontSize: "0.5em" }}
                    size="small">
                    <AttachMoney sx={{ color: "#2773FF" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={6}>
            <StatsCard
              type="type2"
              data={{
                label: "+10%",
                currency: "NGN",
                title: "Total Revenue",
                amount: 1224600,
                icon: (
                  <IconButton
                    sx={{ backgroundColor: "#D4E3FF", fontSize: "0.5em" }}
                    size="small">
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
                  Recent Story
                </Typography>
                <Typography sx={{ color: "#2F840B", fontSize: "0.7em" }}>
                  <Link href="/stories">See All</Link>
                </Typography>
              </Box>
              <Box>
                <BlogCardType2 item={storyData[3]} elevation={0} showInput />
              </Box>
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
                  Top Projects
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

      <Box
        sx={{
          padding: "1rem",
          backgroundColor: "#FFFFFF",
          height: "100%",
          boxShadow: "1px 1px 5px lightgray",
        }}>
        <ActivityList data={activityData} />
      </Box>
    </AuthenticatedLayout>
  );
}

const cardText =
  "Conduct design process best practices across projects such as gathering insights, validating problems & solutions, delivering multiple fidelity levels of design, and ensure the final design is implemented properly on.";

export default ReduxProvider(Stories);
