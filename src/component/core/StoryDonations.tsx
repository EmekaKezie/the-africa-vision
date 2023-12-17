import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Icon,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PurpleLightButton from "../common/PurpleLightButton";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  TurnedInNot,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { IStory } from "@/types/IStory";

type props = {
  swipeable?: boolean;
  startAt?: number;
  stopAt?: number;
  data: IStory[];
};

export default function StoryDonations(props: props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [data, setData] = useState<IStory[]>([]);

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;
  const swipeable: boolean = !props.swipeable ? false : props.swipeable;

  const handleScrollRight = () => {
    const currentPosition = ref.current?.scrollLeft ?? 0;
    if (currentPosition != undefined) {
      ref.current!.scrollLeft = currentPosition + 300;
    }
  };

  const handleScrolLeft = () => {
    const currentPosition = ref.current?.scrollLeft ?? 0;
    if (currentPosition != undefined) {
      ref.current!.scrollLeft = currentPosition + 300;
    }
  };

  const renderCard = (item: IStory) => {
    return (
      <Card elevation={1}>
        <CardMedia component="img" height="150px" image={item.image.src.src} />
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Typography
              style={{
                flexGrow: 1,
                color: "#999CA9",
                fontSize: "0.8em",
                lineHeight: "16px",
              }}>
              {item.date}
            </Typography>
            <Typography
              sx={{
                textOverflow: "ellipsis",
                color: "#A8518A",
                fontSize: "0.8em",
                lineHeight: "16px",
              }}>
              {item.analytics?.count} donations
            </Typography>
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
          <Icon
            sx={{
              border: "1px solid #A8518A",
              padding: "1.6rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "5px",
              borderRadius: "5px",
            }}>
            <TurnedInNot sx={{ color: "#A8518A" }} />
          </Icon>
          <PurpleLightButton text="Donate" style={{ flexGrow: 1 }} />
        </CardActions>
      </Card>
    );
  };

  const isSwipeable = () => {
    return (
      <Box>
        {/* <Box sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton
            sx={{ backgroundColor: "#FFE1F5" }}
            onClick={handleScrolLeft}>
            <KeyboardArrowLeft />
          </IconButton>
          <span style={{ marginLeft: "10px" }}></span>
          <IconButton
            onClick={handleScrollRight}
            sx={{ backgroundColor: "#FFE1F5" }}>
            <KeyboardArrowRight />
          </IconButton>
        </Box> */}

        <Stack direction="row" spacing={1} justifyContent="end">
          <IconButton
            sx={{ backgroundColor: "#FFE1F5" }}
            onClick={handleScrolLeft}>
            <KeyboardArrowLeft />
          </IconButton>
          <span style={{ marginLeft: "10px" }}></span>
          <IconButton
            onClick={handleScrollRight}
            sx={{ backgroundColor: "#FFE1F5" }}>
            <KeyboardArrowRight />
          </IconButton>
        </Stack>
        <br />
        <Box
          sx={{
            overflowX: "auto",
            display: "flex",
            gap: 7,
            paddingBottom: "0.1rem",
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
              }}
              ref={ref}>
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
