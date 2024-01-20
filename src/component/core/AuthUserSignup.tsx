import {
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ReduxProvider from "../common/ReduxProvider";
import Image from "next/image";
import Logo from "@/assets/tavlogo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../common/TextInput";
import { RemoveRedEye, Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ICountry } from "@/types/ICountry";
import { getCountries } from "../api/locationApi";
import PurpleButton from "../common/PurpleButton";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

function AuthUserSignup() {
  const router = useRouter();

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setLoadingCountries(true);
    getCountries()
      .then((res) => {
        const sorted = res
          .slice()
          .sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);
        setLoadingCountries(false);
      })
      .catch((err: any) => {
        enqueueSnackbar(
          "Could not fetch the list of countries. Check your network!",
          {
            variant: "warning",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
        setLoadingCountries(false);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      password: "",
      country: "",
      role: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Please enter your full name"),
      phone: Yup.string().required("Please enter your phone number"),
      email: Yup.string().required("Please enter your email address"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values: any) => {
    setLoading(true);
    console.log(values);
    setTimeout(() => {
      router.push("../auth/verify");
    }, 2000);
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
          <Image src={Logo} alt="Logo" width={150} height={50} />
          <br />
          <br />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.2em",
              color: "#120F0F",
            }}>
            {"Let's get you started"}
          </Typography>
          <br />
          <form onSubmit={formik.handleSubmit}>
            <TextInput
              label="Full Name"
              name="fullname"
              placeholder="Ade Tiger"
              value={formik.values.fullname}
              validate={formik.touched.fullname}
              validationMessage={formik.errors.fullname}
              onChange={formik.handleChange}
              type="text"
              size="small"
              fullWidth
              inputStyle={{
                background: "#FFF9FD",
                border: "1px solid #CCCCCC",
              }}
            />
            <br />
            <TextInput
              label="Email Address"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              validate={formik.touched.email}
              validationMessage={formik.errors.email}
              onChange={formik.handleChange}
              type="email"
              size="small"
              fullWidth
              inputStyle={{
                background: "#FFF9FD",
                border: "1px solid #CCCCCC",
              }}
            />
            <br />
            <TextInput
              label="Phone Number"
              name="phone"
              placeholder="800 2738 9700"
              value={formik.values.phone}
              validate={formik.touched.phone}
              validationMessage={formik.errors.phone}
              onChange={formik.handleChange}
              type="text"
              size="small"
              fullWidth
              inputStyle={{
                background: "#FFF9FD",
                border: "1px solid #CCCCCC",
              }}
              startIcon={<Typography marginRight="5px">+234</Typography>}
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
              size="small"
              fullWidth
              inputStyle={{
                background: "#FFF9FD",
                border: "1px solid #CCCCCC",
              }}
              endIcon={
                showPassword ? (
                  <Tooltip title="Show">
                    <IconButton onClick={() => setShowPassword(false)}>
                      <VisibilityOff />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Show">
                    <IconButton onClick={() => setShowPassword(true)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                )
              }
            />
            <Typography sx={{ color: "#CCCCCC", fontSize: "0.8em" }}>
              {`Password must contain a minimum of 8 characters.`}
            </Typography>
            <Typography sx={{ color: "#CCCCCC", fontSize: "0.8em" }}>
              {`Password must contain at lease on symbol e.g @`}
            </Typography>
            <br />
            <TextInput
              name="country"
              label="Location (optional)"
              placeholder="Enter your Country"
              fullWidth
              size="small"
              select
              selectedValue={formik.values?.country}
              onChange={formik.handleChange}
              inputStyle={{
                background: "#FFF9FD",
                border: "1px solid #A8518A",
              }}
              startIcon={
                loadingCountries ? <CircularProgress size={20} /> : <></>
              }>
              {countries?.map((item: ICountry) => {
                return (
                  <MenuItem value={item.cca2} key={item.cca2}>
                    <Stack direction="row" spacing={2}>
                      <Image
                        src={item.flags.png}
                        alt="Flag"
                        width={20}
                        height={20}
                      />
                      <Typography>{item.name.common}</Typography>
                    </Stack>
                  </MenuItem>
                );
              })}
            </TextInput>
            <br />
            <br />
            <PurpleButton
              text="Sign Up"
              size="small"
              fullWidth
              loading={loading}
              disabled={loading}
            />
          </form>
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
            Already a user?{" "}
            <Link href="/auth/login" style={{ color: "#A8518A" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ReduxProvider(AuthUserSignup);
