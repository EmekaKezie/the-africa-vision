import { IActionOption } from "@/types/IStory";
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
import CampaignListCardType1 from "./CampaignListCardType1";
import CampaignListCardType2 from "./CampaignListCardType2";
import CampaignListCardType3 from "./CampaignListCardType3";
import CampaignListCardType4 from "./CampaignListCardType4";
import CampaignListTable from "./CampaignListTable";
import { ICampaignData } from "@/types/ICampaign";
import { useAppSelector } from "@/redux/useReduxHooks";
import CampaignListCardType5 from "./CampaignListCardType5";
import CampaignListItems from "./CampaignListItems";

type variationTypes =
  | "swipeable"
  | "grid"
  | "pinned"
  | "tabular"
  | "docked"
  | "itemized";
type cardTypes = "type1" | "type2" | "type3" | "type4";

type props = {
  variation: variationTypes;
  cardType?: cardTypes;
  swipeButtons?: boolean;
  startAt?: number;
  stopAt?: number;
  redirectUrl?: string;
  //data: IStory[];
  data: ICampaignData[];
  //onActionClick?: (item: IStory, url: string, action: string) => void;
  onActionClick?: (item: ICampaignData, url: string, action: string) => void;
  actionOptions?: IActionOption;
  buttonText?: string;
};

export default function CampaignList(props: props) {
  const storeAuth = useAppSelector((state) => state.authReducer);
  //const [data, setData] = useState<IStory[]>([]);
  const [data, setData] = useState<ICampaignData[]>([]);

  // useEffect(() => {
  //   fetch();
  // }, []);

  // const fetch = () => {
  //   getMyCampaignsApi(storeAuth.token)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error: any) => {});
  // };

  useEffect(() => {
    if (props?.data) setData(props?.data);
  }, [props]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  const renderCard = (item: ICampaignData) => {
    switch (props.cardType) {
      case "type1":
        return (
          <CampaignListCardType1
            redirectUrl={props.redirectUrl}
            item={item}
            buttonText={props.buttonText}
          />
        );
      case "type2":
        return (
          <CampaignListCardType2 redirectUrl={props.redirectUrl} item={item} />
        );
      case "type3":
        return (
          <CampaignListCardType3 redirectUrl={props.redirectUrl} item={item} />
        );
      case "type4":
        return (
          <CampaignListCardType4
            redirectUrl={props.redirectUrl}
            item={item}
            buttonText={props.buttonText}
          />
        );
      default:
        return (
          <CampaignListCardType1
            redirectUrl={props.redirectUrl}
            item={item}
            buttonText={props.buttonText}
          />
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
          {data?.slice(offset, limit)?.map((item: ICampaignData) => (
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
          {data?.slice(offset, limit)?.map((item: ICampaignData) => (
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
          {data?.slice(offset, limit)?.map((item: ICampaignData) => (
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
          {data?.slice(offset, limit)?.map((item: ICampaignData) => (
            <Grid item lg={12} md={12} sm={6} xs={12} key={item.id}>
              <CampaignListCardType5
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
    const flattenedData = (data: ICampaignData[]): any => {
      return data?.map((item: ICampaignData) => ({
        title: item.title,
        location: item?.venue,
        amount: item?.target_amount,
        date: item.start_date,
      }));
    };

    // const columns = [
    //   {
    //     name: "title",
    //     options: {
    //       customHeadLabelRender: (i: any) => {
    //         return (
    //           <Typography
    //             sx={{
    //               textTransform: "capitalize",
    //               color: "#898989",
    //               fontSize: "0.9em",
    //               fontWeight: "bold",
    //             }}>
    //             Project Name
    //           </Typography>
    //         );
    //       },
    //       customBodyRenderLite: (index: number) => {
    //         return (
    //           <Typography
    //             sx={{
    //               color: "#101828",
    //               fontSize: "0.95em",
    //             }}>
    //             {data[index].title}
    //           </Typography>
    //         );
    //       },
    //     },
    //   },
    //   {
    //     name: "location",
    //     options: {
    //       customHeadLabelRender: (i: any) => {
    //         return (
    //           <Typography
    //             sx={{
    //               textTransform: "capitalize",
    //               color: "#898989",
    //               fontSize: "0.9em",
    //               fontWeight: "bold",
    //             }}>
    //             Location
    //           </Typography>
    //         );
    //       },
    //       customBodyRenderLite: (index: number) => {
    //         return (
    //           <Typography
    //             sx={{
    //               color: "#667085",
    //               fontSize: "0.95em",
    //             }}>
    //             {data[index].venue}
    //           </Typography>
    //         );
    //       },
    //     },
    //   },
    //   {
    //     name: "amount",
    //     options: {
    //       customHeadLabelRender: (i: any) => {
    //         return (
    //           <Typography
    //             sx={{
    //               textTransform: "capitalize",
    //               color: "#898989",
    //               fontSize: "0.9em",
    //               fontWeight: "bold",
    //             }}>
    //             Project Amount
    //           </Typography>
    //         );
    //       },
    //       customBodyRenderLite: (index: number) => {
    //         return (
    //           <Typography
    //             sx={{
    //               color: "#101828",
    //               fontSize: "0.95em",
    //               fontWeight: "bold",
    //             }}>
    //             {data[index].target_amount &&
    //               convertToCurrency(
    //                 data[index].target_amount,
    //                 data[index]?.base_currency!
    //               )}
    //           </Typography>
    //         );
    //       },
    //     },
    //   },
    //   {
    //     name: "date",
    //     options: {
    //       customHeadLabelRender: (i: any) => {
    //         return (
    //           <Typography
    //             sx={{
    //               textTransform: "capitalize",
    //               color: "#898989",
    //               fontSize: "0.9em",
    //               fontWeight: "bold",
    //             }}>
    //             Date
    //           </Typography>
    //         );
    //       },
    //       customBodyRenderLite: (index: number) => {
    //         return (
    //           <Typography
    //             sx={{
    //               color: "#667085",
    //               fontSize: "0.95em",
    //             }}>
    //             {convertToReadableDate(data[index].start_date!)},{" "}
    //             {convertToReadableTime(data[index].start_date!)}
    //           </Typography>
    //         );
    //       },
    //     },
    //   },
    //   {
    //     name: "",
    //     options: {
    //       customBodyRenderLite: (index: number) => {
    //         return (
    //           <Stack direction="row" spacing={1}>
    //             <Tooltip title="Delete">
    //               <IconButton size="small">
    //                 <Delete sx={{ fontSize: "1em" }} />
    //               </IconButton>
    //             </Tooltip>

    //             <Tooltip title="Edit">
    //               <IconButton size="small">
    //                 <Edit sx={{ fontSize: "1em" }} />
    //               </IconButton>
    //             </Tooltip>
    //           </Stack>
    //         );
    //       },
    //     },
    //   },
    // ];

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
    );
  };

  const renderItemizedVariation = () => {
    return (
      <CampaignListItems
        data={props.data}
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
      case "docked":
        return renderDockedVariation();
      case "itemized":
        return renderItemizedVariation();
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
