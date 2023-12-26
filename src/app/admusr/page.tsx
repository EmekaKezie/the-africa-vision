"use client";
import ReduxProvider from "@/component/common/ReduxProvider";
import { useAppSelector } from "@/redux/useReduxHooks";
import { Box, Typography } from "@mui/material";

function AdminUserOverview() {
  const auth = useAppSelector((state) => state.authReducer);
  return (
    <Box>
      <Typography color="#667085">{auth?.email}</Typography>
    </Box>
  );
}

export default ReduxProvider(AdminUserOverview);
