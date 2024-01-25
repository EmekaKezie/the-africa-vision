import { IActionOption, IStory } from "@/types/IStory";
import {
  DeleteOutline,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { ReactNode, useEffect, useState } from "react";
import {
  convertToCurrency,
  convertToReadableDate,
  convertToReadableTime,
} from "../common/helpers";
import Link from "next/link";

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
  data: IStory[];
  onActionClick?: (item: IStory, url: string, action: string) => void;
  actionOptions?: IActionOption;
};

export default function CampaignListTable(props: props) {
  const [data, setData] = useState<IStory[]>([]);
  const [loadingView, setLoadingView] = useState<boolean>(false);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  useEffect(() => {
    if (props?.data) setData(props?.data);
    // eslint-disable-next-line
  }, [props]);

  const handleActionClick = (item: IStory, action: string) => {
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
                {data[index].creatorFullname}
              </Typography>
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: "0.8em",
                }}>
                {data[index].creatorEmail}
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
                {convertToReadableDate(data[index].startDate!)},{" "}
                {convertToReadableTime(data[index].startDate!)}
              </Typography>
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: "0.75em",
                }}>
                {convertToReadableDate(data[index].endDate!)},{" "}
                {convertToReadableTime(data[index].endDate!)}
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
          let backgroundColor = "";
          let color = "";

          switch (data[index].approvalStatus) {
            case "approved":
              backgroundColor = "#ECFDF3";
              color = "#027A48";
              break;
            case "declined":
              backgroundColor = "#F8E0E0";
              color = "#EB0505";
              break;
            case "pending":
              backgroundColor = "#FFF7E4";
              color = "#FECE51";
              break;
          }

          return (
            <Typography
              //component="span"
              sx={{
                textTransform: "capitalize",
                //color: "#101828",
                fontSize: "0.95em",
                backgroundColor: backgroundColor,
                color: color,
                fontWeight: "bold",
                padding: "0.2em",
                borderRadius: "10px",
                width: "70px",
                textAlign: "center",
              }}>
              {data[index].approvalStatus}
            </Typography>
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
