"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import StatsCard from "@/component/core/StatsCard";
import CampaignList from "@/component/core/CampaignList";
import { Add, AttachMoney } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography, duration } from "@mui/material";
import Link from "next/link";
import BreadCrumb from "@/component/core/BreadCrumb";
import { useAppSelector } from "@/redux/useReduxHooks";
import { ApiGetCampaignsForUser } from "@/component/api/campaignApi";
import { useEffect, useState } from "react";
import { ICampaignData } from "@/types/ICampaign";
import SkeletonList from "@/component/core/SkeletonList";
import PageEmpty from "@/component/core/PageEmpty";
import { getCurrentDate, getDateDifference } from "@/component/common/helpers";
import { enqueueSnackbar } from "notistack";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import ExpiredSessionModal from "@/component/common/ExpiredSessionModal";
import { useRouter } from "next/navigation";

function UserCampaigns() {
  const router = useRouter();
  const storeAuth = useAppSelector((state) => state.authReducer);

  const [campaigns, setCampaigns] = useState<ICampaignData[]>([]);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState<ICampaignData[]>(
    []
  );
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(false);
  const [isSessionValid, setIsSessionValid] = useState<boolean>(true);

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line
  }, []);

  const fetchCampaigns = () => {
    setLoadingCampaigns(true);
    ApiGetCampaignsForUser(storeAuth.token)
      .then((response: IResponse<any>) => {
        setLoadingCampaigns(false);
        if (response.status === ResponseEnum.success) {
          const campaignData = response?.data?.campaigns;

          const modifiedCampaign = campaignData.map((item: ICampaignData) => ({
            ...item,
            today: getCurrentDate(),
          }));

          //get top project: formular => campaign date is in the futer
          const upcomingCampaigns = modifiedCampaign.filter(
            (x: any) =>
              Number(
                getDateDifference(x.today, x.start_date).diffInDays.toFixed(0)
              ) > 0
          );

          setUpcomingCampaigns(upcomingCampaigns);
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

  const renderCampaignCards = () => {
    if (loadingCampaigns) {
      return <SkeletonList itemcount={3} cardType="type1" />;
    }
    if (!loadingCampaigns && upcomingCampaigns.length > 0) {
      return (
        <CampaignList
          swipeButtons={false}
          variation="swipeable"
          data={upcomingCampaigns}
          redirectUrl="campaign"
        />
      );
    }
    if (!loadingCampaigns && upcomingCampaigns.length < 1) {
      return (
        <PageEmpty
          title="You have no new project"
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

  const handleOnClickCampaignActions = (
    item: ICampaignData,
    url: string,
    action: string
  ) => {
    if (action === "view") {
      router.push(`${url}/${item.id}`);
    }
  };

  const renderCampaignTable = () => {
    if (loadingCampaigns) {
      return (
        <Box sx={{ padding: "1rem" }}>
          <SkeletonList itemcount={3} cardType="type2" />
        </Box>
      );
    }
    if (!loadingCampaigns && campaigns.length > 0) {
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
          redirectUrl="campaign"
          onActionClick={(item: ICampaignData, url, action) => {
            handleOnClickCampaignActions(item, url, action);
          }}
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

      <br /> */}

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
        {renderCampaignCards()}
      </Box>

      <br />

      <Box
        sx={{
          //padding: "0.5rem",
          backgroundColor: "#FFFFFF",
          height: "100%",
          boxShadow: "1px 1px 5px lightgray",
        }}>
        {renderCampaignTable()}
      </Box>

      {!loadingCampaigns && !isSessionValid && <ExpiredSessionModal />}
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(UserCampaigns);
