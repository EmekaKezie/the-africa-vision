"use client";
import { IActivity } from "@/types/IActivity";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type variationTypes = "swipeable" | "grid" | "pinned";

type props = {
  variation?: variationTypes;
  swipeButtons?: boolean;
  startAt?: number;
  stopAt?: number;
  data: IActivity[];
};

export default function StoryActivities(props: props) {
  const [data, setData] = useState<IActivity[]>([]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const renderCard2 = (item: IActivity) => {
    return (
      <Card elevation={0} sx={{ backgroundColor: "#FAFAFA" }}>
        <CardContent>
          <Typography
            sx={{
              color: "#303030",
              fontSize: "0.85em",
              marginBottom: "5px",
            }}>
            {item.title}
          </Typography>
          <Typography
            sx={{
              color: "#686868",
              fontSize: "0.65em",
            }}>
            {new Date().toLocaleDateString() ===
            new Date(item.endDate!).toLocaleDateString()
              ? "Today"
              : new Date(item.endDate!).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
            - {new Date(item.endDate!).toLocaleTimeString()}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const renderPinnedVariation = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        <Grid container spacing={2}>
          {data?.slice(offset, limit)?.map((item: IActivity) => (
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
        //return renderSwipeableVariation();
        return null;
        break;
      case "grid":
        //return renderGridVariation();
        return null;
        break;
      case "pinned":
        return renderPinnedVariation();
        break;
      default:
        return renderPinnedVariation();
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
