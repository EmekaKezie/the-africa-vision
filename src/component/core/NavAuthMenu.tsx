import { Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Link from "next/link";

export default function NavAuthMenu() {
  const classes = useStyles();
  return (
    <Stack direction="row">
      <Link href="/login" style={{ display: "block" }}>
        <Typography
          sx={{
            border: "1px solid #A8518A",
            background: "#FFFFFF",
            color: "#A8518A",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            fontSize: "0.85em",
            width: "100px",
            textAlign: "center",
            margin: "0 0.5rem",
            fontWeight: "bolder",
            "&:hover": {
              opacity: 0.75,
            },
          }}>
          Login
        </Typography>
      </Link>
      <Link href="/signup" style={{ display: "block" }}>
        <Typography
          sx={{
            background: "#A8518A",
            color: "#FFFFFF",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            fontSize: "0.85em",
            width: "100px",
            textAlign: "center",
            margin: "0 0.5rem",
            fontWeight: "bolder",
            "&:hover": {
              opacity: 0.8,
            },
          }}>
          Sign Up
        </Typography>
      </Link>
    </Stack>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    "& > a:hover": {
      opacity: 0.75,
    },
  },
}));
