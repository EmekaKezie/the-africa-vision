"use client";
import ReduxProvider from "@/component/common/ReduxProvider";
import { Box, Grid } from "@mui/material";

import AuthUserLogin from "@/component/core/AuthUserLogin";
import AuthUserBanner from "@/component/core/AuthUserBanner";

function Login() {
  return (
    <Box>
      <Grid container>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AuthUserLogin />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AuthUserBanner />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReduxProvider(Login);
