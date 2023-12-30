import {
  Box,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { convertToCurrency } from "../common/helpers";

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
            <Typography
              sx={{
                color: "#728095",
                fontSize: { md: "0.8em", xs: "0.65em" },
              }}>
              {props.data.title.toUpperCase()}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                sx={{
                  color: "#0F2744",
                  fontSize: { md: "1.1em", xs: "0.75em" },
                  fontWeight: "bold",
                }}>
                {convertToCurrency(props.data.amount, props.data.currency)}
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "0.7em", xs: "0.5em" },
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
          <Box sx={{ display: { md: "block", xs: "none" } }}>
            {props.data.icon}
          </Box>
        </CardContent>
      </Card>
    );
  };

  const renderType2 = () => {
    return (
      <Card elevation={0}>
        <CardContent
        
          sx={{
            display: "flex",
            alignItems: "center",
          }}>
          <Box flexGrow={1}>
            <Typography
              sx={{
                color: "#728095",
                fontSize: { md: "0.8em", xs: "0.65em" },
              }}>
              {props.data.title.toUpperCase()}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                sx={{
                  color: "#0F2744",
                  fontSize: { md: "1.1em", xs: "0.75em" },
                  fontWeight: "bold",
                }}>
                {convertToCurrency(props.data.amount, props.data.currency)}
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "0.7em", xs: "0.5em" },
                  backgroundColor: "#E8F9F5",
                  color: "#16C79A",
                  borderRadius: "5px",
                  padding: "0.1rem 0.3rem",
                  fontWeight: "bold",
                }}>
                +10%
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box>{props.data.icon}</Box>
              <Typography
                sx={{
                  fontSize: { md: "0.8em", xs: "0.6em" },
                  //backgroundColor: "#E8F9F5",
                  color: "#16C79A",
                  //borderRadius: "5px",
                  //padding: "0.1rem 0.3rem",
                  fontWeight: "bold",
                  marginLeft:"5px"
                }}>
                +10%
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "0.8em", xs: "0.6em" },
                  //backgroundColor: "#E8F9F5",
                  color: "#999999",
                  //borderRadius: "5px",
                  //padding: "0.1rem 0.3rem",
                  fontWeight: "bold",
                  marginLeft:"5px"
                }}>
                vs last week
              </Typography>
            </Stack>
          </Box>
          {/* <Box sx={{ display: { md: "block", xs: "none" } }}>
            {props.data.icon}
          </Box> */}
        </CardContent>
      </Card>
    );
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
