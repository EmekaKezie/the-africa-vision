import { IActivity } from "@/types/IActivity";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { convertToReadableTime } from "../common/helpers";
type props = {
  item: IActivity;
};

export default function ActivityListCardType1(props: props) {
  return (
    <Box>
      <Card
        elevation={0}
        sx={{ backgroundColor: "#FAFAFA", border: "1px solid #E6E6E6" }}>
        <CardContent>
          <Typography
            sx={{
              color: "#303030",
              fontSize: "0.85em",
              marginBottom: "5px",
            }}>
            {props.item.title}
          </Typography>
          <Typography
            sx={{
              color: "#686868",
              fontSize: "0.65em",
            }}>
            {new Date().toLocaleDateString() ===
            new Date(props.item.endDate!).toLocaleDateString()
              ? "Today"
              : new Date(props.item.endDate!).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
            - {convertToReadableTime(props.item.endDate!)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
