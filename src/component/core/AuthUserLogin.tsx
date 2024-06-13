"use client";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import TextInput from "../common/TextInput";
import Link from "next/link";
import PurpleButton from "../common/PurpleButton";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/useReduxHooks";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IAuthStore, ILogin, ILoginSignupResponse } from "@/types/IAuth";
import { enqueueSnackbar } from "notistack";
import { onLogin, onLogout } from "@/redux/slices/authSlice";
import ReduxProvider from "../common/ReduxProvider";
import Image from "next/image";
import Logo from "@/assets/tavlogo.png";
import { loginApi } from "../api/authApi";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { onSessionValid } from "@/redux/slices/sessionSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function AuthUserLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [remember, setRemember] = useState<boolean>(true);
  const [loginMessage, setLoginMesage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  dispatch(onSessionValid({ isValid: false }));
  dispatch(onLogout());

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email address"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    setLoginMesage("");
    setLoading(true);

    values = {
      ...values,
      rememberMe: remember,
    };

    const payload: ILogin = {
      email: values.email,
      password: values.password,
    };

    await loginApi(payload)
      .then((response: IResponse<ILoginSignupResponse>) => {
        if (response.status === ResponseEnum.success) {
          const storeAuthPayload: IAuthStore = {
            isLoggedIn: true,
            token: response?.data?.token,
            id: response?.data?.user.id,
            fullname: response?.data?.user.fullname,
            email: response?.data?.user.email,
            role: response?.data?.user?.role ?? "",
            country: response?.data?.user?.country,
          };
          dispatch(onLogin(storeAuthPayload));
          dispatch(onSessionValid({ isValid: true }));
          handleRedirect(storeAuthPayload.role);
        } else {
          setLoading(false);
          setLoginMesage(response.message);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const handleRedirect = (role: string) => {
    switch (role.toUpperCase()) {
      case "USER":
        router.push("../creator/dashboard");
        break;
      case "ADMIN":
        router.push("../admin/dashboard");
        break;
      default:
        enqueueSnackbar("User has no defined role. Please contact admin", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        break;
    }
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
          }}>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Image src={Logo} alt="Logo" width={150} height={50} />
            </Box>
            <Box
              sx={{
                color: "#A8518A",
                fontWeight: "bold",
                ":hover": {
                  opacity: 0.8,
                },
              }}>
              <Link href={`/`}>Home</Link>
            </Box>
          </Box>
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
                type={showPassword ? "text" : "password"}
                fullWidth
                inputStyle={{
                  background: "#FFF9FD",
                  border: "1px solid #CCCCCC",
                }}
                endIcon={
                  showPassword ? (
                      <IconButton onClick={() => setShowPassword(false)}>
                        <VisibilityOff />
                      </IconButton>
                  ) : (
                      <IconButton onClick={() => setShowPassword(true)}>
                        <Visibility />
                      </IconButton>
                  )
                }
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
                      <Typography fontSize="0.75em" color="#667085">
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
                    fontSize: "0.75em",
                    color: "#667085",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}>
                  <Link href="/auth/forgotpassword">Forget Password?</Link>
                </Typography>
              </Box>
              <br />
              <br />
              {loginMessage && <Alert severity="error">{loginMessage}</Alert>}
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
              color: "#667085",
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
    </Box>
  );
}

export default ReduxProvider(AuthUserLogin);
