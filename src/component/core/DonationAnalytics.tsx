import { IStoryAnalytics } from "@/types/IStory";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { convertToCurrency } from "../common/helpers";
import { Favorite, HourglassBottom, Redo } from "@mui/icons-material";
import PurpleButton from "../common/PurpleButton";
import Link from "next/link";

type props = {
  data: IStoryAnalytics;
  url: string;
};

export default function DonationAnalytics(props: props) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Box>
          <Typography fontSize="0.7em" color="#667085">
            Collected
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5em",
              color: "#2E4049",
              fontWeight: "bold",
            }}>
            {convertToCurrency(
              !props?.data?.attanied ? 0 : props?.data?.attanied,
              !props?.data?.currency ? "NGN" : props?.data?.currency
            )}
          </Typography>
        </Box>

        <br />

        <Box>
          <LinearProgress
            variant="determinate"
            value={!props?.data?.percentage ? 0 : props?.data?.percentage}
            sx={{
              padding: "0.2rem",
              borderRadius: "5px",
              backgroundColor: "#C7E7DF",
              "&>.MuiLinearProgress-bar": {
                background: "#92CD00",
              },
            }}
          />
          <Stack direction="row" marginTop="0.5rem">
            <Box flexGrow={1}>
              <Typography fontSize="0.7em" color="#667085">
                Goal
              </Typography>
              <Typography flexGrow={1} fontSize="0.9em" fontWeight="bold">
                {convertToCurrency(
                  !props?.data?.goal ? 0 : props?.data?.goal,
                  !props?.data?.currency ? "NGN" : props?.data?.currency
                )}
              </Typography>
            </Box>
            <Box>
              <Typography fontSize="0.7em" color="#667085">
                Remaining
              </Typography>
              <Typography fontSize="0.9em" fontWeight="bold">
                {convertToCurrency(
                  !props?.data?.outstanding ? 0 : props?.data?.outstanding,
                  !props?.data?.currency ? "NGN" : props?.data?.currency
                )}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <br />

        <Stack direction="row">
          <HourglassBottom
            fontSize="small"
            color="info"
            style={{ marginRight: "5px" }}
          />
          <Typography color="#2E4049" fontSize="0.9em">
            {!props?.data?.countdown ? 30 : props?.data?.countdown} Days left
          </Typography>
        </Stack>

        <br />

        <Stack direction="row">
          <Favorite
            fontSize="small"
            color="error"
            style={{ marginRight: "5px" }}
          />
          <Typography color="#2E4049" fontSize="0.9em">
            {!props?.data?.countdown ? 30 : props?.data?.contributions}{" "}
            Contributions
          </Typography>
        </Stack>

        <br />

        <Divider />
      </CardContent>

      <CardActions sx={{ padding: "0 1rem 1rem 1rem" }}>
        <Link href={props.url} style={{ flexGrow: 1, display:"block", marginRight:"2px" }}>
          <PurpleButton
            text="Donate"
            fullWidth
            endIcon={<Favorite sx={{ color: "#92CD00" }} />}
          />
        </Link>
        <IconButton sx={{ backgroundColor: "#FFE1F5", padding: "0.8rem" }}>
          <Redo />
        </IconButton>
      </CardActions>
    </Card>
  );
}
