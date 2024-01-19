"use client";
import ReduxProvider from "@/component/common/ReduxProvider";
import AuthUserBanner from "@/component/core/AuthUserBanner";
import AuthUserSignupEmailVerifier from "@/component/core/AuthUserSignupEmailVerifier";
import AuthUserSignupVerifierSuccess from "@/component/core/AuthUserSignupVerifierSuccess";
import { Box, Grid } from "@mui/material";
import { useState } from "react";

function VerifyEmail() {
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const renderContent = () => {
    if (isVerified) {
      return <AuthUserSignupVerifierSuccess />;
    }

    return (
      <AuthUserSignupEmailVerifier
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

export default ReduxProvider(VerifyEmail);
