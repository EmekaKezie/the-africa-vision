import ReduxProvider from "@/component/common/ReduxProvider";
import AuthUserBanner from "@/component/core/AuthUserBanner";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/tavlogo.png";
import TextInput from "../common/TextInput";
import { useRef, useState } from "react";
import PurpleButton from "../common/PurpleButton";
import { resentVerificationCodeApi, verifyEmailApi } from "../api/authApi";
import { IResendVerificationCode, IVerifyEmail } from "@/types/IAuth";
import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import { onLogout } from "@/redux/slices/authSlice";
import { enqueueSnackbar } from "notistack";

type props = {
  onVerify: (isVerified: boolean) => void;
};

function AuthUserSignupEmailVerifier(props: props) {
  const authStore = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const optLength = 6;
  const [otp, setOtp] = useState(Array(optLength).fill(""));
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingResendCode, setLoadingResendCode] = useState<boolean>(false);

  const handleChange = (index: any, value: any) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    setLoading(true);
    const concatedOtp = otp.join("");
    const payload: IVerifyEmail = {
      email: authStore.email,
      otp: concatedOtp,
    };

    verifyEmailApi(payload)
      .then((response) => {
        if (response.status === "success") {
          enqueueSnackbar(response.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          dispatch(onLogout());

          setTimeout(() => {
            if (props.onVerify) props.onVerify(true);
          }, 1000);
          setLoading(false);
        } else {
          enqueueSnackbar(response.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          setLoading(false);
        }
      })
      .catch((error: any) => {});
  };

  const handleResendVerificationCode = () => {
    setLoadingResendCode(true);
    const payload: IResendVerificationCode = {
      email: authStore.email,
    };
    resentVerificationCodeApi(payload)
      .then((response) => {
        setLoadingResendCode(false);
        if (response.status === "success") {
          enqueueSnackbar(response.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        } else {
          setLoadingResendCode(false);
          enqueueSnackbar(response.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      })
      .catch((error: any) => {
        enqueueSnackbar("Something went wrong.", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  return (
    <Box>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "0px solid gray",
        }}>
        <Box
          sx={{
            border: "0px solid red",
            width: { md: "50%", xs: "80%" },
            display: "flex",
            justifyContent: "center",
          }}>
          <Box>
            <Box textAlign="center">
              <Image src={Logo} alt="Logo" width={150} height={50} />
            </Box>
            <br />
            <br />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5em",
                color: "#120F0F",
                textAlign: "center",
              }}>
              Verify Your Email
            </Typography>
            <br />
            <br />
            <br />
            <Typography
              sx={{
                fontSize: "1em",
                color: "#120F0F",
                textAlign: "center",
              }}>
              {`A verification code was sent to your email. Please input the code in the boxes below to verify your account.`}
            </Typography>
            <br />
            <br />
            <Box display="flex" justifyContent="center">
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                }}>
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    type="text"
                    variant="outlined"
                    size="small"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                    inputProps={{
                      style: {
                        marginLeft: "5px",
                        border: "1px",
                      },
                      maxLength: 1,
                    }}
                    //maxLength={1}
                    //style={{ marginRight: "8px" }}
                  />
                ))}
              </Box>
            </Box>
            <br />
            <br />
            <br />
            <PurpleButton
              text="Verify"
              fullWidth
              onClick={handleVerify}
              disabled={loading}
              loading={loading}
            />
            <br />
            <br />
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "0.8em",
                color: "#667085",
                ":hover > a": {
                  textDecoration: "underline",
                },
              }}>
              {"Didn't receive an email? "}
              <Button
                onClick={handleResendVerificationCode}
                variant="text"
                size="small"
                style={{ textTransform: "none" }}>
                {!loadingResendCode ? "Resend" : "Resending . . "}
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ReduxProvider(AuthUserSignupEmailVerifier);
