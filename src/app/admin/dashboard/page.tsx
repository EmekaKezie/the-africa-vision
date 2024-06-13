"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import StatsCard from "@/component/core/StatsCard";
import { useAppSelector } from "@/redux/useReduxHooks";
import { ArrowUpward, AttachMoney, MoreVert } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { convertToCurrency } from "@/component/common/helpers";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GraphRevenueOutflow from "@/component/core/GraphRevenueOutflow";
import {
  activeVisitorsData,
  graphConversionRateData,
  graphRevenueOutflowData,
} from "@/data/graphData";
import GraphActiveVisitors from "@/component/core/GraphActiveVisitors";
import GraphConversionRate from "@/component/core/GraphConversionRate";
import CampaignList from "@/component/core/CampaignList";
import TransactionTable from "@/component/core/TransactionTable";
import { transactionData } from "@/data/transactionData";
import PayoutListView from "@/component/core/PayoutListView";
import { creatorMockData } from "@/data/creatorMockData";
import { ICampaignData } from "@/types/ICampaign";
import { ApiGetCampaignsForAdmin } from "@/component/api/campaignApi";
import { enqueueSnackbar } from "notistack";
import PageEmpty from "@/component/core/PageEmpty";
import SkeletonList from "@/component/core/SkeletonList";
import Link from "next/link";
import DonationHistoryTable from "@/component/core/DonationHistoryTable";

function Dashboard() {
  const authStore = useAppSelector((state) => state.authReducer);

  const [campaigns, setCampaigns] = useState<ICampaignData[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(false);

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line
  }, []);

  const fetchCampaigns = () => {
    setLoadingCampaigns(true);
    ApiGetCampaignsForAdmin(authStore.token)
      .then((response) => {
        const campaignData = response?.data?.campaigns;
        setCampaigns(campaignData);
        setLoadingCampaigns(false);
      })
      .catch((error: any) => {
        setLoadingCampaigns(false);
        enqueueSnackbar("Error fetching top projects", {
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
        <Box sx={{ paddingTop: "1rem" }}>
          <SkeletonList itemcount={3} cardType="type2" />
        </Box>
      );
    }

    if (!loadingCampaigns && campaigns?.length > 0) {
      return (
        <CampaignList
          variation="docked"
          data={campaigns}
          startAt={0}
          stopAt={4}
        />
      );
    }

    if (!loadingCampaigns && campaigns?.length < 1) {
      return <PageEmpty title="there are not projects yet" />;
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

      {/* <Box>
        <Grid container spacing={2}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#FFFFFF",
                height: "100%",
                boxShadow: "1px 1px 5px lightgray",
                borderRadius: "5px",
              }}>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1} padding="0.5rem 1rem 0 1rem">
                  <Typography
                    sx={{
                      flexGrow: 1,
                      color: "#333843",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}>
                    Revenue Progress
                  </Typography>
                  <Typography
                    sx={{
                      flexGrow: 1,
                      color: "#667085",
                      fontSize: "0.8em",
                    }}>
                    This Quarter
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
              </Box>
              <Box></Box>
            </Box>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#FFFFFF",
                height: "100%",
                boxShadow: "1px 1px 5px lightgray",
                borderRadius: "5px",
              }}>
              <GraphRevenueOutflow data={graphRevenueOutflowData} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br /> */}

      {/* <Box>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#FFFFFF",
                height: "100%",
                boxShadow: "1px 1px 5px lightgray",
                borderRadius: "5px",
              }}>
              <GraphActiveVisitors
                height={150}
                color="#413ea0"
                data={activeVisitorsData}
              />
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#FFFFFF",
                height: "100%",
                boxShadow: "1px 1px 5px lightgray",
                borderRadius: "5px",
              }}>
              <GraphConversionRate
                height={150}
                color="#FFD599"
                data={graphConversionRateData}
              />
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#FFFFFF",
                height: "100%",
                boxShadow: "1px 1px 5px lightgray",
                borderRadius: "5px",
              }}>
              <GraphActiveVisitors
                height={150}
                color="#413ea0"
                data={activeVisitorsData}
              />
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#FFFFFF",
                height: "100%",
                boxShadow: "1px 1px 5px lightgray",
                borderRadius: "5px",
              }}>
              <GraphConversionRate
                height={150}
                color="#FFD599"
                data={graphConversionRateData}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br /> */}

      <Box>
        <Grid container spacing={2}>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#FFFFFF",
                height: "100%",
                boxShadow: "1px 1px 5px lightgray",
                borderRadius: "5px",
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
              <br />
              <Box>{renderCampaigns()}</Box>
            </Box>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#FFFFFF",
                height: "100%",
                boxShadow: "1px 1px 5px lightgray",
                borderRadius: "5px",
              }}>
              <Box display="flex" alignItems="center">
                <Typography
                  sx={{
                    flexGrow: 1,
                    color: "#120F0F",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                  }}>
                  Pending Payouts
                </Typography>
                <Typography sx={{ color: "#2F840B", fontSize: "0.7em" }}>
                  <Link href="payments">See all</Link>
                </Typography>
              </Box>
              <br />
              <Box>
                <PayoutListView />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br />

      
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Dashboard);
