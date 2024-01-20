import { payoutSummaryData } from "@/data/transactionData";
import { IPayoutSummary } from "@/types/ITransaction";
import { Box, Typography } from "@mui/material";
import { convertToCurrency } from "../common/helpers";

type props = {
  data: IPayoutSummary[];
};

export default function PayoutSummary(props: props) {
  return (
    <Box>
      {props.data?.map((item: IPayoutSummary, index: number) => {
        const isLastItem = props.data.length - 1 == index;

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              padding: "0.5em 0",
              color: "#484C56",
            }}>
            <Box sx={{ width: "70%" }}>
              <Typography
                sx={{
                  fontSize: "0.9em",
                  fontWeight: isLastItem ? "bold" : "normal",
                }}>
                {item.description}
              </Typography>
            </Box>
            <Box sx={{ width: "30%", textAlign: "right" }}>
              <Typography
                sx={{
                  fontSize: "0.9em",
                  fontWeight: "bold",
                }}>
                {!item.amount
                  ? "-"
                  : convertToCurrency(item.amount, item.currencyCode ?? "NGN")}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
