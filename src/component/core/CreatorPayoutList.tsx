import { IUser } from "@/types/IUser";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { convertToCurrency } from "../common/helpers";

type props = {
  data: IUser[];
};

export default function CreatorPayoutList(props: props) {
  return (
    <Box>
      {props.data?.map((item: IUser) => {
        return (
          <Box key={item.id}>
            <ListItem>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography color={"#111827"} fontSize={"0.9em"}>
                    {item.fullname}
                  </Typography>
                }
                secondary={
                  <Typography color={"#6B7280"} fontSize={"0.7em"}>
                    {item.email}
                  </Typography>
                }
              />
              <Typography color={"#111827"}  fontSize={"0.9em"}>
                {convertToCurrency(
                  item.totalPayout ?? 0,
                  item.currencyCode ?? "NGN"
                )}
              </Typography>
            </ListItem>
          </Box>
        );
      })}
    </Box>
  );
}
