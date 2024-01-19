"use client"
import ReduxProvider from "@/component/common/ReduxProvider";
import AuthUserBanner from "@/component/core/AuthUserBanner";
import AuthUserPasswordForgot from "@/component/core/AuthUserPasswordForgot";
import { Box, Grid } from "@mui/material";

function ForgotPassword() {
  return (
    <Box>
      <Grid container>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AuthUserBanner />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AuthUserPasswordForgot />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReduxProvider(ForgotPassword)
