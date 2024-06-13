"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import CampaignList from "@/component/core/CampaignList";
import StatsCard from "@/component/core/StatsCard";
import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import { AutoStories, BarChart, Campaign } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ICampaignData } from "@/types/ICampaign";
import { ApiGetCampaignsForUser } from "@/component/api/campaignApi";
import { enqueueSnackbar } from "notistack";
import SkeletonList from "@/component/core/SkeletonList";
import PageEmpty from "@/component/core/PageEmpty";
import { getCurrentDate, getDateDifference } from "@/component/common/helpers";
import { IBlogData } from "@/types/IBlog";
import { ApiGetBlogsForUser } from "@/component/api/blogApi";
import BlogList from "@/component/core/BlogList";
import DonationHistoryTable from "@/component/core/DonationHistoryTable";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { onSessionValid } from "@/redux/slices/sessionSlice";
import { ApiCreatorAnalytics } from "@/component/api/analyticsApi";

function Overview() {
  const authStore = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const [campaigns, setCampaigns] = useState<ICampaignData[]>([]);
  const [recentDonations, setRecentDonations] = useState<ICampaignData[]>([]);
  const [upcomingProjects, setUpcomingProjects] = useState<ICampaignData[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<IBlogData[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<any | undefined>();

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

  const fetchAnalytics = () => {
    setLoadingAnalytics(true);
    ApiCreatorAnalytics(authStore.token)
      .then((response: IResponse<any>) => {
        setLoadingAnalytics(false);
        if (response.status === ResponseEnum.success) {
          const analytics = response.data;
          setAnalytics(analytics);
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
          dispatch(onSessionValid({ isValid: false }));
        }
      })
      .catch((error: any) => {
        console.log(error);
        setLoadingAnalytics(false);
        enqueueSnackbar("Error fetching analytics", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const fetchCampaigns = () => {
    setLoadingCampaigns(true);
    ApiGetCampaignsForUser(authStore.token)
      .then((response: IResponse<any>) => {
        setLoadingCampaigns(false);
        if (response.status === ResponseEnum.success) {
          const campaignData = response?.data?.campaigns;

          const modifiedCampaign = campaignData.map((item: ICampaignData) => ({
            ...item,
            today: getCurrentDate(),
          }));

          //get recent donations: formular => campaign date is in the future and contributors is greater than 0
          const recentDonations = modifiedCampaign.filter(
            (x: any) =>
              getDateDifference(x.today, x.start_date).diffInDays >= 0 &&
              x.contributors > 0
          );
          setRecentDonations(recentDonations);

          //get top project: formular => campaign date is in the future
          const upcomingProjects = modifiedCampaign.filter(
            (x: any) => getDateDifference(x.today, x.start_date).diffInDays >= 0
          );

          setUpcomingProjects(upcomingProjects);
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
          dispatch(onSessionValid({ isValid: false }));
        }
      })
      .catch((error: any) => {
        setLoadingCampaigns(false);
        enqueueSnackbar("Error fetching donations", {
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
    ApiGetBlogsForUser(authStore.token)
      .then((response: IResponse<any>) => {
        setLoadingBlogs(false);
        if (response.status === ResponseEnum.success) {
          const blogData = response.data.posts;
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
          dispatch(onSessionValid({ isValid: false }));
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

  const renderRecentDonations = () => {
    if (loadingCampaigns) {
      return <SkeletonList itemcount={3} cardType="type1" />;
    }
    if (!loadingCampaigns && recentDonations.length > 0) {
      return (
        <CampaignList
          data={recentDonations}
          variation="swipeable"
          cardType="type4"
        />
      );
    }
    if (!loadingCampaigns && recentDonations.length < 1) {
      return <PageEmpty title="You have no recent donation" />;
    }
  };

  const renderUpcomingProjects = () => {
    if (loadingCampaigns) {
      return (
        <Box sx={{ paddingTop: "1rem" }}>
          <SkeletonList itemcount={3} cardType="type2" />
        </Box>
      );
    }
    if (!loadingCampaigns && upcomingProjects.length > 0) {
      return (
        <CampaignList
          variation="pinned"
          data={upcomingProjects}
          startAt={0}
          stopAt={4}
        />
      );
    }
    if (!loadingCampaigns && upcomingProjects.length < 1) {
      return <PageEmpty title="You have no upcoming project" />;
    }
  };

  const renderBlogs = () => {
    if (loadingBlogs) {
      return <SkeletonList itemcount={1} cardType="type3" />;
    }

    if (!loadingBlogs && blogs.length > 0) {
      return (
        <BlogList data={blogs} variation="pinned" startAt={0} stopAt={4} />
      );
    }

    if (!loadingBlogs && blogs.length < 1) {
      return (
        <PageEmpty
          title="You have no story"
          subtitle={
            <Box>
              Click{" "}
              <Link
                href={`/creator/story/create`}
                style={{ color: "#A8518A", fontWeight: "bold" }}>
                Here
              </Link>{" "}
              to create a project{" "}
            </Box>
          }
        />
      );
    }
  };

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
          Hi {authStore.fullname}
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
          <Grid item lg={4} md={4} sm={6} xs={6}>
            <StatsCard
              type="type1"
              data={{
                currency: "NGN",
                title: "Total Campaigns",
                total: analytics?.total_campaigns,
                icon: (
                  <IconButton sx={{ backgroundColor: "#ADD8B2" }}>
                    <Campaign sx={{ color: "#198A27" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={6}>
            <StatsCard
              type="type1"
              data={{
                currency: "NGN",
                title: "Total Stories",
                total: analytics?.total_posts,
                icon: (
                  <IconButton sx={{ backgroundColor: "#F7EFBA" }}>
                    <AutoStories sx={{ color: "#C48711" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={6}>
            <StatsCard
              type="type1"
              data={{
                currency: "NGN",
                title: "Total Payments",
                total: analytics?.total_payments.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                icon: (
                  <IconButton sx={{ backgroundColor: "#DDA69B" }}>
                    <BarChart sx={{ color: "#C41111" }} />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          {/* <Grid item lg={3} md={3} sm={6} xs={6}>
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
          </Grid> */}
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
                  <Link href="/overview">See all</Link>
                </Typography>
              </Box>
              {renderRecentDonations()}
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
              {renderUpcomingProjects()}
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
              {/* <TransactionTable
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
              /> */}

              <DonationHistoryTable
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
                      Donations
                    </Typography>
                    <Typography
                      sx={{
                        color: "#898989",
                        fontSize: "0.9em",
                      }}>
                      Donation Overview of your campaigns
                    </Typography>
                  </Box>
                }
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
                  Latest Stories
                </Typography>
              </Box>
              {renderBlogs()}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Overview);
