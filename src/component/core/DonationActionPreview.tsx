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
import { initializePaystackPayment } from "../api/paymentApi";

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

    const secretKey = "sk_test_b936ac52ea2ff2f600d65a9b6330ddcd4a8ab8a7";
    const payload = {
      email: store.donationAction.email,
      amount: Number(store.donationAction.amount) * 100, //convert ammount to kobo
      currency: "NGN",
      callback_url: "http://localhost:3000/donate/2/verify",
    };

    initializePaystackPayment(secretKey, payload)
      .then((res) => {
        console.log(res);
        setLoading(true);
        return res?.data?.authorization_url;
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
        return "";
      });
  };

  const handlePay = () => {
    if (store.donationAction.paymentChannel === "PAYSTACK") {
      setLoading(true);

      const secretKey = "sk_test_b936ac52ea2ff2f600d65a9b6330ddcd4a8ab8a7";
      const payload = {
        email: store.donationAction.email,
        amount: Number(store.donationAction.amount) * 100, //convert ammount to kobo
        currency: "NGN",
        callback_url: "https://the-africa-vision.vercel.app/payment/verifypaystack?page=donate",
      };

      initializePaystackPayment(secretKey, payload)
        .then((res) => {
          console.log(res);
          setLoading(true);
          router.push(res?.data?.authorization_url);
        })
        .catch((err) => {
          console.log(err);
          setLoading(true);
        });
    }
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
