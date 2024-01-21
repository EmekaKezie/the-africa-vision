"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import TextInput from "@/component/common/TextInput";
import BreadCrumb from "@/component/core/BreadCrumb";
import PayoutSummary from "@/component/core/PayoutSummary";
import { payoutSummaryData } from "@/data/transactionData";
import { Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import * as Yup from "yup";

function Payout() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [confirmPayoutDetailLoading, setConfirmPayoutDetailLoading] =
    useState<boolean>(false);
  const [requestPayoutLoading, setRequestPayoutLoading] =
    useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      bankAccountNo: "2109232323",
      bankName: "Unity Bank for Africa",
      bankAccountName: "Daniel Jones",
    },
    validationSchema: Yup.object({
      bankAccountNo: Yup.string().required("Please enter Bank Account No."),
      bankName: Yup.string().required("Please enter Bank Name"),
      bankAccountName: Yup.string().required("Please enter Bank Account Name"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values: any) => {
    setConfirmPayoutDetailLoading(true);
    setShowDialog(true);
  };

  const handleRequestPayout = () => {
    setRequestPayoutLoading(true);
    const param = {
      bankName: formik.values.bankName,
      bankAccountNo: formik.values.bankAccountNo,
      bankAccountName: formik.values.bankAccountName,
    };
    if (param) {
      setTimeout(() => {
        setShowDialog(false);
        enqueueSnackbar("Payour requested successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }, 2000);
      setTimeout(() => {
        router.push("../transaction");
      }, 3000);
    }
  };

  return (
    <AuthenticatedLayout>
      <Box>
        <BreadCrumb
          data={[
            {
              displayName: "Payment",
              url: "/transaction",
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
      <Box>
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
                <Box display={`flex`}>
                  <Typography flexGrow={1}>Bank Account</Typography>
                  <Typography>Use saved bank account</Typography>
                </Box>
                <br />
                <Alert severity="warning">
                  <Typography
                    fontSize="0.9em"
                    fontWeight="bold">{`Please make sure the name of the account is the same name on the project creator as admin won't accept bank detail of secondary holder`}</Typography>
                </Alert>
                <br />
                <br />
                <Box>
                  <form onSubmit={formik.handleSubmit}>
                    <TextInput
                      name="bankName"
                      label="Bank Name"
                      placeholder="Enter Bank Name"
                      value={formik.values.bankName}
                      fullWidth
                      onChange={formik.handleChange}
                      validate={formik.touched.bankName}
                      validationMessage={formik.errors.bankName}
                    />
                    <br />
                    <TextInput
                      name="bankAccountNo"
                      label="Bank Account Number"
                      placeholder="Enter Bank Account Number"
                      value={formik.values.bankAccountNo}
                      fullWidth
                      onChange={formik.handleChange}
                      validate={formik.touched.bankAccountNo}
                      validationMessage={formik.errors.bankAccountNo}
                    />
                    <br />
                    <TextInput
                      name="bankAccountName"
                      label="Bank Account Name"
                      placeholder="Enter Bank Account Name"
                      value={formik.values.bankAccountName}
                      fullWidth
                      onChange={formik.handleChange}
                      validate={formik.touched.bankAccountName}
                      validationMessage={formik.errors.bankAccountName}
                    />
                    <br />
                    <PurpleButton
                      text="Confirm Bank Details"
                      disabled={confirmPayoutDetailLoading}
                      //loading={confirmPayoutDetailLoading}
                      fullWidth
                    />
                  </form>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={showDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography flexGrow={1} fontWeight="bold">
              Confirm Details
            </Typography>
            <IconButton
              onClick={() => {
                setShowDialog(false);
                setConfirmPayoutDetailLoading(false);
              }}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box display="flex" padding="0.5rem 0">
              <Typography width="30%">Bank Name</Typography>
              <Typography>{formik.values.bankName}</Typography>
            </Box>
            <Box display="flex" padding="0.5rem 0">
              <Typography width="30%">Bank Account No.</Typography>
              <Typography>{formik.values.bankAccountNo}</Typography>
            </Box>
            <Box display="flex" padding="0.5rem 0">
              <Typography width="30%">Bank Account Name</Typography>
              <Typography>{formik.values.bankAccountName}</Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "0 1rem 1rem 1rem" }}>
          <PurpleButton
            text="Request Payout"
            size="small"
            onClick={handleRequestPayout}
            disabled={requestPayoutLoading}
            loading={requestPayoutLoading}
          />
        </DialogActions>
      </Dialog>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Payout);
