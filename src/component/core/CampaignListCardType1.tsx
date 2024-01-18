import { IStory } from "@/types/IStory";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  LinearProgress,
  Stack,
  Typography,
  createTheme,
} from "@mui/material";
import { convertToPercentage, formatNumberWithSuffix } from "../common/helpers";
import Link from "next/link";
import PurpleButton from "../common/PurpleButton";
import { ThemeProvider } from "@mui/styles";
import MUIRichTextEditor from "mui-rte";

type props = {
  elevation?: number;
  redirectUrl?: string;
  item: IStory;
};

export default function CampaignListCardType1(props: props) {
  return (
    <Box>
      <Card elevation={props.elevation}>
        <CardMedia
          component="img"
          height="150px"
          image={props.item.coverImage.src}
        />
        <CardContent>
          <Typography
            sx={{
              color: "#A9518B",
              fontWeight: "bold",
              letterSpacing: "-1px",
            }}>
            {props.item.categoryName}
          </Typography>
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
          <br />
          <Box>
            <Stack direction="row" marginBottom="0.3rem">
              <Typography
                component="div"
                sx={{
                  justifyContent: "start",
                  flexGrow: 1,
                  fontSize: "0.7em",
                }}>
                Donation
              </Typography>
              <Typography
                component="div"
                sx={{
                  justifyContent: "end",
                  fontSize: "0.7em",
                }}>
                {convertToPercentage(props.item?.budget, props.item?.revenue)}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={convertToPercentage(
                props.item?.budget,
                props.item?.revenue
              )}
              sx={{
                padding: "0.2rem",
                borderRadius: "5px",
                backgroundColor: "#C7E7DF",
                "&>.MuiLinearProgress-bar": {
                  background: "#A9518B",
                },
              }}
            />
            <Stack direction="row" marginTop="0.3rem">
              <Typography
                component="div"
                sx={{
                  justifyContent: "start",
                  flexGrow: 1,
                  fontSize: "0.7em",
                }}>
                Raised: {props.item?.currency}
                {formatNumberWithSuffix(props.item?.revenue)}
              </Typography>
              <Typography
                component="div"
                sx={{
                  justifyContent: "end",
                  fontSize: "0.7em",
                }}>
                Goal: {props.item?.currency}
                {formatNumberWithSuffix(props.item?.budget)}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
        <CardActions sx={{ padding: "1rem" }}>
          <Link
            href={
              !props?.redirectUrl ? "" : `${props.redirectUrl}/${props.item.id}`
            }>
            <PurpleButton
              text="Donate"
              size="small"
              style={{ width: "150px" }}
              shade="white"
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
