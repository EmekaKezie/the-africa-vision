import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  convertToCurrency,
  convertToPercentage,
  convertToReadableDate,
  getCurrentDate,
  getDateDifference,
} from "../common/helpers";
import { CalendarMonth, Favorite, HourglassBottom } from "@mui/icons-material";
import Link from "next/link";
import PurpleButton from "../common/PurpleButton";

type props = {
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  startDate: string;
  endDate: string;
  contributors: number;
  hasActionButton: boolean;
  redirectUrl?: string;
  buttonText?: string;
};

export default function CampaignViewContributionAnalytics(props: props) {
  const renderOutstandingAmount = (
    targetAmount: number,
    raisedAmount: number,
    currency: string
  ) => {
    const result = targetAmount - raisedAmount;
    const outstanding = convertToCurrency(result, currency);
    return outstanding;
  };

  const renderCountdown = (startDate: string, endDate: string) => {
    const countdown = getDateDifference(
      getCurrentDate(),
      startDate
    ).diffInDays.toFixed(0);

    if (Number(countdown) === 0) {
      return "Today";
    } else if (Number(countdown) > 0) {
      return `${countdown} Days left`;
    } else {
      return `Concluded on ${convertToReadableDate(endDate)}`;
    }
  };

  return (
    <Box>
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
              {convertToCurrency(props.raisedAmount, props.currency)}
            </Typography>
          </Box>

          <br />

          <Box>
            <LinearProgress
              variant="determinate"
              value={convertToPercentage(
                props.targetAmount,
                props.raisedAmount
              )}
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
                  {convertToCurrency(props.targetAmount, props.currency)}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="0.7em" color="#667085">
                  Remaining
                </Typography>
                <Typography fontSize="0.9em" fontWeight="bold">
                  {renderOutstandingAmount(
                    props.targetAmount,
                    props.raisedAmount,
                    props.currency
                  )}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <br />

          <Stack direction="row">
            <CalendarMonth
              fontSize="small"
              color="info"
              style={{ marginRight: "5px" }}
            />
            <Typography color="#2E4049" fontSize="0.9em">
              From {convertToReadableDate(props.startDate)} to{" "}
              {convertToReadableDate(props.endDate)}
            </Typography>
          </Stack>

          <br />

          <Stack direction="row">
            <HourglassBottom
              fontSize="small"
              color="info"
              style={{ marginRight: "5px" }}
            />
            <Typography color="#2E4049" fontSize="0.9em">
              {renderCountdown(props.startDate, props.endDate)}
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
              {props.contributors} Contributions
            </Typography>
          </Stack>
        </CardContent>

        {props.hasActionButton && (
          <>
            <Box padding={"1rem"}>
              <Divider />
            </Box>

            <CardActions sx={{ padding: "0 1rem 1rem 1rem" }}>
              <Link
                href={props.redirectUrl ?? ""}
                style={{ flexGrow: 1, display: "block", marginRight: "2px" }}>
                <PurpleButton
                  text={props.buttonText ?? "See More"}
                  fullWidth
                  endIcon={<Favorite sx={{ color: "#92CD00" }} />}
                />
              </Link>
              {/* <IconButton sx={{ backgroundColor: "#FFE1F5", padding: "0.8rem" }}>
              <Redo />
            </IconButton> */}
            </CardActions>
          </>
        )}
      </Card>
    </Box>
  );
}
