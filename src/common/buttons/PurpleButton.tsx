import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

type props = {
  text: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
};

export default function PurpleButton(props: props) {
  const classes = useStyles();
  return (
    <Button
      className={classes.btn}
      startIcon={props.startIcon}
      endIcon={props.endIcon}>
      {props.text}
    </Button>
  );
}

const useStyles = makeStyles(() => ({
  btn: {
    background: "#A8518A",
    padding: "0.8rem",
    width: "150px",
    textTransform: "none",
    color: "#FFFFFF",
    "&:hover": {
      background: "#A8518A",
      opacity: "0.8",
    },
  },
}));
