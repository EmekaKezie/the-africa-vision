import { Box, CircularProgress, Typography } from "@mui/material";
import { ReactNode } from "react";

type props = {
  message?: ReactNode | string;
  pageHeight?: number;
};

export default function LoadingPage(props: props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: !props.pageHeight ? "100vh" : `${props.pageHeight}vh`,
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
          {!props.message ? "Loading . . ." : props.message}
        </Typography>
      </Box>
    </Box>
  );
}
