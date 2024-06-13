import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { convertToPercentage, formatNumberWithSuffix } from "../common/helpers";
import { ICampaignData } from "@/types/ICampaign";

type props = {
  targetAmount: number;
  raisedAmount: number;
  currency: string;
};

export default function CampaignViewContributionProgress(props: props) {
  return (
    <Box>
      <Stack direction="row" marginBottom="0.5rem">
        <Typography flexGrow={1} fontSize="0.7em" color="000000">
          Donation
        </Typography>
        <Typography fontSize="0.7em" color="000000">
          {convertToPercentage(props.targetAmount, props.raisedAmount)}%
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={convertToPercentage(props.targetAmount, props.raisedAmount)}
        sx={{
          padding: "0.2rem",
          borderRadius: "5px",
          backgroundColor: "#C7E7DF",
          "&>.MuiLinearProgress-bar": {
            background: "#A9518B",
          },
        }}
      />
      <Stack direction="row" marginTop="0.5rem">
        <Typography flexGrow={1} fontSize="0.7em" color="000000">
          Raised: {props.currency}
          {formatNumberWithSuffix(props.raisedAmount)}
        </Typography>
        <Typography fontSize="0.7em" color="000000">
          Goal: {props.currency}
          {formatNumberWithSuffix(props.targetAmount)}
        </Typography>
      </Stack>
    </Box>
  );
}
