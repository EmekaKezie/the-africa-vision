import { IActionOption, IStory } from "@/types/IStory";
import {
  Delete,
  Edit,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  convertToCurrency,
  convertToReadableDate,
  convertToReadableTime,
} from "../common/helpers";
import MUIDataTable from "mui-datatables";
import CampaignListCardType1 from "./CampaignListCardType1";
import CampaignListCardType2 from "./CampaignListCardType2";
import CampaignListCardType3 from "./CampaignListCardType3";
import CampaignListCardType4 from "./CampaignListCardType4";
import CampaignListTable from "./CampaignListTable";
import { storyData } from "@/data/storyData";

type variationTypes = "swipeable" | "grid" | "pinned" | "tabular" | "docked";
type cardTypes = "type1" | "type2" | "type3";

type props = {
  variation: variationTypes;
  cardType?: cardTypes;
  swipeButtons?: boolean;
  startAt?: number;
  stopAt?: number;
  redirectUrl?: string;
  data: IStory[];
  onActionClick?: (item: IStory, url: string, action: string) => void;
  actionOptions?: IActionOption;
};

export default function CampaignList(props: props) {
  const [data, setData] = useState<IStory[]>([]);

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  const renderCard = (item: IStory) => {
    switch (props.cardType) {
      case "type1":
        return (
          <CampaignListCardType1 redirectUrl={props.redirectUrl} item={item} />
        );
      case "type2":
        return (
          <CampaignListCardType2 redirectUrl={props.redirectUrl} item={item} />
        );
      case "type3":
        return (
          <CampaignListCardType3 redirectUrl={props.redirectUrl} item={item} />
        );
      default:
        return (
          <CampaignListCardType1 redirectUrl={props.redirectUrl} item={item} />
        );
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

  const renderGridVariation = () => {
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

  const renderPinnedVariation = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        <Grid container spacing={2}>
          {data?.slice(offset, limit)?.map((item: IStory) => (
            <Grid item lg={12} md={12} sm={6} xs={12} key={item.id}>
              <CampaignListCardType3
                redirectUrl={props.redirectUrl}
                item={item}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderDockedVariation = () => {
    return (
      <Box
        sx={{
          paddingBottom: "1rem",
        }}>
        <Grid container spacing={2}>
          {data?.slice(offset, limit)?.map((item: IStory) => (
            <Grid item lg={12} md={12} sm={6} xs={12} key={item.id}>
              <CampaignListCardType4
                redirectUrl={props.redirectUrl}
                item={item}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderTabularVariation = () => {
    const flattenedData = (data: IStory[]): any => {
      return data?.map((item: IStory) => ({
        title: item.title,
        location: item?.venue,
        amount: item?.budget,
        date: item.startDate,
      }));
    };

    const columns = [
      {
        name: "title",
        options: {
          customHeadLabelRender: (i: any) => {
            return (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "#898989",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                }}>
                Project Name
              </Typography>
            );
          },
          customBodyRenderLite: (index: number) => {
            return (
              <Typography
                sx={{
                  color: "#101828",
                  fontSize: "0.95em",
                }}>
                {data[index].title}
              </Typography>
            );
          },
        },
      },
      {
        name: "location",
        options: {
          customHeadLabelRender: (i: any) => {
            return (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "#898989",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                }}>
                Location
              </Typography>
            );
          },
          customBodyRenderLite: (index: number) => {
            return (
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: "0.95em",
                }}>
                {data[index].venue}
              </Typography>
            );
          },
        },
      },
      {
        name: "amount",
        options: {
          customHeadLabelRender: (i: any) => {
            return (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "#898989",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                }}>
                Project Amount
              </Typography>
            );
          },
          customBodyRenderLite: (index: number) => {
            return (
              <Typography
                sx={{
                  color: "#101828",
                  fontSize: "0.95em",
                  fontWeight: "bold",
                }}>
                {data[index].budget &&
                  convertToCurrency(data[index].budget, data[index]?.currency!)}
              </Typography>
            );
          },
        },
      },
      {
        name: "date",
        options: {
          customHeadLabelRender: (i: any) => {
            return (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: "#898989",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                }}>
                Date
              </Typography>
            );
          },
          customBodyRenderLite: (index: number) => {
            return (
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: "0.95em",
                }}>
                {convertToReadableDate(data[index].startDate!)},{" "}
                {convertToReadableTime(data[index].startDate!)}
              </Typography>
            );
          },
        },
      },
      {
        name: "",
        options: {
          customBodyRenderLite: (index: number) => {
            return (
              <Stack direction="row" spacing={1}>
                <Tooltip title="Delete">
                  <IconButton size="small">
                    <Delete sx={{ fontSize: "1em" }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Edit">
                  <IconButton size="small">
                    <Edit sx={{ fontSize: "1em" }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            );
          },
        },
      },
    ];

    return (
      <CampaignListTable
        data={data}
        onActionClick={props.onActionClick}
        startAt={props.startAt}
        stopAt={props.stopAt}
        redirectUrl={props.redirectUrl}
        actionOptions={{
          showView: props.actionOptions?.showView ?? true,
          showDelete: props.actionOptions?.showDelete ?? true,
          showEdit: props.actionOptions?.showEdit ?? true,
        }}
      />
      // <Box>
      //   <MUIDataTable
      //     title={
      //       <Box>
      //         <Typography
      //           sx={{
      //             color: "#120F0F",
      //             fontWeight: "bold",
      //             fontSize: "1.1em",
      //           }}>
      //           Recent Campaign
      //         </Typography>
      //       </Box>
      //     }
      //     data={flattenedData(data?.slice(offset, limit))}
      //     columns={columns}
      //     options={{
      //       filter: "false",
      //       download: "true",
      //       downloadOptions: {
      //         filterOptions: {
      //           useDisplayedColumnsOnly: true,
      //           useDisplayedRowsOnly: true,
      //         },
      //       },
      //       print: "true",
      //       viewColumns: "false",
      //       elevation: 0,
      //       responsive: "standard",
      //       selectableRows: "none",
      //     }}
      //   />
      // </Box>
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
      case "docked":
        return renderDockedVariation();
      default:
        return renderDockedVariation();
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
