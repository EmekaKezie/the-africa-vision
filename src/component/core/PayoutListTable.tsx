import {
  Box,
  Chip,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import ReduxProvider from "../common/ReduxProvider";
import { ReactNode, useEffect, useState } from "react";
import { IPayoutData } from "@/types/IPayout";
import { ApiGetPayouts } from "../api/paymentApi";
import { useAppSelector } from "@/redux/useReduxHooks";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { onSessionValid } from "@/redux/slices/sessionSlice";
import SkeletonList from "./SkeletonList";
import PageEmpty from "./PageEmpty";
import MUIDataTable from "mui-datatables";
import AppPagination from "../common/AppPagination";
import {
  convertToCurrency,
  convertToReadableDate,
  statusHandler,
} from "../common/helpers";
import { Approval, Delete, Info, MoreVert } from "@mui/icons-material";
import PayoutApprovalDialog from "./PayoutApprovalDialog";
import PayoutPreviewDialog from "./PayoutPreviewDialog";

type props = {
  title?: string | ReactNode;
  elevation?: number;
  pageSize?: number;
};

function PayoutListTable(props: props) {
  const authStore = useAppSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState<IPayoutData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const pageSize = !props.pageSize ? 10 : props.pageSize;

  const [menuAnchorEl, setMeuAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(menuAnchorEl);
  const [selecteditem, setSelectedItem] = useState<IPayoutData>(
    {} as IPayoutData
  );
  const [openApprovePayoutDialog, setOpenApprovePayoutDialog] =
    useState<boolean>(false);
  const [openPreviewPayoutDialog, setOpenPreviewPayoutDialog] =
    useState<boolean>(false);

  useEffect(() => {
    fetchPayouts();
    // eslint-disable-next-line
  }, [pageNum]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMeuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMeuAnchorEl(null);
  };

  const fetchPayouts = () => {
    setLoading(true);
    ApiGetPayouts(authStore.token, pageNum, pageSize)
      .then((response: IResponse<any>) => {
        setLoading(false);
        if (response.status === ResponseEnum.success) {
          const payoutData = response.data.results;
          const payoutTotal = response.data.total;
          setData(payoutData);
          setTotal(payoutTotal);
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
      .catch((error) => {
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
      return <PageEmpty title="There are no payout requests" />;
    }

    if (!loading && data?.length > 0) {
      return content();
    }
  };

  const content = () => {
    const dataColumns = [
      {
        name: "account_name",
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
                  {data[index].account_name}
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
        name: "total_payments",
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
                Total Payment
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
                  {convertToCurrency(
                    data[index].total_payments,
                    data[index].currency!
                  )}
                </Typography>
              </Box>
            );
          },
        },
      },
      {
        name: "created_at",
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
                Request Date
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
                  {convertToReadableDate(data[index].created_at)}
                </Typography>
              </Box>
            );
          },
        },
      },
      {
        name: "bank_name",
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
                Bank
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
                  {data[index].bank_name}
                </Typography>
                <Typography
                  sx={{
                    color: "#898989",
                    fontSize: "0.75em",
                  }}>
                  {data[index].account_number}
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
      {
        name: "",
        options: {
          customBodyRenderLite: (index: number) => {
            const item = data[index];
            return (
              <Box>
                <IconButton
                  onClick={(e) => {
                    handleClick(e);
                    setSelectedItem(item);
                  }}>
                  <MoreVert />
                </IconButton>
                <Menu
                  elevation={1}
                  anchorEl={menuAnchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                  }}
                  slotProps={{
                    paper: {
                      style: {
                        width: "250px",
                      },
                    },
                  }}>
                  <ListItem
                    button
                    onClick={() => {
                      setOpenPreviewPayoutDialog(true);
                      handleClose();
                      //handleViewInvoice(selecteditem);
                    }}>
                    <ListItemIcon>
                      <Info />
                    </ListItemIcon>
                    <ListItemText primary="Preview" />
                  </ListItem>

                  <ListItem
                    button
                    disabled={selecteditem.status === "approved" ? true : false}
                    onClick={() => {
                      setOpenApprovePayoutDialog(true);
                      handleClose();
                    }}>
                    <ListItemIcon>
                      <Approval />
                    </ListItemIcon>
                    <ListItemText primary="Approve" />
                  </ListItem>

                  {/* <Divider />

                  <ListItem
                    button
                    onClick={() => {
                      handleClose();
                    }}>
                    <ListItemIcon>
                      <Delete />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography color="red">Delete</Typography>}
                    />
                  </ListItem> */}
                </Menu>
              </Box>
            );
          },
        },
      },
    ];

    return (
      <Box>
        <MUIDataTable
          title={!props.title ? "Payouts" : props.title}
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

        {openPreviewPayoutDialog && (
          <PayoutPreviewDialog
            payoutId={selecteditem.id}
            openDialog={openPreviewPayoutDialog}
            onToggleDialog={(openDialog) => {
              setOpenPreviewPayoutDialog(openDialog);
            }}
          />
        )}

        {openApprovePayoutDialog && (
          <PayoutApprovalDialog
            data={selecteditem}
            openDialog={openApprovePayoutDialog}
            onToggleDialog={(openDialog) => {
              setOpenApprovePayoutDialog(openDialog);
            }}
          />
        )}
      </Box>
    );
  };

  return handleRenderContent();
}

export default ReduxProvider(PayoutListTable);
