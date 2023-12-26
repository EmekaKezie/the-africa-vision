import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
} from "@mui/material";
import PurpleButton from "../common/PurpleButton";
import { useEffect, useState } from "react";
import { getDogs } from "../api/testApi";
import { IDonationActionStore } from "@/types/IDonation";
import { onDonationAction } from "@/redux/slices/donateSlice";
import { useRouter } from "next/navigation";
import { initializePayment } from "@/component/api/paymentApi";
import { v4 as uniqueId } from "uuid";
import { ICountry } from "@/types/ICountry";
import { getCountryByCode } from "../api/locationApi";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

export default function DonationActionPreview() {
  const router = useRouter();
  const store = useAppSelector((state) => state.donateReducer);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<ICountry[]>([]);

  //console.log(store.donationAction);

  //   getDogs()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  useEffect(() => {
    getCountryByCode(store.donationAction.country)
      .then((res: any) => {
        //console.log(res)
        setCountry(res);
      })
      .catch((err: any) => {
        //console.log(err);
      });
  }, []);

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
    const url = "https://api.paystack.co/transaction/initialize";
    const secretKey = "sk_test_b936ac52ea2ff2f600d65a9b6330ddcd4a8ab8a7";
    //const callbackUrl = "https://the-africa-vision.vercel.app/payment/verifypaystack?page=donate";
    const callbackUrl =
      "https://the-africa-vision.vercel.app/payment/verifypaystack?page=donate";
    const payload = {
      reference: uniqueId(),
      email: store.donationAction.email,
      amount: Number(store.donationAction.amount) * 100, //convert ammount to kobo
      currency: "NGN",
      callback_url: callbackUrl,
    };

    initializePayment(url, secretKey, payload)
      .then((res) => {
        //console.log(res);
        //setLoading(false);
        router.push(res?.data?.authorization_url);
      })
      .catch((err) => {
        //console.log(err);
        setLoading(false);
      });
  };

  const handlePaymentWithFlutterwave = () => {
    setLoading(true);
    const url = "https://api.flutterwave.com/v3/payments";
    const secretKey = "FLWPUBK_TEST-1ae6b0675012cd2aeee313e4bd86b85b-Xsss";
    const callbackUrl =
      "https://the-africa-vision.vercel.app/payment/verifyflutterwave?page=donate";
    const payload = {
      tx_ref: uniqueId(),
      amount: store.donationAction.amount,
      currency: "NGN",
      redirect_url: callbackUrl,
      customer: {
        email: store.donationAction.email,
        phonenumber: store.donationAction?.phone ?? "",
        name: store.donationAction.fullname,
      },
    };

    initializePayment(url, secretKey, payload)
      .then((res) => {
        setLoading(false);
        console.log("thunder");
        console.log(res);

        //router.push(res?.data?.link);
      })
      .catch((err) => {
        //console.log(err);
        setLoading(false);
        enqueueSnackbar(
          <Box>
            <Typography fontSize="1em">Something went wrong!</Typography>
            <Typography fontSize="0.8em">
              Please try again or use another payment option
            </Typography>
          </Box>,
          {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          }
        );
      });

    // verifyFlutterwavePayment(
    //   "7f8b01dedcc1e8caf7db",
    //   "FLWSECK_TEST-6bdd359e9888a0c32433452f2951d6bd-X"
    // )
    //   .then((res) => {
    //     //console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handlePay = () => {
    //console.log(store.donationAction.paymentChannel.toUpperCase());
    switch (store.donationAction.paymentChannel.toUpperCase()) {
      case "FLUTTERWAVE":
        handlePaymentWithFlutterwave();
        break;
      case "PAYSTACK":
        handlePayWithPaystack();
        break;
      default:
        console.log("Payment gateway was not selected");
        break;
    }

    //handlePaymentWithFlutterwave();

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
            color: "black",
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
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085" fontWeight="bold">
                Fullname:
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085">
                {store.donationAction.fullname}
              </Typography>
            </Grid>
            <br />
            <br />
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085" fontWeight="bold">
                Email Address:
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085">
                {store.donationAction.email}
              </Typography>
            </Grid>
            <br />
            <br />
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085" fontWeight="bold">
                Phone Number:
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085">
                {store.donationAction.phone}
              </Typography>
            </Grid>
            <br />
            <br />
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085" fontWeight="bold">
                Country:
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085">
                {/* {store.donationAction.country} */}
                {country[0]?.name?.common}
              </Typography>
            </Grid>
            <br />
            <br />
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085" fontWeight="bold">
                Remarks:
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085">
                {store.donationAction.message}
              </Typography>
            </Grid>
            <br />
            <br />
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085" fontWeight="bold">
                Amount:
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography color="#667085">
                {store.donationAction.amount}
              </Typography>
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
            color: "black",
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
              control={<Radio sx={{ color: "#667085" }} />}
              label="Paystack (Best for local users)"
              onClick={handleChange}
            />
            <FormControlLabel
              value="FLUTTERWAVE"
              control={<Radio sx={{ color: "#667085" }} />}
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

      {/* <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={true}
        message="Snack bar"
      /> */}
    </Box>
  );
}
