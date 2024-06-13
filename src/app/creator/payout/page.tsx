"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import DonationHistoryTable from "@/component/core/DonationHistoryTable";
import PayoutListTable from "@/component/core/PayoutListTable";
import StatsCard from "@/component/core/StatsCard";
import TransactionTable from "@/component/core/TransactionTable";
import { transactionData } from "@/data/transactionData";
import { Add, AttachMoney } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";

function Transaction() {
  return (
    <AuthenticatedLayout>
      <br />
      <Box>
        <Grid container>
          <Grid item lg={6} md={6} sm={5} xs={5}>
            <Box
              sx={{
                height: "100%",
                alignItems: "center",
                display: "flex",
              }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#0F172A",
                  fontSize: "1.5em",
                }}>
                Payment
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={7} xs={7}>
            <Box
              sx={{
                justifyContent: { md: "end" },
                float: "right",
              }}>
              <Link href={`/creator/payout/requestpayout`}>
                <PurpleButton
                  text="Request a payout"
                  shade="purple"
                  size="small"
                  startIcon={<Add />}
                />
              </Link>
            </Box>
          </Grid>
        </Grid>
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
                title: "Total Payment",
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
                title: "Received",
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
                title: "Donated",
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
                title: "Amount Due",
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
              Donation History
            </Typography>
          </Box>
        }
        pageSize={20}
        elevation={1}
      />
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Transaction);
