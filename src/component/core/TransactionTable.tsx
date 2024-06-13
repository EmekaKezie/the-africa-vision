import { ITransaction } from "@/types/ITransaction";
import { Box, Tooltip, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { convertToCurrency, convertToReadableDate } from "../common/helpers";

type props = {
  title?: string | ReactNode;
  elevation?: number;
  startAt?: number;
  stopAt?: number;
  data: ITransaction[];
};

export default function TransactionTable(props: props) {
  const [data, setData] = useState<ITransaction[]>([]);

  const offset: number = !props.startAt ? 0 : props.startAt;
  const limit: number = !props.stopAt ? data.length : props.stopAt;

  useEffect(() => {
    if (props?.data) setData(props?.data);
    // eslint-disable-next-line
  }, [props]);

  const getDonations = () => {
    
  }

  const columns = [
    {
      name: "donorFullname",
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
            <Typography
              sx={{
                color: "#101828",
                fontSize: "0.95em",
              }}>
              {data[index].donorFullname}
            </Typography>
          );
        },
      },
    },
    {
      name: "transactionAmount",
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
              Amount
            </Typography>
          );
        },
        customBodyRenderLite: (index: number) => {
          return (
            <Typography
              sx={{
                color: "#667085",
                fontSize: "0.95em",
                fontWeight: "bold",
              }}>
              {convertToCurrency(
                data[index].transactionAmount,
                data[index].transactionCurrency
              )}
            </Typography>
          );
        },
      },
    },
    {
      name: "transactionDate",
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
              {convertToReadableDate(data[index].transactionDate)}
            </Typography>
          );
        },
      },
    },
    {
      name: "transactionType",
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
              Type
            </Typography>
          );
        },
        customBodyRenderLite: (index: number) => {
          return (
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "#667085",
                fontSize: "0.95em",
              }}>
              {data[index].transactionType}
            </Typography>
          );
        },
      },
    },
    {
      name: "transactionRemark",
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
              Description
            </Typography>
          );
        },
        customBodyRenderLite: (index: number) => {
          return (
            <Tooltip title={data[index].transactionRemark}>
              <Typography
                sx={{
                  color: "#667085",
                  fontSize: "0.95em",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  display: "-webkit-box",
                  width: "120px",
                }}>
                {data[index].transactionRemark}
              </Typography>
            </Tooltip>
          );
        },
      },
    },
    {
      name: "transactionStatus",
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

          switch (data[index].transactionStatus) {
            case "success":
              backgroundColor = "#ECFDF3";
              color = "#027A48";
              break;
            case "failed":
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
              {data[index].transactionStatus}
            </Typography>
          );
        },
      },
    },
  ];

  return (
    <Box>
      <MUIDataTable
        // title={
        //   <Box
        //     sx={{
        //       padding: "0.5rem 0 0 0",
        //     }}>
        //     <Typography
        //       sx={{
        //         color: "#120F0F",
        //         fontWeight: "bold",
        //         fontSize: "1.1em",
        //       }}>
        //       Transactions
        //     </Typography>
        //     <Typography
        //       sx={{
        //         color: "#898989",
        //         fontSize: "0.9em",
        //       }}>
        //       Last 2 Weeks
        //     </Typography>
        //   </Box>
        // }
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
