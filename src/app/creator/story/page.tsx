"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import StatsCard from "@/component/core/StatsCard";
import { useAppSelector } from "@/redux/useReduxHooks";
import { Add, AttachMoney } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import PurpleButton from "@/component/common/PurpleButton";
import BlogListCardType2 from "@/component/core/BlogListCardType2";
import CampaignList from "@/component/core/CampaignList";
import BreadCrumb from "@/component/core/BreadCrumb";
import { useEffect, useState } from "react";
import { IBlogComment, IBlogData } from "@/types/IBlog";
import { ICampaignData } from "@/types/ICampaign";
import { ApiGetCampaignsForUser } from "@/component/api/campaignApi";
import SkeletonList from "@/component/core/SkeletonList";
import PageEmpty from "@/component/core/PageEmpty";
import { ApiGetBlogsForUser } from "@/component/api/blogApi";
import { enqueueSnackbar } from "notistack";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import BlogCommentForm from "@/component/core/BlogCommentForm";
import BlogCommentList from "@/component/core/BlogCommentList";
import { useDispatch } from "react-redux";
import { onSessionValid } from "@/redux/slices/sessionSlice";

function UserBlogs() {
  const authStore = useAppSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState<IBlogData[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<ICampaignData[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(false);
  const [isSessionValid, setIsSessionValid] = useState<boolean>(true);
  const [tempComments, setTempComments] = useState<IBlogComment[]>([]);

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line
  }, []);

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

  const fetchCampaigns = () => {
    setLoadingCampaigns(true);
    ApiGetCampaignsForUser(authStore.token)
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

  const renderBlogs = () => {
    if (loadingBlogs) {
      return <SkeletonList itemcount={1} cardType="type3" />;
    }

    if (!loadingBlogs && blogs.length > 0) {
      return (
        <Box>
          <BlogListCardType2
            item={blogs[0]}
            elevation={0}
            redirectUrl="story"
          />

          <BlogCommentForm
            blogId={blogs[0].id}
            submitWithButtonClick={false}
            submitWithEnterKey={true}
            inputFieldHeight={2}
            onReturnComment={(comments: any[]) => {
              setTempComments(comments);
            }}
          />
        </Box>
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

  const renderCampaigns = () => {
    if (loadingCampaigns) {
      return (
        <Box sx={{ paddingTop: "1rem" }}>
          <SkeletonList itemcount={3} cardType="type2" />
        </Box>
      );
    }

    if (!loadingCampaigns && campaigns.length > 0) {
      return (
        <CampaignList
          variation="pinned"
          data={campaigns}
          startAt={0}
          stopAt={4}
          redirectUrl="campaign"
        />
      );
    }

    if (!loadingCampaigns && campaigns.length < 1) {
      return (
        <PageEmpty
          title="You have no project"
          subtitle={
            <Box>
              Click{" "}
              <Link
                href={`/creator/campaign/create`}
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
            Stories
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
                  displayName: "Stories",
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
          <Link href={`/creator/story/create`}>
            <PurpleButton
              text="Create Story"
              shade="purple"
              size="small"
              startIcon={<Add />}
            />
          </Link>
        </Box>
      </Box>

      <br />

      {/* <Box
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

      <br /> */}

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
                  <Link href="story/all">See All</Link>
                </Typography>
              </Box>
              <Box>{renderBlogs()}</Box>
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
              {renderCampaigns()}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br />
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(UserBlogs);
