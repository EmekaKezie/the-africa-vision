import { IStory } from "@/types/IStory";
import {
  Comment,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Share,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

type props = {
  swipeable?: boolean;
  startAt?: number;
  stopAt?: number;
  data: IStory[];
};

export default function StoryBlogs(props: props) {
  const [data, setData] = useState<IStory[]>([]);

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;
  const swipeable: boolean = !props.swipeable ? false : props.swipeable;

  const renderCard = (item: IStory) => {
    return (
      <Link href={item.url!}>
        <Card
          elevation={1}
          sx={{
            padding: "1rem",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#EFF8FF",
              opacity: 0.9,
            },
          }}>
          <CardMedia
            component="img"
            height="150px"
            image={item.image.src.src}
            sx={{ borderRadius: "20px" }}
          />
          <CardContent>
            <Tooltip title={item.title}>
              <Typography
                component="div"
                variant="body1"
                sx={{
                  fontSize: "1.1em",
                  fontWeight: "bold",
                  letterSpacing: "-1px",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                }}>
                {item.title}
              </Typography>
            </Tooltip>
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
            <Stack direction="row" spacing={4}>
              <Tooltip title="Shares">
                <Badge badgeContent={item.shares} color="success">
                  <Share
                    sx={{
                      fontSize: "20px",
                      color: "#A9518B",
                    }}
                  />
                </Badge>
              </Tooltip>
              <Tooltip title="Likes">
                <Badge badgeContent={item.likes} color="error">
                  <ThumbUp
                    sx={{
                      fontSize: "20px",
                      color: "#A9518B",
                    }}
                  />
                </Badge>
              </Tooltip>
              <Tooltip title="Comments">
                <Badge badgeContent={item.comments} color="info">
                  <Comment
                    sx={{
                      fontSize: "20px",
                      color: "#A9518B",
                    }}
                  />
                </Badge>
              </Tooltip>
            </Stack>

            {/* <br /> */}
            {/* <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}>
              <Stack direction="row">
                <Typography sx={{ fontSize: "9px", marginRight: "2px" }}>
                  {item.shares} Shares
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: "9px" }}>
                {item.likes} Likes
              </Typography>
              <Typography sx={{ fontSize: "9px" }}>
                {item.comments} Comments
              </Typography>
              <Stack direction="row" spacing={1}>
                <Share sx={{ fontSize: "14px" }} />
                <ThumbUp sx={{ fontSize: "14px" }} />
                <ThumbDown sx={{ fontSize: "14px" }} />
              </Stack>
            </Box> */}
          </CardContent>
        </Card>
      </Link>
    );
  };

  const isSwipeable = () => {
    return (
      <Box>
        <Stack direction="row" spacing={1} justifyContent="end">
          <IconButton sx={{ backgroundColor: "#FFE1F5" }}>
            <KeyboardArrowLeft />
          </IconButton>
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
