import { IUser } from "@/types/IUser";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { ReactNode, useEffect, useState } from "react";
import { convertToCurrency, convertToReadableDate } from "../common/helpers";
import {
  DeleteOutline,
  Edit,
  EditOutlined,
  Visibility,
  VisibilityOutlined,
} from "@mui/icons-material";

type props = {
  title?: string | ReactNode;
  elevation?: number;
  startAt?: number;
  stopAt?: number;
  redirectUrl?: string;
  data: IUser[];
  onActionClick?: (item: IUser, url: string, action: string) => void;
};

export default function CreatorListTable(props: props) {
  const [data, setData] = useState<IUser[]>([]);
  const [loadingView, setLoadingView] = useState<boolean>(false)

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  useEffect(() => {
    if (props?.data) setData(props?.data);
    // eslint-disable-next-line
  }, [props]);

  const handleActionClick = (item: IUser, action: string) => {
    if (props.onActionClick)
      props.onActionClick(item, props.redirectUrl ?? "", action);
  };

  const columns = [
    {
      name: "fullname",
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
              Name
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
                {data[index].fullname}
              </Typography>
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: "0.8em",
                }}>
                {data[index].email}
              </Typography>
            </Box>
          );
        },
      },
    },

    {
      name: "phone",
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
              Phone
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
                {data[index].phone}
              </Typography>
            </Box>
          );
        },
      },
    },

    {
      name: "totalRevenue",
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
              Total Earning
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
                {convertToCurrency(
                  data[index].totalEarning ?? 0,
                  data[index].currencyCode ?? "NGN"
                )}
              </Typography>
            </Box>
          );
        },
      },
    },

    {
      name: "totalPayout",
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
              Total Payout
            </Typography>
          );
        },
        customBodyRenderLite: (index: number) => {
          let color = "";
          if (data[index]?.totalEarning! > data[index]?.totalPayout!) {
            color = "#EB0505";
          }
          if (data[index]?.totalEarning! < data[index]?.totalPayout!) {
            color = "#FECE51";
          }
          if (data[index]?.totalEarning! === data[index]?.totalPayout!) {
            color = "#027A48";
          }

          return (
            <Box>
              <Typography
                sx={{
                  fontSize: "0.95em",
                  color: color,
                }}>
                {convertToCurrency(
                  data[index].totalPayout ?? 0,
                  data[index].currencyCode ?? "NGN"
                )}
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
              Status
            </Typography>
          );
        },
        customBodyRenderLite: (index: number) => {
          let backgroundColor = "";
          let color = "";

          switch (data[index].status) {
            case "active":
              backgroundColor = "#ECFDF3";
              color = "#027A48";
              break;
            case "deactivated":
              backgroundColor = "#F8E0E0";
              color = "#EB0505";
              break;
            case "pending":
              backgroundColor = "#FFF7E4";
              color = "#FECE51";
              break;
          }
          return (
            <Box>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  //color: "#101828",
                  fontSize: "0.95em",
                  backgroundColor: backgroundColor,
                  color: color,
                  fontWeight: "bold",
                  padding: "0.2em",
                  borderRadius: "10px",
                  width: "100px",
                  textAlign: "center",
                }}>
                {data[index].status}
              </Typography>
            </Box>
          );
        },
      },
    },

    {
      name: "entryDate",
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
              Created Date
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
                {convertToReadableDate(data[index].entryDate)}
              </Typography>
            </Box>
          );
        },
      },
    },

    {
      name: "",
      label: "",
      options: {
        // customHeadLabelRender: (i: any) => {
        //   return (
        //     <Typography
        //       sx={{
        //         textTransform: "capitalize",
        //         color: "#898989",
        //         fontSize: "0.9em",
        //         fontWeight: "bold",
        //       }}>
        //       Created Date
        //     </Typography>
        //   );
        // },
        customBodyRenderLite: (index: number) => {
          const item = data[index];
          return (
            <Box>
              <Tooltip title="View">
                <IconButton
                  size="small"
                  onClick={() => handleActionClick(item, "view")}>
                  <VisibilityOutlined sx={{ fontSize: "20px" }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={() => handleActionClick(item, "edit")}>
                  <EditOutlined sx={{ fontSize: "20px" }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={() => handleActionClick(item, "delete")}>
                  <DeleteOutline sx={{ fontSize: "20px" }} />
                </IconButton>
              </Tooltip>
            </Box>
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
