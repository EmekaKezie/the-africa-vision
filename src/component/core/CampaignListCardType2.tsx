import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { convertToPercentage, formatNumberWithSuffix } from "../common/helpers";
import { ICampaignData } from "@/types/ICampaign";
import Link from "next/link";

type props = {
  redirectUrl?: string;
  item: ICampaignData;
};

export default function CampaignListCardType2(props: props) {
  return (
    <Box component="div">
      <Link
        href={
          !props?.redirectUrl ? "" : `${props.redirectUrl}/${props.item.id}`
        }>
        <Box sx={{ height: "150px" }}>
          <CardMedia
            component="img"
            src={props.item.image}
            alt={props.item.title}
            height="100%"
            sx={{
              width: "100%",
            }}
          />
        </Box>
      </Link>
      <Box
        sx={{
          background: "#FFFFF",
          margin: "-5% 5% 0 5%",
          zIndex: 100,
          position: "relative",
        }}>
        <Card elevation={2}>
          <CardContent>
            <Typography
              style={{
                color: "red",
                background: "lightred",
                fontSize: "0.6em",
                fontWeight: "bold",
                display: "inline-block",
                padding: "0.3rem 1rem",
                borderRadius: "5px",
                marginBottom: "1rem",
                border: "1px solid gray",
              }}>
              {props.item.category.name}
            </Typography>
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
            <Box>
              <LinearProgress
                variant="determinate"
                value={convertToPercentage(
                  props.item?.target_amount,
                  props.item?.raised_amount ?? 0
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
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.7em",
                          color: "#667085",
                          paddingTop: "1rem",
                          fontWeight: "bold",
                        }}>
                        Goal
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.7em",
                          fontWeight: "bold",
                          color: "#2E4049",
                        }}>
                        {!props.item?.base_currency
                          ? "NGN"
                          : props.item?.base_currency}
                        {formatNumberWithSuffix(props.item?.target_amount)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.7em",
                          color: "#667085",
                          paddingTop: "1rem",
                          fontWeight: "bold",
                        }}>
                        Collected
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.7em",
                          fontWeight: "bold",
                          color: "#2E4049",
                        }}>
                        {!props.item?.base_currency
                          ? "NGN"
                          : props.item?.base_currency}
                        {formatNumberWithSuffix(props.item?.raised_amount ?? 0)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.7em",
                          color: "#667085",
                          paddingTop: "1rem",
                          fontWeight: "bold",
                        }}>
                        Remaining
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.7em",
                          fontWeight: "bold",
                          color: "#2E4049",
                        }}>
                        {!props.item?.base_currency
                          ? "NGN"
                          : props.item?.base_currency}
                        {formatNumberWithSuffix(
                          props.item?.target_amount -
                            (props.item?.raised_amount ?? 0)
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
