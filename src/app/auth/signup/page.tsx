"use client";
import ReduxProvider from "@/component/common/ReduxProvider";
import AuthBanner from "@/component/core/AuthUserBanner";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/tavlogo.png";
import AuthUserSignup from "@/component/core/AuthUserSignup";

function Signup() {
  return (
    <Box>
      <Grid container>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AuthUserSignup />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AuthBanner />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReduxProvider(Signup);
