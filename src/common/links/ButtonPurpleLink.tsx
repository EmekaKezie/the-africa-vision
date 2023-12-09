import { makeStyles } from "@mui/styles";
import Link from "next/link";

type props = {
  href: string;
  desc: string;
};

export default function ButtonPurpleLink(props: props) {
  const classes = useStyles();
  return (
    <Link href={props.href} className={classes.root}>
      {props.desc}
    </Link>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    background: "#A8518A",
    color: "#FFFFFF",
    padding: "0.5rem 1rem",
    borderRadius:'5px',
    fontSize:'0.8em'
  },
}));
