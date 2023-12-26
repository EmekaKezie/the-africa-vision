"use client";
import ReduxProvider from "@/component/common/ReduxProvider";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import CoverImage from "@/assets/projects-thumbnail-1.png";
import TextInput from "@/component/common/TextInput";
import Link from "next/link";
import PurpleButton from "@/component/common/PurpleButton";
import Logo from "@/assets/tavlogo.png";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { userData } from "@/data/userData";
import { IAuth, IAuthStore } from "@/types/IAuth";
import { useAppDispatch } from "@/redux/useReduxHooks";
import { onLogin } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [remember, setRemember] = useState<boolean>(true);
  const [loginMessage, setLoginMesage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values: any) => {
    setLoginMesage("");
    setLoading(true);
    values = {
      ...values,
      rememberMe: remember,
    };

    setTimeout(() => {
      const getuser = userData.filter(
        (a: IAuth) => a.email === values.email
      )[0];
      if (getuser) {
        const payload: IAuthStore = {
          token: getuser.token,
          id: getuser.id,
          firstname: getuser.firstname,
          lastname: getuser.lastname,
          email: getuser.email,
          roleId: getuser.role.id,
          roleName: getuser.role.roleName,
        };
        dispatch(onLogin(payload));
        router.push("../admusr");
        setLoading(false);
      } else {
        setLoginMesage("Invalid credential!");
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <Box>
      <Grid container>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              //width:"50%",
              border: "0px solid gray",
            }}>
            <Box
              sx={{
                border: "0px solid red",
                width: { md: "50%", xs: "80%" },
              }}>
              <Image src={Logo} alt="Logo" width={150} height={50} />
              <br />
              <br />
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  color: "#120F0F",
                }}>
                Welcome Back!
              </Typography>
              <br />
              <Typography
                sx={{
                  fontSize: "0.8em",
                  color: "#2F840B",
                }}>
                Login to continue
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
                  <TextInput
                    label="Password"
                    name="password"
                    placeholder="Password"
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
                  <Box display="flex" alignItems="center">
                    <FormGroup sx={{ flexGrow: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            size="small"
                            name="remember"
                            sx={{ color: "#A8518A" }}
                            color="default"
                          />
                        }
                        label={
                          <Typography fontSize="0.75em" color="#CCCCCC">
                            Remember Password
                          </Typography>
                        }
                        value={remember}
                        onChange={() => {
                          setRemember(!remember);
                        }}
                      />
                    </FormGroup>
                    <Typography
                      sx={{
                        fontSize: "0.8em",
                        color: "#CCCCCC",
                        ":hover": {
                          textDecoration: "underline",
                        },
                      }}>
                      <Link href="/auth/forgetpassword">Forget Password?</Link>
                    </Typography>
                  </Box>
                  <br />
                  <br />
                  {loginMessage && (
                    <Alert severity="error">{loginMessage}</Alert>
                  )}
                  <br />
                  <PurpleButton
                    text="Log in"
                    fullWidth
                    loading={loading}
                    disabled={loading}
                  />
                  <br />
                  <br />
                </Box>
              </form>

              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "0.8em",
                  color: "#CCCCCC",
                  ":hover > a": {
                    textDecoration: "underline",
                  },
                }}>
                You do not have an account?{" "}
                <Link href="/auth/signup" style={{ color: "#A8518A" }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box
            sx={{
              display: { md: "block", xs: "none" },
              height: "100vh",
              backgroundImage: `url(${CoverImage.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}></Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReduxProvider(Login);
