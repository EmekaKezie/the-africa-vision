import { Box, Button, Typography } from "@mui/material";
import nodata from "@/assets/nodata.jpg";
import Image from "next/image";
import { ReactNode } from "react";
import Link from "next/link";

type props = {
  image?: any;
  title?: ReactNode | string;
  subtitle?: ReactNode | string;
  redirect?: {
    url: string;
    text: string;
  };
};
export default function PageEmpty(props: props) {
  const renderImage = () => {
    if (!props.image) {
      return (
        <Box>
          <Image src={nodata} alt="nodata" height={100} />
        </Box>
      );
    }
  };

  const renderTitle = () => {
    return (
      <Box>
        <Typography
          component="div"
          variant="body1"
          sx={{
            color: "#7B7D8C",
            fontSize: "1.1em",
            fontWeight: "bold",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}>
          {!props.title ? "No Data" : props.title}
        </Typography>
      </Box>
    );
  };

  const renderSubTitle = () => {
    return (
      <Box>
        <Typography
          component="div"
          variant="body1"
          sx={{
            color: "#7B7D8C",
            fontSize: "0.9em",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}>
          {props.subtitle}
        </Typography>
      </Box>
    );
  };

  const renderRedirect = () => {
    return (
      <Box>
        <Link href={props.redirect?.url ?? ""}>
          <Button
            sx={{
              textTransform: "none",
              "&:hover": { opacity: 0.8 },
            }}>
            {props.redirect?.text}
          </Button>
        </Link>
      </Box>
    );
  };
  return (
    <Box sx={{ textAlign: "center", padding: "1rem" }}>
      {renderImage()}
      {renderTitle()}
      {renderSubTitle()}
      <br/>
      {renderRedirect()}
    </Box>
  );
}
