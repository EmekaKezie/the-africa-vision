import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import Banner from "@/assets/banner1.jpg";
import { Search } from "@mui/icons-material";

export default function Hero() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Image
        src={Banner}
        alt="Banner"
        style={{
          width: "100%",
          objectFit: "cover",
          marginTop: "-100px",
        }}
      />
      <Box className={classes.contentBox}>
        <Box>
          <Box
            className={classes.contentTextMax}
            sx={{ display: { xs: "none", md: "block" } }}>
            <Typography
              component="span"
              style={{ marginRight: "10px", color: "#A8518A" }}>
              Crowdfunding
            </Typography>
            <Typography component="span" style={{ marginRight: "10px" }}>
              the future of
            </Typography>

            <Typography component="span" style={{ color: "#A8518A" }}>
              Africa
            </Typography>
          </Box>

          <Box
            className={classes.contentTextMin}
            sx={{ display: { xs: "block", md: "none" } }}>
            <Typography
              component="span"
              style={{ marginRight: "10px", color: "#A8518A" }}>
              Crowdfunding
            </Typography>
            <Typography component="span" style={{ marginRight: "10px" }}>
              the Future
            </Typography>

            <Typography component="span" style={{ color: "#A8518A" }}>
              of Africa
            </Typography>
          </Box>
        </Box>
        <Box sx={{ padding: "1rem" }}>
          <Typography sx={{ color: "#FFFFFF", fontSize: "0.9rem" }}>
            Join Us in Empowering African Innovators
          </Typography>
        </Box>
        <Box sx={{ padding: "1rem" }}>
          <TextField
            placeholder="Search for Crowdfunding Project"
            className={classes.inputBox}
            InputProps={{
              classes: {
                input: classes.inputField,
              },
            }}
          />
          <Button className={classes.btn}>
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  },
  contentBox: {
    // border:"1px solid gray",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    padding: "1rem",
    textAlign: "center",
  },

  contentTextMax: {
    textAlign: "center",
    justifyContent: "center",
    "& span": {
      fontSize: "3rem",
      fontWeight: "bold",
    },
  },

  contentTextMin: {
    marginTop:"-20px",
    textAlign: "center",
    justifyContent: "center",
    "& span": {
      fontSize: "2rem",
      fontWeight: "bold",
    },
  },

  inputBox: {
    width: "50%" 
  },

  inputField: {
    padding: "1rem",
    margin: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    outline: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    color: "#FFFFFF",
  },

  btn: {
    background: "#A8518A",
    padding: "1rem",
    width: "100px",
    textTransform: "none",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    color:"#FFFFFF",
    "&:hover":{
      background: "#A8518A",
      opacity:"0.8"
    }
  },
}));
