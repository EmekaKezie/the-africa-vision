"use client";
import ReduxProvider from "@/component/common/ReduxProvider";
import { onLogout } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/useReduxHooks";
import { IAuthStore } from "@/types/IAuth";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Logout() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(onLogout());
    router.push("login");
  };
  handleLogout();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          Logging out . . .
        </Typography>
      </Box>
    </Box>
  );
}

export default ReduxProvider(Logout);
