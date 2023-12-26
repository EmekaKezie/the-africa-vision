"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import AuthenticatedNavSide from "@/component/core/AuthenticatedNavDrawer";
import { useAppSelector } from "@/redux/useReduxHooks";
import { Box, Typography } from "@mui/material";

function AdminUserOverview() {
  const auth = useAppSelector((state) => state.authReducer);
  return (
    <AuthenticatedLayout>
      <Box>sdsdsdsd</Box>
      {/* <Box
        sx={{
          display: "flex",
        }}>
        <Box
          sx={{
            width: "250px",
          }}>
          <AuthenticatedNavSide />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            border: 1,
            borderColor: "green",
          }}>
          <Box>sdsdsdsds</Box>
        </Box>
      </Box> */}
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(AdminUserOverview);
