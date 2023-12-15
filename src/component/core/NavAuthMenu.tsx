import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Link from "next/link";

export default function NavAuthMenu() {
  const classes = useStyles();
  return (
    <Box
      className={classes.container}
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "end",
      }}>
      <Link
        href="/login"
        style={{
          border: "2px solid #2F840B",
          background: "#FFFFFF",
          color: "#A8518A",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          fontSize: "0.85em",
          width: "100px",
          textAlign: "center",
          margin: "0 0.5rem",
          fontWeight: "bolder",
        }}>
        Login
      </Link>
      <Link
        href="/signup"
        style={{
          background: "#A8518A",
          color: "#FFFFFF",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          fontSize: "0.85em",
          width: "100px",
          textAlign: "center",
          margin: "0 0.5rem",
          fontWeight: "bolder",
        }}>
        Sign Up
      </Link>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    "& > a:hover": {
      opacity: 0.75,
    },
  },
}));
