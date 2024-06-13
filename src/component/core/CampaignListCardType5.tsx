import {
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { convertToCurrency } from "../common/helpers";
import { ICampaignData } from "@/types/ICampaign";

type props = {
  redirectUrl?: string;
  item: ICampaignData;
};

export default function CampaignListCardType5(props: props) {
  return (
    <ListItem>
      <ListItemIcon>
        <Avatar />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography color={"#111827"} fontSize={"0.9em"}>
            {props.item.title}
          </Typography>
        }
        secondary={
          <Typography color={"#6B7280"} fontSize={"0.7em"}>
            {props.item?.user?.email}
          </Typography>
        }
      />
      <Typography color={"#111827"} fontSize={"0.9em"}>
        {convertToCurrency(
          props.item.target_amount ?? 0,
          props.item.base_currency ?? "NGN"
        )}
      </Typography>
    </ListItem>
  );
}
