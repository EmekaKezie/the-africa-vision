import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import PurpleButton from "../common/PurpleButton";
import { useState } from "react";
import { getDogs } from "../api/testApi";
import { IDonationActionStore } from "@/types/IDonation";
import { onDonationAction } from "@/redux/slices/donateSlice";
import { useRouter } from "next/navigation";
import { initializePayment } from "@/component/api/paymentApi";
import { v4 as uniqueId } from "uuid";

export default function DonationActionPreview() {
  const router = useRouter();
  const store = useAppSelector((state) => state.donateReducer);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  //console.log(store.donationAction);

  //   getDogs()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  const handleChange = (event: any) => {
    const selected = event.target.value;
    console.log(selected);

    const payload: IDonationActionStore = {
      currentPage: store.donationAction.currentPage,
      paymentChannel: selected,
      amount: store.donationAction.amount,
      fullname: store.donationAction.fullname,
      email: store.donationAction.email,
      phone: store.donationAction.phone,
      country: store.donationAction.country,
      message: store.donationAction.message,
    };
    dispatch(onDonationAction(payload));
  };

  // const handlePaystackInitialize = async () => {
  //   setLoading(true);
  //   const payload = {
  //     email: store.donationAction.email,
  //     amount: Number(store.donationAction.amount) * 100, //convert ammount to kobo
  //     currency: "NGN",
  //     callback_url: "http://localhost:3000/donate/2/verify",
  //   };

  //   console.log(payload);

  //   const response = await fetch(
  //     "https://api.paystack.co/transaction/initialize",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(payload),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization:
  //           "Bearer sk_test_b936ac52ea2ff2f600d65a9b6330ddcd4a8ab8a7",
  //       },
  //     }
  //   );

  //   const data = response.json();
  //   return data;
  // };

  const handlePayWithPaystack = () => {
    setLoading(true);
    const url = "https://api.paystack.co/transaction/initialize";
    const secretKey = "sk_test_b936ac52ea2ff2f600d65a9b6330ddcd4a8ab8a7";
    //const callbackUrl = "https://the-africa-vision.vercel.app/payment/verifypaystack?page=donate";
    const callbackUrl =
      "http://localhost:3000/payment/verifypaystack?page=donate";
    const payload = {
      reference: uniqueId(),
      email: store.donationAction.email,
      amount: Number(store.donationAction.amount) * 100, //convert ammount to kobo
      currency: "NGN",
      callback_url: callbackUrl,
    };

    initializePayment(url, secretKey, payload)
      .then((res) => {
        console.log(res);
        setLoading(false);
        router.push(res?.data?.authorization_url);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handlePaymentWithFlutterwave = () => {
    setLoading(true);
    const url = "https://api.flutterwave.com/v3/payments";
    const secretKey = "FLWSECK_TEST-6bdd359e9888a0c32433452f2951d6bd-X";
    const callbackUrl =
      "http://localhost:3000/payment/verifyflutterwave?page=donate";
    const payload = {
      tx_ref: uniqueId(),
      amount: Number(store.donationAction.amount),
      currency: "NGN",
      redirect_url: callbackUrl,
      customer: {
        email: store.donationAction.email,
        phonenumber: store.donationAction?.phone ?? "",
        name: store.donationAction.fullname,
      },
    };

    console.log(payload);
    console.log(store.donationAction.paymentChannel);

    initializePayment(url, secretKey, payload)
      .then((res) => {
        console.log(res);
        setLoading(false);
        //router.push(res?.data?.link);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  const handlePay = () => {
    console.log(store.donationAction.paymentChannel.toUpperCase());
    // switch (store.donationAction.paymentChannel.toUpperCase()) {
    //   case "FLUTTERWAVE":
    //     handlePaymentWithFlutterwave();
    //     break;
    //   case "PAYSTACK":
    //     handlePayWithPaystack();
    //     break;
    //   default:
    //     console.log("Payment gateway was not selected");
    //     break;
    // }

    handlePaymentWithFlutterwave();

    // if (store.donationAction.paymentChannel === "PAYSTACK") {
    //   handlePayWithPaystack();
    // }

    // if (store.donationAction.paymentChannel === "FLUTTERWAVE") {
    //   handlePaymentWithFlutterwave();
    // }
  };

  return (
    <Box>
      <Box>
        <Typography
          sx={{
            fontSize: "1.5em",
            fontWeight: "bold",
          }}>
          Donatation Summary
        </Typography>
        <Typography sx={{ fontSize: "0.9em", color: "#667085" }}>
          Please confirm details and proceed to payment
        </Typography>
      </Box>
      <br />
      <br />
      <Grid container>
        <Grid item lg={6} xs={12}>
          <Grid container>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography>Fullname:</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {store.donationAction.fullname}
            </Grid>
            <br />
            <br />
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography>Email Address:</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {store.donationAction.email}
            </Grid>
            <br />
            <br />
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography>Phone Number:</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {store.donationAction.phone}
            </Grid>
            <br />
            <br />
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography>Country:</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {store.donationAction.country}
            </Grid>
            <br />
            <br />
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography>Remarks:</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {store.donationAction.message}
            </Grid>
            <br />
            <br />
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography>Amount:</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {store.donationAction.amount}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
      <Box>
        <Typography
          sx={{
            fontSize: "1.1em",
            fontWeight: "bold",
          }}>
          Select payment method
        </Typography>
        <br />
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="paymentChanel">
            <FormControlLabel
              value="PAYSTACK"
              control={<Radio />}
              label="Paystack (Best for local users)"
              onClick={handleChange}
            />
            <FormControlLabel
              value="FLUTTERWAVE"
              control={<Radio />}
              label="Flutter Wave (Best for loca/international users)"
              onClick={handleChange}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <br />
      <Box>
        <PurpleButton
          text="Confirm Payment"
          type="button"
          loading={loading}
          disabled={loading}
          onClick={handlePay}
          style={{ width: "200px" }}
        />
      </Box>
    </Box>
  );
}
