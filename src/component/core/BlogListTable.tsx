import { IActionOption } from "@/types/IStory";
import {
  DeleteOutline,
  EditOutlined,
  Person,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { ReactNode, useEffect, useState } from "react";
import { convertToReadableDate, statusHandler } from "../common/helpers";
import { IBlogData } from "@/types/IBlog";

type props = {
  title?: string | ReactNode;
  elevation?: number;
  startAt?: number;
  stopAt?: number;
  redirectUrl?: string;
  data: IBlogData[];
  onActionClick?: (item: IBlogData, url: string, action: string) => void;
  actionOptions?: IActionOption;
};

export default function BlogListTable(props: props) {
  const [data, setData] = useState<IBlogData[]>([]);
  const [loadingView, setLoadingView] = useState<boolean>(false);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  useEffect(() => {
    if (props?.data) setData(props?.data);
    // eslint-disable-next-line
  }, [props]);

  const handleActionClick = (item: IBlogData, action: string) => {
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
          const item = data[index];

          return (
            <Box display={"flex"} gap={1}>
              <Box>
                {!item.image ? (
                  <Avatar>
                    <Person />
                  </Avatar>
                ) : (
                  <Avatar src={item.image} />
                )}
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#333843",
                    fontSize: "0.95em",
                    fontWeight: "bold",
                  }}>
                  {data[index].user.fullname}
                </Typography>
                <Typography
                  sx={{
                    color: "#667085",
                    fontSize: "0.8em",
                  }}>
                  {data[index].user.email}
                </Typography>
              </Box>
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
              Blog Title
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
              Created Date
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
              {convertToReadableDate(data[index].created_at!)},{" "}
              {/* {convertToReadableTime(data[index].startDate!)} */}
            </Typography>
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

          switch (data[index].approval_status) {
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

          const approvalStatus =
            data[index].is_approved === 0 ? "pending" : "approved";

          return (
            <Chip
              sx={{
                backgroundColor: statusHandler(
                  data[index].is_approved === 0 ? "pending" : "approved"
                ).backgroundColor,
                color: statusHandler(
                  data[index].is_approved === 0 ? "pending" : "approved"
                ).color,
                padding: " 0.5rem",
                textTransform: "capitalize",
                width: "100px",
              }}
              label={approvalStatus}
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
