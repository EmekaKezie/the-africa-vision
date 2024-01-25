"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import BlogList from "@/component/core/BlogList";
import BreadCrumb from "@/component/core/BreadCrumb";
import CampaignList from "@/component/core/CampaignList";
import StatsCard from "@/component/core/StatsCard";
import { storyData } from "@/data/storyData";
import { IStory } from "@/types/IStory";
import { AutoStories, BarChart, Campaign } from "@mui/icons-material";
import { Box, Divider, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

type tabListProps = {
  icon: ReactNode;
  label: string;
};

function Approvals() {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (e: any, value: number) => {
    setTabIndex(value);
  };

  const handleOnClickCampaignActions = (
    item: IStory,
    url: string,
    action: string
  ) => {
    if (action === "view") {
      router.push(`${url}/${item.id}`);
    }
  };

  const handleOnClickStoryActions = (
    item: IStory,
    url: string,
    action: string
  ) => {
    if (action === "view") {
      router.push(`${url}/${item.id}`);
    }
  };

  const tabList: tabListProps[] = [
    {
      icon: <Campaign sx={{ fontSize: "18px" }} />,
      label: "Campaigns",
    },
    {
      icon: <AutoStories sx={{ fontSize: "15px" }} />,
      label: "Stories",
    },
  ];
  return (
    <AuthenticatedLayout>
      <Box
        sx={{
          display: { md: "flex" },
        }}>
        <Box flexGrow={1}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#0F172A",
              fontSize: "1.5em",
            }}>
            Approvals
          </Typography>

          <Box>
            <BreadCrumb
              data={[
                {
                  displayName: "Dashboard",
                  url: "/admin/dashboard",
                  isActive: false,
                  divider: "/",
                },
                {
                  displayName: "Approvals",
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
          {/* <Link href={`/creators/create`}>
            <PurpleButton
              text="Add Creator"
              shade="purple"
              size="small"
              startIcon={<Add />}
            />
          </Link> */}
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

      <Box
        sx={{
          padding: "1rem",
          backgroundColor: "#FFFFFF",
          height: "100%",
          boxShadow: "1px 1px 5px lightgray",
          borderRadius: "5px",
        }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary">
          {tabList.map((item: tabListProps, index: number) => (
            <Tab
              key={index}
              label={
                <Box
                  sx={{
                    color: "#A9518B",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    textTransform: "none",
                  }}>
                  {item.icon} {item.label}
                </Box>
              }
            />
          ))}
        </Tabs>
        <Divider />
        {tabIndex === 0 && (
          <Box>
            <CampaignList
              swipeButtons={false}
              variation="tabular"
              data={storyData.filter(
                (i: IStory) => i.approvalStatus !== "approved"
              )}
              actionOptions={{
                showEdit: false,
              }}
              redirectUrl="approvals/campaign"
              onActionClick={(item: IStory, url, action) => {
                handleOnClickCampaignActions(item, url, action);
              }}
            />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <BlogList
              swipeButtons={false}
              variation="tabular"
              data={storyData.filter(
                (i: IStory) => i.approvalStatus !== "approved"
              )}
              actionOptions={{
                showEdit: false,
              }}
              redirectUrl="approvals/story"
              onActionClick={(item: IStory, url, action) => {
                handleOnClickStoryActions(item, url, action);
              }}
            />
          </Box>
        )}
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Approvals);
