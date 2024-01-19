"use client";
import ReduxProvider from "@/component/common/ReduxProvider";
import AuthUserBanner from "@/component/core/AuthUserBanner";
import AuthUserPasswordForgotEmailVerifier from "@/component/core/AuthUserPasswordForgotEmailVerifier";
import AuthUserPasswordReset from "@/component/core/AuthUserPasswordReset";
import { Box, Grid } from "@mui/material";
import { useState } from "react";

function ForgotReset() {
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const renderContent = () => {
    if (isVerified) {
      return <AuthUserPasswordReset />;
    }

    return (
      <AuthUserPasswordForgotEmailVerifier
        onVerify={(value: boolean) => {
          setIsVerified(value);
        }}
      />
    );
  };
  return (
    <Box>
      <Grid container>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AuthUserBanner />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          {renderContent()}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReduxProvider(ForgotReset);
