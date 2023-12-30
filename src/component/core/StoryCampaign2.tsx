import { IStory } from "@/types/IStory";
import {
  CalendarMonth,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import PurpleLightButton from "../common/PurpleLightButton";
import { formatNumberWithSuffix } from "../common/helpers";
import Image from "next/image";

type props = {
  swipeable?: boolean;
  startAt?: number;
  stopAt?: number;
  data: IStory[];
};

export default function StoryCampaign2(props: props) {
  const [data, setData] = useState<IStory[]>([]);

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;
  const swipeable: boolean = !props.swipeable ? false : props.swipeable;

  const renderCard = (item: IStory) => {
    return (
      <Box component="div">
        <Box sx={{ height: "150px" }}>
          <Image
            src={item.image.src}
            alt={item.id}
            style={{ objectFit: "cover", width: "100%" }}
          />
        </Box>
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
                {item.categoryName}
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
                {item.title}
              </Typography>
              <br />
              <Box>
                <LinearProgress
                  variant="determinate"
                  value={
                    !item?.analytics?.percentage
                      ? 0
                      : item?.analytics?.percentage
                  }
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
                          {!item.analytics?.currency
                            ? "NGN"
                            : item.analytics?.currency}
                          {formatNumberWithSuffix(
                            !item?.analytics?.goal ? 0 : item?.analytics?.goal
                          )}
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
                          {!item.analytics?.currency
                            ? "NGN"
                            : item.analytics?.currency}
                          {formatNumberWithSuffix(
                            !item?.analytics?.attanied
                              ? 0
                              : item?.analytics?.attanied
                          )}
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
                          {!item.analytics?.currency
                            ? "NGN"
                            : item.analytics?.currency}
                          {formatNumberWithSuffix(
                            !item?.analytics?.outstanding
                              ? 0
                              : item?.analytics?.outstanding
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
  };

  const isSwipeable = () => {
    return (
      <Box>
        <Stack direction="row" spacing={1} justifyContent="end">
          <IconButton sx={{ backgroundColor: "#FFE1F5" }}>
            <KeyboardArrowLeft />
          </IconButton>
          <span style={{ marginLeft: "10px" }}></span>
          <IconButton sx={{ backgroundColor: "#FFE1F5" }}>
            <KeyboardArrowRight />
          </IconButton>
        </Stack>
        <br />
        <Box
          sx={{
            overflowX: "auto",
            display: "flex",
            gap: { xs: 2, md: 5 },
            padding: "0.1rem",
            "&::-webkit-scrollbar": {
              backgroundColor: "transparent",
            },
          }}>
          {data?.slice(offset, limit)?.map((item: IStory) => (
            <Box
              key={item.id}
              sx={{
                minWidth: "280px",
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {renderCard(item)}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const isNotSwipeable = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        <Grid container spacing={7}>
          {data?.slice(offset, limit)?.map((item: IStory) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={item.id}>
              <Box>{renderCard(item)}</Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderContent = () => {
    if (swipeable) return isSwipeable();
    else return isNotSwipeable();
  };

  return (
    <Box
      sx={{
        padding: "1rem 0",
      }}>
      {renderContent()}
    </Box>
  );
}
