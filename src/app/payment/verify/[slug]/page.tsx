"use client";
import { useEffect, useState } from "react";
import { VerifyPaymentApi } from "@/component/api/paymentApi";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { Box, CircularProgress, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import ReduxProvider from "@/component/common/ReduxProvider";
import PageEmpty from "@/component/core/PageEmpty";

function VerifyPayment() {
  const router = useRouter();
  const path = usePathname();
  const pathSplit: string[] = path.split("/");
  const reference = pathSplit[3];
  console.log(reference);

  //const searchParam = useSearchParams();
  //const reference = searchParam.get("reference");
  //const page = searchParam.get("page");

  const [message, setMessage] = useState(
    "We are verifying your payment. Please wait . . ."
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    handleVerifyPayment();
    // eslint-disable-next-line
  }, [reference]);

  const handleVerifyPayment = () => {
    if (reference) {
      //console.log(reference);
      VerifyPaymentApi(reference)
        .then((response: IResponse<any>) => {
          //console.log(response.message);
          if (response.status === ResponseEnum.success) {
            enqueueSnackbar(response.message, {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
            setMessage("Redirecting . . .");
            router.push("/");
          } else {
            enqueueSnackbar(response.message, {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
            setLoading(false);
            setMessage("");
            setIsValid(false);
          }
        })
        .catch((error) => {
          console.log(error);
          //   enqueueSnackbar("Failed to verify payment", {
          //     variant: "error",
          //     anchorOrigin: {
          //       vertical: "top",
          //       horizontal: "right",
          //     },
          //   });
        });
    }
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
          {loading && (
            <CircularProgress
              sx={{
                color: "#A8518A",
              }}
            />
          )}

          <Typography
            sx={{
              color: "#667085",
            }}>
            {message}
          </Typography>

          {!isValid && (
            <PageEmpty
              title="Payment not found"
              subtitle={
                <Box>{"We can't find the payment you want to verify"}</Box>
              }
              redirect={{
                url: "/",
                text: "Return To Home",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ReduxProvider(VerifyPayment);
