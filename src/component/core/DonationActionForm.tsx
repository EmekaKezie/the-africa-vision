import {
  Box,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TextInput from "@/component/common/TextInput";
import PurpleButton from "@/component/common/PurpleButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Close, Favorite } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import { onDonationAction } from "@/redux/slices/donateSlice";
import { IDonationActionStore } from "@/types/IDonation";
import { getCountries } from "../api/locationApi";
import Image from "next/image";
import { ICountry } from "@/types/ICountry";

export default function DonationActionForm() {
  const [customAmount, setCustomAmount] = useState<string>("");
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // getLocationByIpAddress()
    //   .then((res: any) => {
    //     console.log(res);
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   });
  }, []);

  useEffect(() => {
    getCountries()
      .then((res) => {
        const sorted = res
          .slice()
          .sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);
        console.log(sorted);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const store = useAppSelector((state) => state.donateReducer);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      amount: !store.donationAction.amount ? "" : store.donationAction.amount,
      fullname: !store.donationAction.fullname
        ? ""
        : store.donationAction.fullname,
      email: !store.donationAction.email ? "" : store.donationAction.email,
      phone: !store.donationAction.phone ? "" : store.donationAction.phone,
      country: !store.donationAction.country
        ? ""
        : store.donationAction.country,
      message: !store.donationAction.message
        ? ""
        : store.donationAction.message,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Please enter your Fullname"),
      email: Yup.string().required("Please enter your Email Address"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      const payload: IDonationActionStore = {
        currentPage: 1,
        paymentChannel: "",
        amount: values?.amount,
        fullname: values.fullname,
        email: values.email,
        phone: values.phone,
        country: values.country,
        message: values.message,
      };
      setLoading(false);
      dispatch(onDonationAction(payload));
    }, 2000);
  };
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "1.5em",
          fontWeight: "bold",
        }}>
        Donate Now
      </Typography>
      <br />
      <br />
      <Box>
        <Grid container>
          <Grid item lg={6} xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <br />
                <Typography
                  sx={{
                    color: "#667085",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}>
                  Enter donation amount
                </Typography>
                <Box display="flex" gap={1} border={0}>
                  <TextInput
                    name="amount"
                    value={
                      !formik.values.amount
                        ? customAmount
                        : formik.values.amount
                    }
                    placeholder="Enter Amount"
                    type="number"
                    fullWidth
                    onChange={formik.handleChange}
                    inputStyle={{
                      background: "#F9FEF7",
                    }}
                    endIcon={
                      <IconButton
                        onClick={() => {
                          setCustomAmount("");
                          formik.values.amount = "";
                        }}>
                        <Close />
                      </IconButton>
                    }
                    startIcon={
                      <Box
                        sx={{
                          border: "1px solid gray",
                          width: "56px",
                          height: "56px",
                          marginLeft: "-15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "10px",
                          background: "#A8518A",
                          color: "#FFFFFF",
                          borderTopLeftRadius: "5px",
                          borderBottomLeftRadius: "5px",
                        }}>
                        N
                      </Box>
                    }
                  />

                  <PurpleButton
                    text="Custom Amount"
                    style={{ width: "300px" }}
                    type="button"
                    onClick={() => {
                      formik.values.amount = "100000";
                      setCustomAmount(formik.values.amount);
                    }}
                  />
                </Box>
              </Grid>
              <br />
              <br />
              <br />
              <br />
              <Typography fontSize="1.1em" fontWeight="bold">
                Personal Info
              </Typography>
              <br />
              <Grid container spacing={4}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <TextInput
                    name="fullname"
                    label="Fullname"
                    value={formik.values.fullname}
                    placeholder="Enter your Fullname"
                    fullWidth
                    onChange={formik.handleChange}
                    inputStyle={{
                      background: "#FFF9FD",
                      border: "1px solid #A8518A",
                    }}
                    validate={!formik.errors.fullname}
                    validationMessage={formik.errors.fullname}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <TextInput
                    name="email"
                    label="Email Address"
                    value={formik.values.email}
                    placeholder="Enter your Emaill Address"
                    fullWidth
                    onChange={formik.handleChange}
                    inputStyle={{
                      background: "#FFF9FD",
                      border: "1px solid #A8518A",
                    }}
                    validate={!formik.touched.email}
                    validationMessage={formik.errors.email}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <TextInput
                    name="phone"
                    label="Phone Number"
                    value={formik.values.phone}
                    placeholder="Enter your Phone Number"
                    fullWidth
                    onChange={formik.handleChange}
                    inputStyle={{
                      background: "#FFF9FD",
                      border: "1px solid #A8518A",
                    }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <TextInput
                    name="country"
                    label="Country"
                    placeholder="Enter your Country"
                    fullWidth
                    select
                    selectedValue={formik.values?.country}
                    onChange={formik.handleChange}
                    inputStyle={{
                      background: "#FFF9FD",
                      border: "1px solid #A8518A",
                    }}>
                    {countries?.map((item: ICountry) => {
                      //  <ListItem button>
                      //   <ListItemIcon>
                      //     <Image src={item.flags.png} alt="Flag" width={20} height={20}/>
                      //   </ListItemIcon>
                      //   <ListItemText secondary={item.name.common}/>
                      //  </ListItem>

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
                    {/* <MenuItem value="A">Country A</MenuItem>
                    <MenuItem value="B">Country B</MenuItem> */}
                  </TextInput>

                  {/* <TextField
                    name="country"
                    value={formik.values.country}
                    select
                    fullWidth
                    // SelectProps={{
                    //   value: "B",
                    // }}
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">Country B</MenuItem>
                  </TextField> */}
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextInput
                    name="message"
                    value={formik.values.message}
                    placeholder="Add message here . . ."
                    fullWidth
                    rows={5}
                    onChange={formik.handleChange}
                    inputStyle={{
                      background: "#FFF9FD",
                      border: "1px solid #A8518A",
                    }}
                  />
                </Grid>
              </Grid>
              <br />
              <PurpleButton
                text="Donate"
                endIcon={<Favorite />}
                style={{ width: "150px" }}
                loading={loading}
                disabled={loading}
              />
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
