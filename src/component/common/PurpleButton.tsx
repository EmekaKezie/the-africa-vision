import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

type sizeTypes = "small" | "medium" | "large";

type props = {
  text: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  size?: sizeTypes;
};

export default function PurpleButton(props: props) {
  const classes = useStyles();
  return (
    <Button
      className={classes.btn}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      size={!props.size ? "large" : props.size}
      style={{}}>
      {props.text}
    </Button>
  );
}

const useStyles = makeStyles(() => ({
  btn: {
    background: "#A8518A",
    padding: "0.8rem",
    textTransform: "none",
    color: "#FFFFFF",
    width: "150px",
    "&:hover": {
      border: "1px solid #A8518A",
      background:"#FFFFFF",
      color:"#A8518A"
      //opacity: "0.8",
    },
  },
}));
