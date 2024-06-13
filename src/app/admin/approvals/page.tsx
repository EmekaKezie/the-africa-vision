"use client";
import { ApiGetBlogsForAdmin } from "@/component/api/blogApi";
import { ApiGetCampaignsForAdmin } from "@/component/api/campaignApi";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ExpiredSessionModal from "@/component/common/ExpiredSessionModal";
import ReduxProvider from "@/component/common/ReduxProvider";
import BlogList from "@/component/core/BlogList";
import BreadCrumb from "@/component/core/BreadCrumb";
import CampaignList from "@/component/core/CampaignList";
import PageEmpty from "@/component/core/PageEmpty";
import SkeletonList from "@/component/core/SkeletonList";
import StatsCard from "@/component/core/StatsCard";
import { useAppSelector } from "@/redux/useReduxHooks";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { IBlogData } from "@/types/IBlog";
import { ICampaignData } from "@/types/ICampaign";
import { AutoStories, BarChart, Campaign } from "@mui/icons-material";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { ReactNode, useEffect, useState } from "react";

type tabListProps = {
  icon: ReactNode;
  label: string;
};

function Approvals() {
  const router = useRouter();
  const authStore = useAppSelector((state) => state.authReducer);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [campaigns, setCampaigns] = useState<ICampaignData[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<IBlogData[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);
  const [isSessionValid, setIsSessionValid] = useState<boolean>(true);

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

  const fetchCampaigns = () => {
    setLoadingCampaigns(true);
    ApiGetCampaignsForAdmin(authStore.token)
      .then((response: IResponse<any>) => {
        setLoadingCampaigns(false);
        if (response.status === ResponseEnum.success) {
          const campaignData = response?.data?.campaigns;
          setCampaigns(campaignData);
        }
        if (response.status === ResponseEnum.fail) {
          enqueueSnackbar(response.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
        if (response.status === ResponseEnum.expired_token) {
          setIsSessionValid(false);
        }
      })
      .catch((error: any) => {
        setLoadingCampaigns(false);
        enqueueSnackbar("Error fetching projects", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const fetchBlogs = () => {
    setLoadingBlogs(true);
    ApiGetBlogsForAdmin(authStore.token)
      .then((response: IResponse<any>) => {
        setLoadingBlogs(false);
        if (response.status === ResponseEnum.success) {
          const blogData = response.data.results;
          setBlogs(blogData);
        }
        if (response.status === ResponseEnum.fail) {
          enqueueSnackbar(response.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
        if (response.status === ResponseEnum.expired_token) {
          setIsSessionValid(false);
        }
      })
      .catch((error: any) => {
        setLoadingBlogs(false);
        enqueueSnackbar("Error fetching stories", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const renderCampaigns = () => {
    if (loadingCampaigns) {
      return (
        <Box sx={{ padding: "0.5rem" }}>
          <SkeletonList itemcount={3} cardType="type2" />
        </Box>
      );
    }
    if (!loadingCampaigns && campaigns?.length > 0) {
      return (
        <CampaignList
          swipeButtons={false}
          variation="tabular"
          data={campaigns}
          actionOptions={
            {
              //showDelete: false,
            }
          }
          redirectUrl="approvals/campaign"
          onActionClick={(item: ICampaignData, url, action) => {
            handleOnClickCampaignActions(item, url, action);
          }}
        />
      );
    }
    if (!loadingCampaigns && campaigns?.length < 1) {
      return <PageEmpty title="There are no campaings yet" />;
    }
  };

  const renderBlogs = () => {
    if (loadingBlogs) {
      <Box sx={{ padding: "0.5rem" }}>
        <SkeletonList itemcount={3} cardType="type2" />
      </Box>;
    }

    if (!loadingBlogs && blogs.length > 0) {
      return (
        <BlogList
          variation="tabular"
          data={blogs}
          actionOptions={{
            showEdit: false,
          }}
          redirectUrl="approvals/story"
          onActionClick={(item: IBlogData, url, action) => {
            handleOnClickStoryActions(item, url, action);
          }}
        />
      );
    }

    if (!loadingBlogs && blogs.length < 1) {
      return <PageEmpty title="There are not stories yet" />;
    }
  };

  const handleTabChange = (e: any, value: number) => {
    setTabIndex(value);
  };

  const handleOnClickCampaignActions = (
    item: ICampaignData,
    url: string,
    action: string
  ) => {
    if (action === "view") {
      router.push(`${url}/${item.id}`);
    }
  };

  const handleOnClickStoryActions = (
    item: IBlogData,
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

      {/* <Box>
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

      <br /> */}

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
        {tabIndex === 0 && <Box>{renderCampaigns()}</Box>}
        {tabIndex === 1 && <Box>{renderBlogs()}</Box>}
      </Box>
      {!loadingBlogs && !loadingCampaigns && !isSessionValid && (
        <ExpiredSessionModal />
      )}
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Approvals);
