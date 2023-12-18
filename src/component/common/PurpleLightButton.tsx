import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

type sizeTypes = "small" | "medium" | "large";

type props = {
  text: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  size?: sizeTypes;
  style?: any;
  fullWidth?: boolean;
};

export default function PurpleLightButton(props: props) {
  //const classes = useStyles();
  return (
    <Button
      // className={classes.btn}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      size={!props.size ? "large" : props.size}
      style={props.style}
      fullWidth={!props.fullWidth ? false : true}
      sx={{
        border: "1px solid #A8518A",
        padding: "0.8rem",
        textTransform: "none",
        color: "#A8518A",
        //width: !props.fullWidth ? "150px" : "200px",
        "&:hover": {
          background: "#A8518A",
          color: "#FFFFFF",
        },
      }}>
      {props.text}
    </Button>
  );
}

// const useStyles = makeStyles(() => ({
//   btn: {
//     background: "#FFFFFF",
//     border: "1px solid #A8518A",
//     padding: "0.8rem",
//     textTransform: "none",
//     color: "#A8518A",
//     width: "150px",
//     "&:hover": {
//       background: "#A8518A",
//       color: "#FFFFFF",
//     },
//   },
// }));
