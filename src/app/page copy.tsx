"use client";

import React, { useEffect } from "react";
import ReduxProvider from "@/component/common/ReduxProvider";
import { useAppSelector } from "@/redux/useReduxHooks";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { RoleTypes } from "@/types/IAppbaseTypes";

function AppLanding() {
  const router = useRouter();
  const authStore = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    checkAuthStorage(authStore.role, authStore.isLoggedIn);
    // eslint-disable-next-line
  }, [authStore.role, authStore.isLoggedIn]);

  const checkAuthStorage = (role: string, isLoggedIn: boolean) => {
    if (!isLoggedIn) {
      router.push("home");
    } else {
      if (role.toUpperCase() === RoleTypes.user.toUpperCase()) {
        router.push("creator/dashboard");
      } else if (role.toUpperCase() === RoleTypes.admin.toUpperCase()) {
        router.push("admin/dashboard");
      } else {
        router.push("explore/home");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress
          sx={{
            color: "#A8518A",
          }}
        />
        <Typography
          sx={{
            color: "#667085",
          }}>
          Loading . . .
        </Typography>
      </Box>
    </Box>
  );
}

export default ReduxProvider(AppLanding);
