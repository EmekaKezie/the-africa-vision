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
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import PurpleLightButton from "../common/PurpleLightButton";

type props = {
  swipeable?: boolean;
  startAt?: number;
  stopAt?: number;
  data: IStory[];
};

export default function StoryArticles(props: props) {
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
          <Box display="flex">
            <Stack direction="row" flexGrow={1} spacing={0.5}>
              <Person
                sx={{
                  fontSize: "15px",
                  color: "#999999",
                }}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#999999",
                }}>
                {item?.author}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <CalendarMonth
                sx={{
                  fontSize: "15px",
                  color: "#999999",
                }}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#999999",
                }}>
                {item?.date}
              </Typography>
            </Stack>
          </Box>
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
        </CardContent>
        <CardActions sx={{ padding: "1rem" }}>
          <Link href={item?.url!}>
            <PurpleLightButton text="Read More" size="small" style={{width:"150px"}}/>
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
            gap: 7,
            padding: "0.1rem",
            "&::-webkit-scrollbar": {
              backgroundColor: "transparent",
            },
          }}>
          {data?.slice(offset, limit)?.map((item: IStory) => (
            <Box
              key={item.id}
              sx={{
                minWidth: "300px",
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
