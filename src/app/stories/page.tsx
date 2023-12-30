"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import StatsCard from "@/component/core/StatsCard";
import { useAppSelector } from "@/redux/useReduxHooks";
import { AttachMoney, Favorite, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import AvatarIcon from "@/assets/avatar.png";
import StoryThumbnail from "@/assets/story-thumbnail-2.png";
import StoryProjects from "@/component/core/StoryProjects";
import { storyDonationData } from "@/data/storyDonationData";
import TextInput from "@/component/common/TextInput";
import StoryActivities from "@/component/core/StoryActivities";
import { activityData } from "@/data/activityData";

function Stories() {
  const auth = useAppSelector((state) => state.authReducer);
  return (
    <AuthenticatedLayout>
      <Box>
        
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
                <Card elevation={0}>
                  <CardHeader
                    avatar={
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <Avatar
                            alt="Remy Sharp"
                            src={AvatarIcon.src}
                            sx={{ height: "20px", width: "20px" }}
                          />
                        }>
                        <Avatar sx={{ backgroundColor: "#2563EB" }}>DE</Avatar>
                      </Badge>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVert />
                      </IconButton>
                    }
                    title={
                      <Typography
                        sx={{
                          color: "#0F172A",
                        }}>
                        Design Enthusiast
                      </Typography>
                    }
                    subheader={
                      <Typography
                        sx={{
                          fontSize: "0.7em",
                          color: "#94A3B8",
                        }}>
                        Angela Lee • 56 mins ago
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Box>
                      <Typography sx={{ color: "#64748B" }}>
                        {cardText}
                      </Typography>
                    </Box>
                    <br />
                    <CardMedia
                      component="img"
                      src={StoryThumbnail.src}
                      height={200}
                      sx={{
                        width: "100%",
                      }}
                    />
                    <br />
                    <Box display="flex">
                      <Box flexGrow={1}>
                        <Favorite />
                        <Typography>2.6k Likes</Typography>
                      </Box>
                      <Box flexGrow={1} display="flex" justifyContent="center">
                        <Favorite />
                        <Typography>2.6k Likes</Typography>
                      </Box>
                      <Box flexGrow={1} display="flex" justifyContent="end">
                        <Favorite />
                        <Typography>2.6k Likes</Typography>
                      </Box>
                    </Box>
                  </CardContent>

                  <Box>
                    <TextInput
                      size="small"
                      fullWidth
                      inputStyle={{
                        background: "#FFF9FD",
                        border: "1px solid #CCCCCC",
                      }}
                    />
                  </Box>
                </Card>
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

      <Box
        sx={{
          padding: "1rem",
          backgroundColor: "#FFFFFF",
          height: "100%",
          boxShadow: "1px 1px 5px lightgray",
        }}>
        <StoryActivities data={activityData} />
      </Box>
    </AuthenticatedLayout>
  );
}

const cardText =
  "Conduct design process best practices across projects such as gathering insights, validating problems & solutions, delivering multiple fidelity levels of design, and ensure the final design is implemented properly on.";

export default ReduxProvider(Stories);
