import { Box, Grid, IconButton } from "@mui/material";
import StatsCard from "./StatsCard";
import { BarChart } from "@mui/icons-material";

export default function CreatorStatCards() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <StatsCard
            type="type1"
            data={{
              label: "+10%",
              currency: "NGN",
              title: "Total Earning",
              amount: 1224600,
              icon: (
                <IconButton sx={{ backgroundColor: "#D4E3FF" }}>
                  <BarChart sx={{ color: "#2773FF" }} />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <StatsCard
            type="type1"
            data={{
              label: "+10%",
              currency: "NGN",
              title: "Total Payout",
              amount: 1224600,
              icon: (
                <IconButton sx={{ backgroundColor: "#D4E3FF" }}>
                  <BarChart sx={{ color: "#2773FF" }} />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={12}>
          <StatsCard
            type="type1"
            data={{
              label: "+10%",
              currency: "NGN",
              title: "Total Outstanding",
              amount: 1224600,
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
  );
}
