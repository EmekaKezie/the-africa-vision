"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import StatsCard from "@/component/core/StatsCard";
import { useAppSelector } from "@/redux/useReduxHooks";
import { AttachMoney, Menu, MoreVert } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { convertToCurrency } from "@/component/common/helpers";
import { useState } from "react";



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
            <Paper elevation={1} sx={{ padding: "1rem", height: "100%" }}>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1} padding="0.5rem 1rem 0 1rem">
                  <Typography
                    sx={{
                      flexGrow: 1,
                      color: "#333843",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}>
                    Sales Progress
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
              
            </Paper>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Paper elevation={1} sx={{ padding: "1rem", height: "100%" }}>
              <Box display="flex" alignItems="center">
                <Box flexGrow={1} padding="0.5rem 1rem 0 1rem">
                  <Typography
                    sx={{
                      flexGrow: 1,
                      color: "#333843",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}>
                    Statistics
                  </Typography>
                  <Typography
                    sx={{
                      flexGrow: 1,
                      color: "#667085",
                      fontSize: "0.8em",
                    }}>
                    Revenue and Sales
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
              </Box>
             
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Dashboard);
