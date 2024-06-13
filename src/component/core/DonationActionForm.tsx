import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import TextInput from "@/component/common/TextInput";
import PurpleButton from "@/component/common/PurpleButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Close, Favorite } from "@mui/icons-material";
import { getCountries } from "../api/locationApi";
import Image from "next/image";
import { ICountry } from "@/types/ICountry";
import { usePathname, useRouter } from "next/navigation";
import { InitiatePaymentApi } from "../api/paymentApi";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { enqueueSnackbar } from "notistack";
import { paymentOptionData } from "@/data/paymentOptionData";

type props = {
  paymentOptions: string[];
  campaignTitle: string;
};

export default function DonationActionForm(props: props) {
  const router = useRouter();
  const pathname = usePathname();
  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[3];

  const [customAmount, setCustomAmount] = useState<string>("");
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loadingCountries, setLoadingCountries] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("");
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<string>("");

  useEffect(() => {
    setLoadingCountries(true);
    getCountries()
      .then((res) => {
        console.log(res)
        const sorted = res
          .slice()
          .sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);
        setLoadingCountries(false);
        //console.log(sorted);
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

  const handleSelectPaymentOption = (e: any) => {
    setSelectedPaymentOption(e.target.value);
    //setSelectedPaymentOption(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      amount: "",
      name: "",
      email: "",
      // phone: !store.donationAction.phone ? "" : store.donationAction.phone,
      country: "",
      //message: "",
    },
    validationSchema: Yup.object({
      // fullname: Yup.string().required("Please enter your Fullname"),
      email: Yup.string().required("Please enter your Email Address"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values: any) => {
    setLoading(true);
    const payload = {
      amount: Number(values?.amount),
      campaign_id: pageId,
      payment_gateway: selectedPaymentOption,
      currency: currency,
      description: props.campaignTitle,
      email: values.email,
      name: values.name,
    };

    InitiatePaymentApi(payload)
      .then((response: IResponse<any>) => {
        if (response.status === ResponseEnum.success) {
          const checkoutUrl = response.data.payment_checkout_url;
          router.push(checkoutUrl);
        } else {
          enqueueSnackbar(response.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Failed to initate payment", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
    //setLoading(false);
    //dispatch(onDonationAction(payload));
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
                          const obj = item["currencies"];
                          const theCurrency = Object.keys(obj)[0];
                          setCurrency(theCurrency);
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
              </Grid>

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
                          width: "70px",
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
                        {currency}
                      </Box>
                    }
                  />

                  {/* <PurpleButton
                    text="Custom Amount"
                    style={{ width: "300px" }}
                    type="button"
                    onClick={() => {
                      formik.values.amount = "100000";
                      setCustomAmount(formik.values.amount);
                    }}
                  /> */}
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
                    name="name"
                    label="Fullname"
                    value={formik.values.name}
                    placeholder="Enter your Fullname"
                    fullWidth
                    onChange={formik.handleChange}
                    inputStyle={{
                      background: "#FFF9FD",
                      border: "1px solid #A8518A",
                    }}
                    validate={!formik.errors.name}
                    validationMessage={formik.errors.name}
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
                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
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
                </Grid> */}

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <FormControl>
                    <FormLabel>Payment Option</FormLabel>
                    <RadioGroup row>
                      {paymentOptionData?.map((item) => (
                        <FormControlLabel
                          label={`${item.name} - ${item.desc}`}
                          control={<Radio />}
                          value={item.name}
                          key={item.id}
                          //onChange={handleSelectPaymentOption}
                          onClick={(e) => handleSelectPaymentOption(e)}
                          style={{ color: "black" }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <br />
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
