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

type props = {
  swipeable?: boolean;
  startAt?: number;
  stopAt?: number;
  data: IStory[];
};

export default function StoryCampaign(props: props) {
  const [data, setData] = useState<IStory[]>([]);

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;
  const swipeable: boolean = !props.swipeable ? false : props.swipeable;

  const renderCard = (item: IStory) => {
    return (
      <Card elevation={1}>
        <CardMedia component="img" height="150px" image={item.image.src.src} />
        <CardContent>
          <Typography
            sx={{
              color: "#A9518B",
              fontWeight: "bold",
              letterSpacing: "-1px",
            }}>
            {item.categoryName}
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
            {item.title}
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
            {item.content}
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
                {!item?.analytics?.percentage ? 0 : item?.analytics?.percentage}
                %
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={
                !item?.analytics?.percentage ? 0 : item?.analytics?.percentage
              }
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
                Raised: {item.analytics?.currency}
                {formatNumberWithSuffix(
                  !item?.analytics?.attanied ? 0 : item?.analytics?.attanied
                )}
              </Typography>
              <Typography
                component="div"
                sx={{
                  justifyContent: "end",
                  fontSize: "0.7em",
                }}>
                Goal: {item.analytics?.currency}
                {formatNumberWithSuffix(
                  !item?.analytics?.goal ? 0 : item?.analytics?.goal
                )}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
        <CardActions sx={{ padding: "1rem" }}>
          <Link href={item?.url!}>
            <PurpleLightButton
              text="Donate"
              size="small"
              style={{ width: "150px" }}
            />
          </Link>
        </CardActions>
      </Card>
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
            gap: 2,
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
