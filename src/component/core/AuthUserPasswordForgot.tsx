import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/tavlogo.png";
import ImageSuccessful from "@/assets/email-verification-successfull.png";
import PurpleButton from "../common/PurpleButton";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../common/TextInput";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function AuthUserPasswordForgot() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email address"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      enqueueSnackbar("Successfull. An email has been sent to you", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }, 1000);
    
    setTimeout(() => {
      router.push("../auth/resetpassword");
    }, 3000);
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
            //display: "flex",
            //justifyContent: "center",
          }}>
          <Box>
            <Box>
              <Image src={Logo} alt="Logo" width={150} height={50} />
            </Box>
            <br />
            <br />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5em",
                color: "#120F0F",
                //textAlign: "center",
              }}>
              Reset Your Password
            </Typography>
            <br />
            <Typography
              sx={{
                fontSize: "1em",
                color: "#64748B",
                //textAlign: "center",
              }}>
              {`Enter the email address associated with your account and we will send you a link to reset your password.`}
            </Typography>
            <br />
            <br />
            <form onSubmit={formik.handleSubmit}>
              <Box>
                <TextInput
                  label="Email Address"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  validate={formik.touched.email}
                  validationMessage={formik.errors.email}
                  onChange={formik.handleChange}
                  type="email"
                  fullWidth
                  inputStyle={{
                    background: "#FFF9FD",
                    border: "1px solid #CCCCCC",
                  }}
                />
                <br />
                <PurpleButton
                  text="Reset Password"
                  fullWidth
                  disabled={loading}
                  loading={loading}
                />
              </Box>
            </form>

            <br />
            <Box
              
              sx={{
                textAlign:"center",
                fontSize: "0.8em",
                "&:hover": { opacity: 0.8 },
              }}>
              <Link href="/auth/login" style={{ color: "#A8518A" }}>
                Back to Login
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
