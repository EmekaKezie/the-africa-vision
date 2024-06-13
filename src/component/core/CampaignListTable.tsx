import { IActionOption } from "@/types/IStory";
import {
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { ReactNode, useEffect, useState } from "react";
import {
  convertToCurrency,
  convertToReadableDate,
  convertToReadableTime,
  statusHandler,
} from "../common/helpers";
import Link from "next/link";
import { ICampaignData } from "@/types/ICampaign";

// type actionOptionProps = {
//   showView: boolean;
//   showDelete: boolean;
//   showEdit: boolean;
// };

type props = {
  title?: string | ReactNode;
  elevation?: number;
  startAt?: number;
  stopAt?: number;
  redirectUrl?: string;
  data: ICampaignData[];
  onActionClick?: (item: ICampaignData, url: string, action: string) => void;
  actionOptions?: IActionOption;
};

export default function CampaignListTable(props: props) {
  const [data, setData] = useState<ICampaignData[]>([]);
  const [loadingView, setLoadingView] = useState<boolean>(false);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  useEffect(() => {
    if (props?.data) setData(props?.data);
    // eslint-disable-next-line
  }, [props]);

  const handleActionClick = (item: ICampaignData, action: string) => {
    if (props.onActionClick)
      props.onActionClick(item, props.redirectUrl ?? "", action);
  };

  const columns = [
    {
      name: "",
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
              Creator Name
            </Typography>
          );
        },
        customBodyRenderLite: (index: number) => {
          return (
            <Box>
              <Typography
                sx={{
                  color: "#333843",
                  fontSize: "0.95em",
                }}>
                {data[index].user?.fullname}
              </Typography>
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: "0.8em",
                }}>
                {data[index].user?.email}
              </Typography>
            </Box>
          );
        },
      },
    },
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
            <Tooltip title={data[index].title}>
              <Typography
                sx={{
                  color: "#101828",
                  fontSize: "0.95em",
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  width: "150px",
                }}>
                {data[index].title}
              </Typography>
            </Tooltip>
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
              {data[index].target_amount &&
                convertToCurrency(
                  data[index].target_amount,
                  data[index]?.base_currency!
                )}
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
              Start/End Date
            </Typography>
          );
        },
        customBodyRenderLite: (index: number) => {
          return (
            <Box>
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: "0.75em",
                }}>
                {convertToReadableDate(data[index].start_date!)},{" "}
                {convertToReadableTime(data[index].start_date!)}
              </Typography>
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: "0.75em",
                }}>
                {convertToReadableDate(data[index].end_date!)},{" "}
                {convertToReadableTime(data[index].end_date!)}
              </Typography>
            </Box>
          );
        },
      },
    },
    {
      name: "status",
      label: "",
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
              Approval Status
            </Typography>
          );
        },
        customBodyRenderLite: (index: number) => {
          return (
            <Chip
              sx={{
                backgroundColor: statusHandler(data[index].approval_status)
                  .backgroundColor,
                color: statusHandler(data[index].approval_status).color,
                //padding: "",
                textTransform: "capitalize",
                width:"80px"
              }}
              size="small"
              label={data[index].approval_status}
            />
          );
        },
      },
    },
    {
      name: "",
      options: {
        customBodyRenderLite: (index: number) => {
          const item = data[index];
          return (
            <Stack direction="row">
              {props.actionOptions?.showView && (
                <Tooltip title="View">
                  <IconButton
                    size="small"
                    onClick={() => handleActionClick(item, "view")}>
                    <VisibilityOutlined sx={{ fontSize: "1em" }} />
                  </IconButton>
                </Tooltip>
              )}

              {props.actionOptions?.showDelete && (
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => handleActionClick(item, "delete")}>
                    <DeleteOutline sx={{ fontSize: "1em" }} />
                  </IconButton>
                </Tooltip>
              )}
              {props.actionOptions?.showEdit && (
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    onClick={() => handleActionClick(item, "edit")}>
                    <EditOutlined sx={{ fontSize: "1em" }} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          );
        },
      },
    },
  ];

  return (
    <Box>
      <MUIDataTable
        title={props.title}
        data={data?.slice(offset, limit)}
        columns={columns}
        options={{
          filter: "false",
          download: "true",
          downloadOptions: {
            filterOptions: {
              useDisplayedColumnsOnly: true,
              useDisplayedRowsOnly: true,
            },
          },
          print: "true",
          viewColumns: "false",
          elevation: !props.elevation ? 0 : props.elevation,
          responsive: "standard",
          selectableRows: "none",
        }}
      />
    </Box>
  );
}
