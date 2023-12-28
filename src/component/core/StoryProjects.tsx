"use client";
import { IStory } from "@/types/IStory";
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
import {
  AccessAlarm,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  PlaceOutlined,
  Today,
} from "@mui/icons-material";
import Image from "next/image";
import { convertToReadableDate, convertToReadableTime } from "../common/helpers";

type variationTypes = "swipeable" | "grid" | "pinned";

type props = {
  variation?: variationTypes;
  swipeButtons?: boolean;
  startAt?: number;
  stopAt?: number;
  data: IStory[];
};

export default function StoryProjects(props: props) {
  const [data, setData] = useState<IStory[]>([]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const handleScrollLeft = () => {};

  const handleScrollRight = () => {};

  const renderCard1 = (item: IStory) => {
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
              {item.analytics?.contributions} donations
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
          {/* <Icon
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
          </Icon> */}
          <Link
            href={`/donate/[id]`}
            as={`/donate/${item.id}`}
            style={{ width: "100%" }}>
            <PurpleLightButton
              text="Donate"
              style={{ flexGrow: 1, width: "100%" }}
            />
          </Link>
        </CardActions>
      </Card>
    );
  };

  const renderCard2 = (item: IStory) => {
    return (
      <Card elevation={0} sx={{borderBottom:"1px solid lightgray", borderTop:"0px solid lightgray"}}>
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            gap: 1,
          }}>
          <Box
            sx={{
              width: "70px",
              height: "70px",
              overflow: "hidden",
              border: "0px solid gray",
            }}>
            <Image
              src={item.image.src}
              alt={item.title}
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box flexGrow={1} border={0} width="50%">
            <Typography
              component="span"
              sx={{
                fontSize: "0.7em",
                backgroundColor: "#F4F3FF",
                padding: "0.2rem 0.4rem",
                color: "#5925DC",
                fontWeight:"bold",
                //boxShadow:"1px 1px 1px 1px lightgray",
                //borderRadius:"5px"
              }}>
              {item.categoryName}
            </Typography>
            <Typography
              sx={{
                color: "#120F0F",
                fontSize: "0.8em",
                fontWeight: "bold",
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "block-axis",
                WebkitLineClamp: 1,
                margin: "5px 0 10px 0",
              }}>
              {item.title}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Stack direction="row" alignItems="center">
                <PlaceOutlined
                  sx={{ fontSize: "0.6em", color: "#120F0F", opacity: 0.6 }}
                />
                <Typography
                  sx={{ color: "#120F0F", opacity: 0.6, fontSize: "0.55em" }}>
                  Lagos Nigeria
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Today
                  sx={{ fontSize: "0.6em", color: "#120F0F", opacity: 0.6 }}
                />
                <Typography
                  sx={{ color: "#120F0F", opacity: 0.6, fontSize: "0.55em" }}>
                  {convertToReadableDate(item.date!)}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <AccessAlarm
                  sx={{ fontSize: "0.6em", color: "#120F0F", opacity: 0.6 }}
                />
                <Typography
                  sx={{ color: "#120F0F", opacity: 0.6, fontSize: "0.55em" }}>
                  {convertToReadableTime(item.date!)}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Card>
    );
  };

  const renderSwipeableVariation = () => {
    return (
      <Box>
        {props.variation === "swipeable" && props.swipeButtons && (
          <Stack direction="row" spacing={1} justifyContent="end">
            <IconButton
              sx={{ backgroundColor: "#FFE1F5" }}
              onClick={handleScrollLeft}>
              <KeyboardArrowLeft />
            </IconButton>
            <span style={{ marginLeft: "10px" }}></span>
            <IconButton
              onClick={handleScrollRight}
              sx={{ backgroundColor: "#FFE1F5" }}>
              <KeyboardArrowRight />
            </IconButton>
          </Stack>
        )}
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
              {renderCard1(item)}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const renderGridVariation = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        <Grid container spacing={7}>
          {data?.slice(offset, limit)?.map((item: IStory) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={item.id}>
              <Box>{renderCard1(item)}</Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderPinnedVariation = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        <Grid container spacing={2}>
          {data?.slice(offset, limit)?.map((item: IStory) => (
            <Grid item lg={12} md={12} sm={6} xs={12} key={item.id}>
              <Box>{renderCard2(item)}</Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderContent = () => {
    switch (props.variation) {
      case "swipeable":
        return renderSwipeableVariation();
        break;
      case "grid":
        return renderGridVariation();
        break;
      case "pinned":
        return renderPinnedVariation();
        break;
      default:
        return renderGridVariation();
        break;
    }
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
