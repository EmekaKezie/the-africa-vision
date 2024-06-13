import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import CreatorListTable from "./CreatorListTable";
import { IUser } from "@/types/IUser";

type variationTypes = "swipeable" | "grid" | "pinned" | "tabular";
type cardTypes = "type1";

type props = {
  variation: variationTypes;
  cardType?: cardTypes;
  swipeButtons?: boolean;
  startAt?: number;
  stopAt?: number;
  redirectUrl?: string;
  data: IUser[];
  onActionClick?: (item: IUser, url: string, action: string) => void;
};

export default function CreatorList(props: props) {
  const [data, setData] = useState<IUser[]>([]);

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  const renderSwipeableVariation = () => {
    return (
      <Box>
        {props.swipeButtons && (
          <Stack direction="row" spacing={1} justifyContent="end">
            <IconButton sx={{ backgroundColor: "#FFE1F5" }}>
              <KeyboardArrowLeft />
            </IconButton>
            <span style={{ marginLeft: "10px" }}></span>
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
          {data?.slice(offset, limit)?.map((item: IUser) => (
            <Box
              key={item.id}
              sx={{
                minWidth: "280px",
                minHeight: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {/* {renderCard(item)} */}
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
          {data?.slice(offset, limit)?.map((item: IUser) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={item.id}>
              <Box>{/* {renderCard(item)} */}</Box>
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
          {data?.slice(offset, limit)?.map((item: IUser) => (
            <Grid item lg={12} md={12} sm={6} xs={12} key={item.id}>
              {/* <CampaignListCardType3
                redirectUrl={props.redirectUrl}
                item={item}
              /> */}
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderTabularVariation = () => {
    return (
      <CreatorListTable
        data={props.data}
        redirectUrl={props.redirectUrl}
        onActionClick={props.onActionClick}
      />
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
