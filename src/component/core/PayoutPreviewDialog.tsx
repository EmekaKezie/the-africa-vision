import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import { IPayoutData } from "@/types/IPayout";
import { Close } from "@mui/icons-material";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ApiGetPayoutById } from "../api/paymentApi";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { enqueueSnackbar } from "notistack";
import { onSessionValid } from "@/redux/slices/sessionSlice";
import LoadingPage from "./LoadingPage";
import PageEmpty from "./PageEmpty";
import { convertToCurrency, statusHandler } from "../common/helpers";

type props = {
  openDialog: boolean;
  payoutId: string;
  onToggleDialog: (openDialog: boolean) => void;
};

export default function PayoutPreviewDialog(props: props) {
  const authStore = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [data, setData] = useState<IPayoutData | undefined>();

  const tabList: string[] = ["Information", "Percentage", "Bank Detail"];

  useEffect(() => {
    fetchPayout();
    // eslint-disable-next-line
  }, []);

  const fetchPayout = () => {
    setLoading(true);
    ApiGetPayoutById(authStore.token, props.payoutId)
      .then((response: IResponse<any>) => {
        setLoading(false);
        if (response.status === ResponseEnum.success) {
          const payoutData = response.data;
          console.log(payoutData);
          setData(payoutData);
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

  const handleToggleDialog = () => {
    if (props.onToggleDialog) props.onToggleDialog(!props.onToggleDialog);
  };

  const handleTabChange = (e: any, value: number) => {
    setTabIndex(value);
  };

  const renderContent = () => {
    if (loading) return <LoadingPage pageHeight={40} message="Loading" />;

    if (!loading && !data) return <PageEmpty />;

    if (!loading && data) return content();
  };

  const content = () => {
    return (
      <Box
        sx={{
          //padding: "1rem",
          backgroundColor: "#FFFFFF",
          height: "100%",
          //boxShadow: "1px 1px 5px lightgray",
          borderRadius: "5px",
          display: "flex",
        }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
          orientation="vertical">
          {tabList.map((item: string, index: number) => (
            <Tab
              key={index}
              label={
                <Box
                  sx={{
                    color: "#A9518B",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    textTransform: "none",
                  }}>
                  {item}
                </Box>
              }
            />
          ))}
        </Tabs>
        {/* <Divider /> */}
        {tabIndex === 0 && renderPayoutInformation()}
        {tabIndex === 1 && renderPayoutPercentage()}
        {tabIndex === 2 && renderPayoutBankDetails()}
      </Box>
    );
  };

  const renderPayoutInformation = () => {
    return (
      <Box sx={{ padding: "0 1rem", height: "300px" }}>
        <ListItem>
          <ListItemText
            primary="Campaign"
            secondary={data?.campaign_id}></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Creator's Email"
            secondary={data?.email}></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Payout Status"
            secondary={
              <Chip
                sx={{
                  backgroundColor: statusHandler(data?.status!).backgroundColor,
                  color: statusHandler(data?.status!).color,
                  //padding: "",
                  textTransform: "capitalize",
                  width: "80px",
                }}
                size="small"
                label={data?.status!}
              />
            }></ListItemText>
        </ListItem>
      </Box>
    );
  };

  const renderPayoutPercentage = () => {
    return (
      <Box sx={{ padding: "0 1rem", height: "300px", overflowY: "scroll" }}>
        <ListItem>
          <ListItemText
            primary="Amount"
            secondary={
              <Box>{convertToCurrency(data?.amount!, data?.currency!)}</Box>
            }></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Company Percentage (Local)"
            secondary={data?.company_percentage_local}></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Company Percentage (International)"
            secondary={data?.company_percentage_international}></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Payment Gateway Percentage (Local)"
            secondary={data?.payment_gateway_local}></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Payment Gateway Percentage (International)"
            secondary={data?.payment_gateway_international}></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Total Payment"
            secondary={
              <Box>
                {convertToCurrency(data?.total_payments!, data?.currency!)}
              </Box>
            }></ListItemText>
        </ListItem>
      </Box>
    );
  };

  const renderPayoutBankDetails = () => {
    return (
      <Box sx={{ padding: "0 1rem", height: "300px" }}>
        <ListItem>
          <ListItemText
            primary="Bank Name"
            secondary={data?.bank_name}></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Account Name"
            secondary={data?.account_name}></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Account Number"
            secondary={data?.account_number}></ListItemText>
        </ListItem>
      </Box>
    );
  };

  return (
    <Dialog open={props.openDialog} maxWidth="sm" fullWidth>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}>
        <Box flexGrow={1}>
          <DialogTitle>Payout Preview</DialogTitle>
        </Box>
        <Box padding="0 1rem">
          <IconButton onClick={handleToggleDialog}>
            <Close></Close>
          </IconButton>
        </Box>
      </Box>
      <DialogContent>
        <DialogContentText>{renderContent()}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
