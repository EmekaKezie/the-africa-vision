import { Box, Typography } from "@mui/material";
import Link from "next/link";

type dataType = {
  displayName: string;
  url?: string;
  isActive?: boolean;
  divider?: string;
};

type props = {
  data: dataType[];
};

export default function BreadCrumb(props: props) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        backgroundColor: "#FFFFFF",
        padding: "0.3rem",
      }}>
      {props.data?.map((item: dataType, index: number) => {
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
            }}>
            <Typography
              sx={{
                fontSize: "0.8em",
                pointerEvents: !item.isActive ? "auto" : "none",
                color: !item.isActive ? "#ADBCD0" : "#120F0F",
                fontWeight: !item.isActive ? "normal" : "bold",
                "&:hover":{
                    color:"#667085"
                }
              }}>
              <Link href={item.url ?? ""}>
                {item.displayName}
              </Link>
            </Typography>
            <Typography color="#0B55FF" padding="0 0.5rem" fontSize= "0.8em">
              {item.divider}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
