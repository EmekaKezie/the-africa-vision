"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import StatsCard from "@/component/core/StatsCard";
import { useAppSelector } from "@/redux/useReduxHooks";
import { AttachMoney, Menu, MoreVert } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { convertToCurrency } from "@/component/common/helpers";
import { useState } from "react";

type apexChartProps = {
  options?: ApexOptions;
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  width?: string | number;
  height?: string | number;
};

function Dashboard() {
  const auth = useAppSelector((state) => state.authReducer);

  const areaChartData: apexChartProps = {
    options: {
      stroke: {
        curve: "smooth",
        width: 1,
      },
      chart: {
        toolbar: {
          show: false,
        },
      },
      legend: {
        position: "top",
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        min: 100,
        max: 1000,
        labels: {
          show: true,
          style: {
            colors: ["#667085"],
          },
          formatter: (val, opts) => {
            return convertToCurrency(val, "NGN");
          },
        },
      },
    },
    series: [
      {
        name: "Revenue",
        data: [100, 300, 300, 200, 400, 600, 500, 700, 700, 800, 900, 1000],
      },
      {
        name: "Sales",
        data: [200, 400, 100, 300, 600, 600, 800, 900, 900, 1000, 1000, 950],
      },
    ],
    width: "100%",
    height: 300,
  };

  const circularGuageChartData: apexChartProps = {
    options: {
      chart: {},
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%",
          },
          dataLabels: {
            show: true,
            //showOn: "always",
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "13px",
            },
            value: {
              color: "#111",
              fontSize: "30px",
              show: true,
            },
          },

          //startAngle:270,
          //endAngle: 150,
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Progress"],
    },
    series: [67],
  };

  const [data1, setData1] = useState<any>();
  const [data2, setData2] = useState<any>();
  

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
              <Chart
                options={circularGuageChartData.options}
                series={circularGuageChartData.series}
                type="radialBar"
              />
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
              <Chart
                options={areaChartData.options}
                series={areaChartData.series}
                height={areaChartData.height}
                width={areaChartData.width}
                type="area"
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Dashboard);
