"use client";
import { verifyPaystackPayment } from "@/component/api/paymentApi";
import ReduxProvider from "@/component/common/ReduxProvider";
import { onDonationAction } from "@/redux/slices/donateSlice";
import { useAppDispatch } from "@/redux/useReduxHooks";
import { IDonationActionStore } from "@/types/IDonation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PaystackPaymentVerify() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const reference = searchParam.get("reference");
  const page = searchParam.get("page");
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState("Verifying . . .");

  useEffect(() => {
    handleVerifyPayment();
  }, [reference]);

  const handleDispatch = () => {
    const payload: IDonationActionStore = {
      currentPage: 0,
      paymentChannel: "",
      amount: "",
      fullname: "",
      email: "",
      phone: "",
      country: "",
      message: "",
    };
    dispatch(onDonationAction(payload));
  };

  const handleRedirect = () => {
    setMessage("Redirecting . . .");
    if (page === "donate") {
      handleDispatch();
      router.push("/donate");
    }
  };

  const handleVerifyPayment = () => {
    const secretKey = "sk_test_b936ac52ea2ff2f600d65a9b6330ddcd4a8ab8a7";
    verifyPaystackPayment(reference!, secretKey)
      .then((res) => {
        if (res?.data.gateway_response === "Successful") {
          handleRedirect();
        }
      })
      .catch((err) => {
      });
  };

  return (
    <Box>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress
            sx={{
              color: "#A8518A",
            }}
          />
          <Typography
            sx={{
              color: "#667085",
            }}>
            {message}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ReduxProvider(PaystackPaymentVerify);
