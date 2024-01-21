import { IStory } from "@/types/IStory";
import {
  Box,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { convertToCurrency } from "../common/helpers";

type props = {
  redirectUrl?: string;
  item: IStory;
};

export default function CampaignListCardType4(props: props) {
  return (
    <Box>
      <ListItem sx={{ padding: "0" }}>
        <ListItemText
          primary={
            <Typography color={"#111827"} fontSize={"0.9em"}>
              {props.item.title}
            </Typography>
          }
          secondary={
            <Typography color={"#6B7280"} fontSize={"0.6em"} fontWeight={"700"}>
              {props.item.categoryName}
            </Typography>
          }
        />
        <Typography textAlign={"right"} color={"#111827"} fontSize={"0.9em"}>
          {convertToCurrency(
            props.item.budget ?? 0,
            props.item.currency ?? "NGN"
          )}
        </Typography>
      </ListItem>
      <Divider />
    </Box>
  );
}
