import {
  Box,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { convertToCurrencyShort } from "../common/helpers";

type typeProps = "type1" | "type2";

type dataProps = {
  icon: ReactNode;
  title: string;
  amount: number;
  currency: string;
  label: string;
};

type props = {
  type: typeProps;
  data: dataProps;
};

export default function StatsCard(props: props) {
  const renderType1 = () => {
    return (
      <Card>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
          }}>
          <Box flexGrow={1}>
            <Typography sx={{ color: "#728095", fontSize: "0.8em" }}>
              {props.data.title.toUpperCase()}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                sx={{
                  color: "#0F2744",
                  fontSize: "1.1em",
                  fontWeight: "bold",
                }}>
                {convertToCurrencyShort(props.data.amount, props.data.currency)}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.7em",
                  backgroundColor: "#E8F9F5",
                  color: "#16C79A",
                  borderRadius: "5px",
                  padding: "0.1rem 0.3rem",
                  fontWeight: "bold",
                }}>
                +10%
              </Typography>
            </Stack>
          </Box>
          <Box>{props.data.icon}</Box>
        </CardContent>
      </Card>
    );
  };

  const renderType2 = () => {
    return <Box></Box>;
  };

  const renderContent = () => {
    switch (props.type) {
      case "type1":
        return renderType1();
        break;
      case "type2":
        return renderType2();
        break;
      default:
        return renderType1();
        break;
    }
  };

  return <Box>{renderContent()}</Box>;
}
