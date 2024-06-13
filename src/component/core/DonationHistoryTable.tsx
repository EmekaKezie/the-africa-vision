import { ICampaignDonation } from "@/types/ICampaign";
import { Box, Chip, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ApiGetCampaignDonations } from "../api/campaignApi";
import ReduxProvider from "../common/ReduxProvider";
import { useAppSelector } from "@/redux/useReduxHooks";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { onSessionValid } from "@/redux/slices/sessionSlice";
import SkeletonList from "./SkeletonList";
import PageEmpty from "./PageEmpty";
import MUIDataTable from "mui-datatables";
import {
  convertToCurrency,
  convertToReadableDate,
  statusHandler,
} from "../common/helpers";
import AppPagination from "../common/AppPagination";

type props = {
  title?: string;
  elevation?: number;
  campaignId?: string;
  pageSize?: number;
};

function DonationHistoryTable(props: props) {
  const authStore = useAppSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState<ICampaignDonation[]>([]);

  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [pageNum, setPageNum] = useState<number>(1);
  const pageSize = !props.pageSize ? 4 : props.pageSize;

  useEffect(() => {
    getDonations();
    // eslint-disable-next-line
  }, [pageNum]);

  const getDonations = () => {
    setLoading(true);
    ApiGetCampaignDonations(authStore.token, pageNum, pageSize)
      .then((response: IResponse<any>) => {
        setLoading(false);
        if (response.status === ResponseEnum.success) {
          const donationData = response.data.results;
          const donationTotal = response.data.total;

          setData(donationData);
          setTotal(donationTotal);
        }
        if (response.status === ResponseEnum.fail) {
          enqueueSnackbar(response.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
        if (response.status === ResponseEnum.expired_token) {
          dispatch(onSessionValid({ isValid: false }));
        }
      })
      .catch((error: any) => {
        setLoading(false);
        enqueueSnackbar("Something went wrong. Please try again", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const handleRenderContent = () => {
    if (loading) {
      return (
        <Box sx={{ background: "#FFFFFF", padding: "1rem" }}>
          <SkeletonList itemcount={3} cardType="type2" />
        </Box>
      );
    }

    if (!loading && data?.length < 1) {
      return <PageEmpty title="You have donations yet" />;
    }

    if (!loading && data?.length > 0) {
      return content();
    }
  };

  const content = () => {
    const dataColumns = [
      {
        name: "name",
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
                    color: "#101828",
                    fontSize: "0.95em",
                  }}>
                  {data[index].name}
                </Typography>
                <Typography
                  sx={{
                    color: "#898989",
                    fontSize: "0.75em",
                  }}>
                  {data[index].email}
                </Typography>
              </Box>
            );
          },
        },
      },
      {
        name: "converted_amount",
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
                  data[index].converted_amount,
                  data[index].currency
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
                {convertToReadableDate(data[index].created_at)}
              </Typography>
            );
          },
        },
      },
      {
        name: "",
        title: "",
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
              <Tooltip title={data[index].description}>
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
                  {data[index].description}
                </Typography>
              </Tooltip>
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
            return (
              <Chip
                sx={{
                  backgroundColor: statusHandler(data[index].status)
                    .backgroundColor,
                  color: statusHandler(data[index].status).color,
                  //padding: "",
                  textTransform: "capitalize",
                  width: "80px",
                }}
                size="small"
                label={data[index].status}
              />
            );
          },
        },
      },
    ];

    return (
      <Box>
        <MUIDataTable
          title={!props.title ? "Donations" : props.title}
          columns={dataColumns}
          data={data}
          options={{
            filter: false,
            download: true,
            print: true,
            viewColumns: false,
            elevation: !props.elevation ? 0 : props.elevation,
            responsive: "standard",
            selectableRows: "none",
            //pagination: true,
            //rowsPerPage: 6,
            customFooter: () => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    padding: "1rem",
                  }}>
                  <AppPagination
                    total={total}
                    pageNumber={pageNum}
                    pageSize={pageSize}
                    onChange={(e: any, pageNum: number) => {
                      setPageNum(pageNum);
                    }}
                  />
                </Box>
              );
            },
          }}
        />
      </Box>
    );
  };

  return handleRenderContent();
}

export default ReduxProvider(DonationHistoryTable);
