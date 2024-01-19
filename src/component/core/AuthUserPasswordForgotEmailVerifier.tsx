import ReduxProvider from "@/component/common/ReduxProvider";
import AuthUserBanner from "@/component/core/AuthUserBanner";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/tavlogo.png";
import TextInput from "../common/TextInput";
import { useRef, useState } from "react";
import PurpleButton from "../common/PurpleButton";

type props = {
  onVerify: (isVerified: boolean, ) => void;
};

function AuthUserPasswordForgotEmailVerifier(props: props) {
  const optLength = 4;
  const [otp, setOtp] = useState(Array(optLength).fill(""));
  const [loading, setLoading] = useState<boolean>(false);



  const handleChange = (index: any, value: any) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

   
  };

  const handleVerify = () => {
    const concatedOtp = otp.join("");
    if (concatedOtp.length === optLength) {
      setLoading(true);
      setTimeout(() => {
        if (props.onVerify) props.onVerify(true);
      }, 2000);
    }
    //if (props.onVerify) props.onVerify(true);
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
              {`Input the four digit pin sent to your email address to verify your account.`}
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
                color: "#CCCCCC",
                ":hover > a": {
                  textDecoration: "underline",
                },
              }}>
              {"Didn't receive an email? "}
              <Button
                variant="text"
                size="small"
                style={{ textTransform: "none" }}>
                Resend
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ReduxProvider(AuthUserPasswordForgotEmailVerifier);
