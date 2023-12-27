"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import { useAppSelector } from "@/redux/useReduxHooks";
import { Box, Typography } from "@mui/material";

function Stories() {
  const auth = useAppSelector((state) => state.authReducer);
  return (
    <AuthenticatedLayout>
      <Box>Stories</Box>
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

export default ReduxProvider(Stories);
