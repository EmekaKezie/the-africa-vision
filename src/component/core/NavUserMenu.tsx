import { Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Link from "next/link";

export default function NavUserMenu() {
  const classes = useStyles();
  return (
    <Stack direction="row">
      <Link href="/auth/login" style={{ display: "block" }}>
        <Typography
          sx={{
            border: "1px solid #A8518A",
            background: "#FFFFFF",
            color: "#A8518A",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            fontSize: "1em",
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
      <Link href="/auth/signup" style={{ display: "block" }}>
        <Typography
          sx={{
            background: "#A8518A",
            color: "#FFFFFF",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            fontSize: "1em",
            // width: "100px",
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
