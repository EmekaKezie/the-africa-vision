import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Icon,
  Typography,
  createTheme,
} from "@mui/material";
import { convertToReadableDate } from "../common/helpers";
import { ICampaignData } from "@/types/ICampaign";
import { ThemeProvider } from "@mui/styles";
import MUIRichTextEditor from "mui-rte";
import { TurnedInNot } from "@mui/icons-material";
import Link from "next/link";
import PurpleLightButton from "../common/PurpleLightButton";

type props = {
  elevation?: number;
  redirectUrl?: string;
  item: ICampaignData;
  buttonText?: string;
};

export default function CampaignListCardType4(props: props) {
  return (
    <Box>
      <Card elevation={props.elevation}>
        <Link
          href={
            !props?.redirectUrl ? "" : `${props.redirectUrl}/${props.item.id}`
          }>
          <CardMedia component="img" height="150px" image={props.item.image} />
        </Link>
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Typography
              style={{
                flexGrow: 1,
                color: "#999CA9",
                fontSize: "0.8em",
                lineHeight: "16px",
              }}>
              {props?.item.start_date! &&
                convertToReadableDate(props?.item.start_date!)}
            </Typography>
            <Typography
              sx={{
                textOverflow: "ellipsis",
                color: "#A8518A",
                fontSize: "0.8em",
                lineHeight: "16px",
              }}>
              {props?.item?.contributors} donations
            </Typography>
          </Box>
          <br />

          <Typography
            component="div"
            variant="body1"
            sx={{
              color: "#0F111D",
              fontSize: "1.1em",
              fontWeight: "bold",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}>
            {props.item.title}
          </Typography>
          <br />
          {/* <Typography
            component="div"
            variant="body2"
            sx={{
              color: "#7B7D8C",
              fontSize: "0.9em",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}>
            {props.item.content}
          </Typography> */}
          <Typography
            component="div"
            variant="body2"
            sx={{
              color: "#7B7D8C",
              fontSize: "0.9em",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}>
            <ThemeProvider theme={myTheme}>
              <MUIRichTextEditor
                defaultValue={!props.item.content ? "" : props.item.content}
                readOnly
                controls={[]}
              />
            </ThemeProvider>
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: "1rem" }}>
          <Icon
            sx={{
              border: "1px solid #A8518A",
              padding: "1.6rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "5px",
              borderRadius: "5px",
            }}>
            <TurnedInNot sx={{ color: "#A8518A" }} />
          </Icon>
          <Link
            href={
              !props?.redirectUrl ? "" : `${props.redirectUrl}/${props.item.id}`
            }
            style={{ width: "100%" }}>
            <PurpleLightButton
              text={props.buttonText ?? "See More..."}
              style={{ flexGrow: 1, width: "100%" }}
            />
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}

const myTheme = createTheme({
  // Set up your custom MUI theme here
});
