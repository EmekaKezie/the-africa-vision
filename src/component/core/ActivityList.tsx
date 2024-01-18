"use client";
import { IActivity } from "@/types/IActivity";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { convertToReadableTime } from "../common/helpers";
import ActivityListCardType1 from "./ActivityListCardType1";

type variationTypes = "swipeable" | "grid" | "pinned";

type props = {
  variation?: variationTypes;
  swipeButtons?: boolean;
  startAt?: number;
  stopAt?: number;
  data: IActivity[];
};

export default function ActivityList(props: props) {
  const [data, setData] = useState<IActivity[]>([]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const renderSwipeableVariation = () => {
    return <Box>Swipeable Variation {"->"} in progress</Box>;
  };

  const renderGridVariation = () => {
    return <Box>Grid Variation {"->"} in progress</Box>;
  };

  const renderPinnedVariation = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        <Grid container spacing={1}>
          {data?.slice(offset, limit)?.map((item: IActivity) => (
            <Grid item lg={12} md={12} sm={6} xs={12} key={item.id}>
              <ActivityListCardType1 item={item} />
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
      case "grid":
        return renderGridVariation();
      case "pinned":
        return renderPinnedVariation();
      default:
        return renderPinnedVariation();
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
