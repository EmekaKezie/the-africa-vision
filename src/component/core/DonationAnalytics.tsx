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
import {
  convertToCurrencyShort,
  formatNumberWithSuffix,
} from "../common/helpers";
import {
  Favorite,
  HourglassBottom,
  HourglassTop,
  Redo,
} from "@mui/icons-material";
import PurpleButton from "../common/PurpleButton";

export default function DonationAnalytics(props: IStoryAnalytics) {
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
            {convertToCurrencyShort(
              !props?.attanied ? 0 : props?.attanied,
              !props?.currency ? "NGN" : props?.currency
            )}
          </Typography>
        </Box>

        <br />

        <Box>
          <LinearProgress
            variant="determinate"
            value={!props?.percentage ? 0 : props?.percentage}
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
                {convertToCurrencyShort(
                  !props?.goal ? 0 : props?.goal,
                  !props?.currency ? "NGN" : props?.currency
                )}
              </Typography>
            </Box>
            <Box>
              <Typography fontSize="0.7em" color="#667085">
                Remaining
              </Typography>
              <Typography fontSize="0.9em" fontWeight="bold">
                {convertToCurrencyShort(
                  !props?.outstanding ? 0 : props?.outstanding,
                  !props?.currency ? "NGN" : props?.currency
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
            {!props?.countdown ? 30 : props?.countdown} Days left
          </Typography>
        </Stack>

        <br />

        <Stack direction="row">
          <Favorite
            fontSize="small"
            color="error"
            style={{ marginRight: "5px" }}
          />
          <Typography color="#2E4049"  fontSize="0.9em">
            {!props?.countdown ? 30 : props?.contributions} Contributions
          </Typography>
        </Stack>

        <br />

        <Divider />
      </CardContent>

      <CardActions sx={{ padding: "0 1rem 1rem 1rem" }}>
        <PurpleButton
          text="Donate"
          style={{ flexGrow: 1 }}
          endIcon={<Favorite sx={{ color: "#92CD00" }} />}
        />
        <IconButton sx={{ backgroundColor: "#FFE1F5", padding: "0.8rem" }}>
          <Redo />
        </IconButton>
      </CardActions>
    </Card>
  );
}
