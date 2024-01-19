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

export default function AuthUserPasswordReset() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please enter your password"),
      confirmPassword: Yup.string().required(
        "Please enter your password again"
      ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      enqueueSnackbar("Successfull. Redirection to login", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }, 1000);

    setTimeout(() => {
      router.push("../auth/login");
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
              Create Password
            </Typography>
            <br />

            <br />
            <br />
            <form onSubmit={formik.handleSubmit}>
              <Box>
                <TextInput
                  label="Create Password"
                  name="password"
                  placeholder="Create Password"
                  value={formik.values.password}
                  validate={formik.touched.password}
                  validationMessage={formik.errors.password}
                  onChange={formik.handleChange}
                  type="password"
                  fullWidth
                  inputStyle={{
                    background: "#FFF9FD",
                    border: "1px solid #CCCCCC",
                  }}
                />
                <br />
                <TextInput
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  validate={formik.touched.confirmPassword}
                  validationMessage={formik.errors.confirmPassword}
                  onChange={formik.handleChange}
                  type="password"
                  fullWidth
                  inputStyle={{
                    background: "#FFF9FD",
                    border: "1px solid #CCCCCC",
                  }}
                />
                <br />
                <PurpleButton
                  text="Save"
                  fullWidth
                  disabled={loading}
                  loading={loading}
                />
              </Box>
            </form>

            <br />
            <Box
              sx={{
                textAlign: "center",
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
