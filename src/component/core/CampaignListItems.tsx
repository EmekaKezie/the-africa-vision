import { ICampaignData } from "@/types/ICampaign";
import {
  Box,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { getDateDifference } from "../common/helpers";

type props = {
  title?: string | ReactNode;
  elevation?: number;
  startAt?: number;
  stopAt?: number;
  redirectUrl?: string;
  data: ICampaignData[];
  onActionClick?: (item: ICampaignData, url: string, action: string) => void;
};

export default function CampaignListItems(props: props) {
  return (
    <Box>
      {/* <List> */}
      {props.data?.map((item: ICampaignData) => (
        <ListItem
          button
          key={item.id}
          onClick={() => {
            if (props.onActionClick) props.onActionClick(item, "", "");
          }}>
          <ListItemIcon sx={{ marginRight: "10px" }}>
            <CardMedia
              component="img"
              //height="50px"
              image={item.image}
              sx={{
                objectFit: "cover",
                borderRadius: "50px",
                height: "50px",
                width: "50px",
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            secondary={
              <Typography
                sx={{
                  fontSize: "0.7em",
                  color: "#94A3B8",
                }}>
                {item?.email} •{" "}
                {getDateDifference(
                  item?.created_at!,
                  new Date().toDateString()
                ).diffInDays.toFixed(0)}{" "}
                days ago
              </Typography>
            }
          />
        </ListItem>
      ))}
      {/* </List> */}
    </Box>
  );
}
