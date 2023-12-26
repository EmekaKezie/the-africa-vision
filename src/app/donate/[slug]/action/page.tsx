"use client";
import PurpleButton from "@/component/common/PurpleButton";
import { onClear, onDecrement, onIncrement } from "@/redux/slices/_testSlice";
import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";

import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ReduxProvider from "@/component/common/ReduxProvider";
import TextInput from "@/component/common/TextInput";
import Nav from "@/component/core/Nav";
import { useFormik } from "formik";
import { Close, Favorite, KeyboardArrowLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import PgFooter from "@/component/core/PgFooter";
import { useState } from "react";
import DonationActionForm from "@/component/core/DonationActionForm";
import DonationActionPreview from "@/component/core/DonationActionPreview";
import { onDonationAction } from "@/redux/slices/donateSlice";
import {
  SnackbarProvider,
  VariantType,
  enqueueSnackbar,
  useSnackbar,
} from "notistack";

function DonateAction() {
  const router = useRouter();
  const testReducerStore = useAppSelector((state) => state.testReducer);
  const store = useAppSelector((state) => state.donateReducer);
  const dispatch = useAppDispatch();

  const [donnationForm, setdonationForm] = useState<boolean>(true);

  const handeIncrement = () => {
    dispatch(onIncrement());
  };

  const handleDecrement = () => {
    dispatch(onDecrement());
  };

  const handleClear = () => {
    dispatch(onClear());
  };

  const handleBackButton = () => {
    if (store.donationAction.currentPage === 1) {
      dispatch(
        onDonationAction({
          currentPage: 0,
          paymentChannel: store.donationAction.paymentChannel,
          amount: store.donationAction.amount,
          fullname: store.donationAction.fullname,
          email: store.donationAction.email,
          phone: store.donationAction.phone,
          country: store.donationAction.country,
          message: store.donationAction.message,
        })
      );
    } else {
      router.push("/donate");
    }
  };

  const renderDonationForm = () => {
    return (
      <Box sx={{ padding: { md: "0 8rem", xs: "0 1rem" } }}>
        <DonationActionForm />
      </Box>
    );
  };

  const renderDonationPreview = () => {
    return (
      <Box
        sx={{
          padding: { md: "2rem 8rem", xs: "2rem 1rem" },
          backgroundColor: "#fae6f4",
        }}>
        <DonationActionPreview />
      </Box>
    );
  };

  const renderContent = () => {
    if (store.donationAction?.currentPage === 1) return renderDonationPreview();
    else return renderDonationForm();
    // if (donnationForm) return renderDonationForm();
    // else return renderDonationPreview();
  };

  return (
    <Box>
      <Nav />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ padding: { md: "0 8rem", xs: "0 1rem" } }}>
        <Stack direction="row" alignItems="center">
          <IconButton
            sx={{ backgroundColor: "#FFE1F5", marginRight:"5px" }}
            onClick={() => {
              handleBackButton();
            }}>
            <KeyboardArrowLeft />
          </IconButton>
          <Typography sx={{ color: "#667085" }}>Back</Typography>
        </Stack>
        <br />
      </Box>
      {renderContent()}
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ padding: { xs: "0 1rem", md: "0 8rem" } }}>
        <PgFooter />
      </Box>
    </Box>
  );
}

export default ReduxProvider(DonateAction);
