import { Button, CircularProgress, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

type sizeTypes = "small" | "medium" | "large";
type actionTypes = "submit" | "button";

type props = {
  text: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  size?: sizeTypes;
  style?: any;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: actionTypes;
  disabled?: boolean;
  loading?: boolean;
};

export default function PurpleButton(props: props) {
  const classes = useStyles();
  return (
    <Button
      startIcon={props.startIcon}
      endIcon={
        props.loading ? (
          <CircularProgress size={20} sx={{ color: "lightgray" }} />
        ) : (
          props.endIcon
        )
      }
      size={!props.size ? "large" : props.size}
      style={props.style}
      fullWidth={!props.fullWidth ? false : true}
      onClick={props.onClick}
      type={!props.type ? "submit" : props.type}
      disabled={!props.disabled ? props.loading : props.disabled}
      sx={{
        padding: "0.8rem",
        textTransform: "none",
        color: "#FFFFFF",
        backgroundColor: "#A8518A",
        "&:hover": {
          border: "1px solid #A8518A",
          background: "#FFFFFF",
          color: "#A8518A",
        },
      }}>
      {props.text}
    </Button>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#A8518A",
    },
  },
});

const useStyles = makeStyles(() => ({
  btn: {
    // background: "#A8518A",
    // padding: "0.8rem",
    // textTransform: "none",
    // color: "#FFFFFF",
    // width: "150px",
    "&:hover": {
      //border: "1px solid #A8518A",
      //background: "#FFFFFF",
      //color: "#A8518A",
      opacity: "0.8",
    },
  },
}));
