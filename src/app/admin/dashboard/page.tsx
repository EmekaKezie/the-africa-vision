"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import StatsCard from "@/component/core/StatsCard";
import { useAppSelector } from "@/redux/useReduxHooks";
import { ArrowUpward, AttachMoney, MoreVert } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { convertToCurrency } from "@/component/common/helpers";
import { useState } from "react";
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
import { storyData } from "@/data/storyData";
import TransactionTable from "@/component/core/TransactionTable";
import { transactionData } from "@/data/transactionData";
import CreatorPayoutList from "@/component/core/CreatorPayoutList";
import { userData } from "@/data/userData";
import { creatorMockData } from "@/data/creatorMockData";

function Dashboard() {
  const auth = useAppSelector((state) => state.authReducer);

  return (
    <AuthenticatedLayout>
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

      <br />

      <Box>
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

      <br />

      <Box>
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
              <Box>
                <CampaignList data={storyData} variation="docked" />
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
                  Pending Creator Payouts
                </Typography>
              </Box>
              <br />
              <Box>
                <CreatorPayoutList data={creatorMockData} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br />

      <Box>
        <TransactionTable data={transactionData} />
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Dashboard);
