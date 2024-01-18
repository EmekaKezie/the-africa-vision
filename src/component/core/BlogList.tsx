import { IStory } from "@/types/IStory";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import BlogListCardType1 from "./BlogListCardType1";
import BlogListCardType2 from "./BlogListCardType2";
import BlogListCardType3 from "./BlogListCardType3";

type variationTypes = "swipeable" | "grid" | "pinned" | "tabular";
type cardTypes = "type1" | "type2" | "type3";

type props = {
  variation: variationTypes;
  cardType?: cardTypes;
  swipeButtons?: boolean;
  startAt?: number;
  stopAt?: number;
  redirectUrl?: string;
  data: IStory[];
};

export default function BlogList(props: props) {
  const [data, setData] = useState<IStory[]>([]);

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  const renderCard = (item: IStory) => {
    switch (props.cardType) {
      case "type1":
        return <BlogListCardType1 redirectUrl={props.redirectUrl} item={item} />;
      case "type2":
        return <BlogListCardType2 redirectUrl={props.redirectUrl} item={item} />;
      case "type3":
        return <BlogListCardType3 redirectUrl={props.redirectUrl} item={item} />;
      default:
        return <BlogListCardType1 redirectUrl={props.redirectUrl} item={item} />;
    }
  };

  const renderSwipeableVariation = () => {
    return (
      <Box>
        {props.swipeButtons && (
          <Stack direction="row" spacing={1} justifyContent="end">
            <IconButton sx={{ backgroundColor: "#FFE1F5" }}>
              <KeyboardArrowLeft />
            </IconButton>
            <IconButton sx={{ backgroundColor: "#FFE1F5" }}>
              <KeyboardArrowRight />
            </IconButton>
          </Stack>
        )}
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

  const renderGridVariation = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        <Grid container spacing={7}>
          {data?.slice(offset, limit)?.map((item: IStory) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={item.id}>
              {renderCard(item)}
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderPinnedVariation = () => {
    return <Box></Box>;
  };

  const renderTabularVariation = () => {
    return <Box></Box>;
  };

  const renderContent = () => {
    switch (props.variation) {
      case "swipeable":
        return renderSwipeableVariation();
      case "grid":
        return renderGridVariation();
      case "pinned":
        return renderPinnedVariation();
      case "tabular":
        return renderTabularVariation();
      default:
        return renderGridVariation();
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
