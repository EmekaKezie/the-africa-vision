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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ICountry } from "@/types/ICountry";
import { getCountries } from "../api/locationApi";
import PurpleButton from "../common/PurpleButton";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { IAuthStore, ISignup } from "@/types/IAuth";
import { signupApi } from "../api/authApi";
import { useAppDispatch } from "@/redux/useReduxHooks";
import { onLogin } from "@/redux/slices/authSlice";

function AuthUserSignup() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDialCode, setIsDialCode] = useState<boolean>(false);

  //console.log(isDialCode);

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
    // eslint-disable-next-line
  }, []);

  const getCountryName = (countryCode: string): string => {
    const country = countries.filter(
      (x: ICountry) => x.cca2 === countryCode
    )[0];
    const countryName = country?.name?.common;
    return countryName;
  };

  const getCountryDialCode = (countryCode: string): string => {
    const country = countries.filter(
      (x: ICountry) => x.cca2 === countryCode
    )[0];
    const dialCode = `${country?.idd?.root}${country?.idd?.suffixes[0]}`;
    return dialCode;
  };

  const getPhoneNumberValueIfDialcodeExists = (
    dialCode: string,
    phoneNumber: string
  ) => {
    if (dialCode) {
      if (phoneNumber.charAt(0) === "0") return phoneNumber.substring(1);
      else return phoneNumber;
    } else phoneNumber;
  };

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
      country: Yup.string().required("Please enter your location"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values: any) => {
    setLoading(true);

    let phoneNumber;

    if (isDialCode) {
      const dial = getCountryDialCode(values.country);
      const mob = getPhoneNumberValueIfDialcodeExists(dial, values.phone);
      phoneNumber = `${dial}${mob}`;
    } else {
      phoneNumber = values.phone;
    }

    if (phoneNumber.charAt(0) === "+") {
      phoneNumber = phoneNumber.substring(1);
    }

    const payload: ISignup = {
      fullname: values.fullname,
      email: values.email,
      phone: phoneNumber,
      password: values.password,
      country: getCountryName(values.country),
    };

    signupApi(payload)
      .then((response) => {
        setLoading(false);
        if (response.status === "success") {
          const storeAuthPayload: IAuthStore = {
            isLoggedIn: false,
            token: response?.data?.token,
            id: response?.data?.user.id,
            fullname: response?.data?.user.fullname,
            email: response?.data?.user.email,
            role: response?.data?.user.role,
            country: "",
          };
          dispatch(onLogin(storeAuthPayload));

          enqueueSnackbar("Successfully created", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });

          setTimeout(() => {
            router.push("../auth/verify");
          }, 1000);
        } else {
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
              name="country"
              label="Location"
              placeholder="Enter your Country"
              fullWidth
              size="small"
              select
              selectedValue={formik.values?.country}
              validate={formik.touched.country}
              validationMessage={formik.errors.country}
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
                  <MenuItem
                    value={item.cca2}
                    key={item.cca2}
                    onClick={() => {
                      if (item.cca2) setIsDialCode(true);
                      else setIsDialCode(false);
                    }}>
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
              //value={formik.values.phone}
              value={getPhoneNumberValueIfDialcodeExists(
                formik.values.country,
                formik.values.phone
              )}
              validate={formik.touched.phone}
              validationMessage={formik.errors.phone}
              onChange={formik.handleChange}
              type="test"
              size="small"
              fullWidth
              inputStyle={{
                background: "#FFF9FD",
                border: "1px solid #CCCCCC",
              }}
              startIcon={
                <Typography marginRight="5px">
                  {!formik.values?.country
                    ? ""
                    : getCountryDialCode(formik.values?.country)}
                </Typography>
              }
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
            <Typography sx={{ color: "#667085", fontSize: "0.8em" }}>
              {`Password must contain a minimum of 8 characters.`}
            </Typography>
            <Typography sx={{ color: "#667085", fontSize: "0.8em" }}>
              {`Password must contain at lease on symbol e.g @`}
            </Typography>
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
              color: "#667085",
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
