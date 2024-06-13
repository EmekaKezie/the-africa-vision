"use client";
import { ApiGetCampaignsForUser } from "@/component/api/campaignApi";
import {
  ApiCalculatePayout,
  GetBankAccountsApi,
  RequestPayoutApi,
} from "@/component/api/paymentApi";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ExpiredSessionModal from "@/component/common/ExpiredSessionModal";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import BreadCrumb from "@/component/core/BreadCrumb";
import CampaignList from "@/component/core/CampaignList";
import LoadingPage from "@/component/core/LoadingPage";
import PageEmpty from "@/component/core/PageEmpty";
import PayoutBankAccountCreationForm from "@/component/core/PayoutBankAccountCreationForm";
import PayoutBankAcounts from "@/component/core/PayoutBankAcounts";
import { useAppSelector } from "@/redux/useReduxHooks";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { IBankData } from "@/types/IBank";
import { ICampaignData } from "@/types/ICampaign";
import { IPayoutCalculation } from "@/types/IPayout";
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

function Payout() {
  const authStore = useAppSelector((state) => state.authReducer);
  const [requestPayoutLoading, setRequestPayoutLoading] =
    useState<boolean>(false);
  const [addBankDialog, setAddBankDialog] = useState<boolean>(false);
  const [banks, setBanks] = useState<IBankData[]>([]);
  const [loadingBanks, setLoadingBanks] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<IBankData | undefined>();
  const [requesPayoutDialog, setRequestPayoutDialog] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<ICampaignData[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(false);
  const [selectedCampaign, setSelectedCampaing] = useState<
    ICampaignData | undefined
  >();
  const [campaignDialog, setCampaignDialog] = useState<boolean>(false);
  const [isSessionValid, setIsSessionValid] = useState<boolean>(true);
  const [loadingPayoutCalculation, setLoadingPayoutCalculation] =
    useState<boolean>(false);
  const [payoutCalculation, setPayoutCalculationg] = useState<
    IPayoutCalculation | undefined
  >();

  useEffect(() => {
    fetchBanks();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedCampaign) {
      fetchPayoutCalculation();
    }
    // eslint-disable-next-line
  }, [selectedCampaign]);

  const fetchBanks = () => {
    setLoadingBanks(true);
    GetBankAccountsApi(authStore.token)
      .then((response: IResponse<any>) => {
        setLoadingBanks(false);
        if (response.status === ResponseEnum.success) {
          const bankData = response.data;
          setBanks(bankData);
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
          setIsSessionValid(false);
        }
      })
      .catch((error) => {
        setLoadingBanks(false);
      });
  };

  const fetchCampaigns = () => {
    setLoadingCampaigns(true);
    ApiGetCampaignsForUser(authStore.token)
      .then((response: IResponse<any>) => {
        setLoadingCampaigns(false);
        if (response.status === ResponseEnum.success) {
          const campaignData = response?.data?.campaigns;
          setCampaigns(campaignData);
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
          setIsSessionValid(false);
        }
      })
      .catch((error: any) => {
        setLoadingCampaigns(false);
        enqueueSnackbar("Error fetching projects", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const fetchPayoutCalculation = () => {
    setLoadingPayoutCalculation(true);
    ApiCalculatePayout(selectedCampaign?.id!, authStore.token)
      .then((response: IResponse<any>) => {
        setLoadingPayoutCalculation(false);
        if (response.status === ResponseEnum.success) {
          const payoutCalculationData = response.data;
          setPayoutCalculationg(payoutCalculationData);
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
          setIsSessionValid(false);
        }
      })
      .catch((error: any) => {
        setLoadingPayoutCalculation(false);
      });
  };

  const handleRequestPayout = () => {
    setRequestPayoutLoading(true);
    const payload = {
      campaign_id: selectedCampaign?.id,
      account_id: selectedBank?.id,
    };

    RequestPayoutApi(payload, authStore.token)
      .then((response: IResponse<any>) => {
        setRequestPayoutLoading(false);
        if (response.status === ResponseEnum.success) {
          setRequestPayoutDialog(false);
          enqueueSnackbar(response.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
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
          setRequestPayoutDialog(false);
          setIsSessionValid(false);
        }
      })
      .catch((error) => {
        setRequestPayoutLoading(false);
        enqueueSnackbar("Something went wrong. Please try again", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const renderBanks = () => {
    if (loadingBanks) return <LoadingPage pageHeight={40} />;
    if (!loadingBanks && !banks?.length) return <PageEmpty />;
    if (!loadingBanks && banks?.length > 0) {
      return (
        <PayoutBankAcounts
          data={banks}
          onRequestPayout={(item: IBankData) => {
            setSelectedBank(item);
            setCampaignDialog(!campaignDialog);
          }}
        />
      );
    }
  };

  const renderCampaignDialog = () => {
    if (loadingCampaigns) return <LoadingPage />;
    if (!loadingCampaigns && campaigns?.length > 0) {
      return (
        <Dialog
          open={campaignDialog}
          onClose={() => setCampaignDialog(!campaignDialog)}>
          <DialogTitle>Select Campaign</DialogTitle>
          <DialogContent>
            <CampaignList
              variation="itemized"
              data={campaigns}
              onActionClick={(item) => {
                setSelectedCampaing(item);
                setCampaignDialog(!campaignDialog);
                setRequestPayoutDialog(!requesPayoutDialog);
              }}
            />
          </DialogContent>
        </Dialog>
      );
    }
  };

  const renderPayoutRequestDialog = () => {
    return (
      <Dialog open={requesPayoutDialog}>
        <br />
        <DialogContent>
          <DialogContentText>
            <Box sx={{ border: "1px solid lightgray" }}>
              <Box padding="1rem ">
                {`You are about to request for payout for your campaign -`}{" "}
                <strong>{selectedCampaign?.title}</strong>.
              </Box>
              <Alert severity="warning">
                {`Note that the payout will be made to the account - `}
                <strong>
                  {selectedBank?.bank_name}({selectedBank?.account_number})
                </strong>
              </Alert>
            </Box>
            <br />

            <Box sx={{ border: "1px solid lightgray" }}>
              <Alert severity="info" icon={false}>
                See Payout Calculation
              </Alert>

              <Box sx={{ height: "200px", overflowY: "scroll" }}>
                <ListItem>
                  <ListItemText
                    primary={`Company Percentage (International): ${
                      payoutCalculation?.company_percentage ?? 0
                    }`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Company Percentage (Local): ${
                      payoutCalculation?.company_percentage_local ?? 0
                    }`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Payment Gateway (International): ${
                      payoutCalculation?.payment_gateway_fee ?? 0
                    }`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Payment Gateway (Local): ${
                      payoutCalculation?.payment_gateway_local ?? 0
                    }`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Payout: ${payoutCalculation?.payout ?? 0}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Total Payment: ${
                      payoutCalculation?.total_payments ?? 0
                    }`}
                  />
                </ListItem>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "1rem" }}>
          <PurpleButton
            text="Cancel"
            size="small"
            style={{
              border: "1px solid #A8518A",
              background: "#FFFFFF",
              width: "100px",
              color: "#A8518A",
            }}
            onClick={() => setRequestPayoutDialog(!requesPayoutDialog)}
          />
          <PurpleButton
            text="Request Payout"
            size="small"
            disabled={requestPayoutLoading}
            loading={requestPayoutLoading}
            onClick={handleRequestPayout}
          />
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <AuthenticatedLayout>
      <Box>
        <BreadCrumb
          data={[
            {
              displayName: "Payment",
              url: "/creator/payout",
              isActive: false,
              divider: "/",
            },
            {
              displayName: "Request a Payout",
              isActive: true,
            },
          ]}
        />
      </Box>
      <br />
      <Box>
        <Typography
          component="div"
          sx={{
            color: "#120F0F",
            fontSize: { md: "1.8em", xs: "1.3em" },
            fontWeight: "bold",
          }}>
          Request a Payout
        </Typography>
        <br />
        <Typography
          sx={{
            color: "#120F0F",
            fontSize: "0.9em",
          }}>
          {`Please note that Africa vision take a percentage on all transaction on the system and this will be made available in the budget break down and you will see all the total charges from the system.`}
        </Typography>
      </Box>
      <br />
      <br />
      {/* <Box>
        <Typography
          sx={{
            color: "#23262F",
            fontSize: "1.5em",
          }}>
          Payout Summary
        </Typography>
        <br />
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box>
              <PayoutSummary data={payoutSummaryData} />
              <br />
              <br />
              <Typography
                sx={{
                  //   border: "1",
                  //   borderStyle: "dashed",
                  //   borderColor: "#484C56",
                  border: "1px dashed gray",
                }}></Typography>
              <br />
              <br />
              <Box>
                <Box display={`flex`} alignItems="center">
                  <Typography flexGrow={1}>Bank Account</Typography>
                  <Button
                    sx={{
                      textTransform: "none",
                      background: "transparent",
                      borderRadius: "5px",
                      "&:hover": {
                        background: "transparent",
                        opacity: 0.8,
                      },
                    }}
                    onClick={() => setAddBankDialog(!addBankDialog)}>
                    {" "}
                    <AddCircle
                      sx={{ fontSize: "16px", marginRight: "5px" }}
                    />{" "}
                    Add Bank Account
                  </Button>
                </Box>
                <br />
                <Alert severity="warning">
                  <Typography
                    fontSize="0.9em"
                    fontWeight="bold">{`Please make sure the name of the account is the same name on the project creator as admin won't accept bank detail of secondary holder`}</Typography>
                </Alert>
                <br />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box> */}

      <Box>
        <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {renderBanks()}
          </Grid>
        </Grid>
      </Box>

      <PayoutBankAccountCreationForm
        open={addBankDialog}
        onToggle={(toggle: boolean) => {
          setAddBankDialog(toggle);
        }}
      />

      {renderPayoutRequestDialog()}
      {renderCampaignDialog()}

      {!isSessionValid && <ExpiredSessionModal />}
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Payout);
