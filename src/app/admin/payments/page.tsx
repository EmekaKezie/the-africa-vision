"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import BreadCrumb from "@/component/core/BreadCrumb";
import PayoutListTable from "@/component/core/PayoutListTable";
import StatsCard from "@/component/core/StatsCard";
import { AttachMoney } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";

function PaymentOverview() {
  return (
    <AuthenticatedLayout>
      <br />
      <Box>
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#0F172A",
              fontSize: "1.5em",
            }}>
            Payments
          </Typography>

          <Box>
            <BreadCrumb
              data={[
                {
                  displayName: "Dashboard",
                  url: "dashboard",
                  isActive: false,
                  divider: "/",
                },
                {
                  displayName: "Payments",
                  isActive: true,
                },
              ]}
            />
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
                  title: "Total Inflow",
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
                  title: "Total Outflow",
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
                  title: "Generated Revenue",
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
                  title: "Paymen Due",
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

        <Box>
          <PayoutListTable elevation={1} title="Payout History" />
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(PaymentOverview);
