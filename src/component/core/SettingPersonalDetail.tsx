import { Avatar, Box, Button, DialogActions, Grid, Typography } from "@mui/material";
import TextInput from "../common/TextInput";
import * as Yup from "yup"
import { useFormik } from "formik";
import PurpleButton from "../common/PurpleButton";
import { IUser2 } from "@/types/IUser";
import { useEffect, useState } from "react";
import { Person } from "@mui/icons-material";

type props = {
    data: IUser2
}

export default function SettingPersonalDetail(props: props) {
    console.log(props.data.fullname)
    const [fullname, setFullname] = useState<string>(props.data?.fullname)
    const [email, setEmail] = useState<string>(props.data?.email)
    const [phone, setPhone] = useState<string>(props.data?.phone)
    const [country, setCount] = useState<string>(props.data?.country)
    const [city, setCity] = useState<string>(props.data?.city ?? "")
    const [address, setAddress] = useState<string>(props.data?.address ?? "")


    useEffect(() => {
        setFullname(props.data?.fullname)
    }, [props.data])

    const formik = useFormik({
        initialValues: {
            fullname: fullname,
            phone: phone,
            country: country,
            city: city,
            address: address
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required("Please enter your full name"),
        }),
        onSubmit: () => { }
    })


    return (
        <Box sx={{
            padding: "1rem"
        }}>
            <Box sx={{
                display: "flex"
            }}>
                <Box>
                    <Typography
                        sx={{
                            fontSize: "0.8em",
                            //pointerEvents: !item.isActive ? "auto" : "none",
                            //color: !item.isActive ? "#ADBCD0" : "#120F0F",
                            color: "#120F0F",
                            fontWeight: "bold",
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                        }}
                    >
                        Personal Information
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "0.8em",
                            //pointerEvents: !item.isActive ? "auto" : "none",
                            //color: !item.isActive ? "#ADBCD0" : "#120F0F",
                            color: "#898989",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                        }}
                    >
                        Update your photo and personal details here.
                    </Typography>
                </Box>
                <Box>

                </Box>
            </Box>

            <br />

            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <Box display="flex" justifyContent="center" paddingTop="1rem">
                                <Box>
                                    <Box>
                                        <Avatar sx={{
                                            width: "120px",
                                            height: "120px"
                                        }}>
                                            <Person sx={{
                                                width: "100px",
                                                height: "100px"
                                            }} />
                                        </Avatar>
                                    </Box>
                                    <Box>
                                        <Button>Change Avatar</Button>
                                    </Box>
                                </Box>
                            </Box>

                        </Grid>
                        <Grid item lg={9} md={9} sm={12} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <TextInput
                                        name="fullname"
                                        placeholder="Enter your fullname"
                                        value={formik.values.fullname}
                                        label="Full Name"
                                        fullWidth
                                        validate={formik.touched.fullname}
                                        validationMessage={formik.errors.fullname}
                                        onChange={formik.handleChange} />
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <TextInput
                                        name="fullname"
                                        label="Email (You cannot change your email)"
                                        fullWidth
                                        disabled
                                        value={props.data.email}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <TextInput
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={formik.values.phone}
                                        label="Phone number"
                                        fullWidth
                                        onChange={formik.handleChange} />
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <TextInput
                                        name="country"
                                        value={formik.values.country}
                                        label="Country"
                                        fullWidth
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                    <TextInput
                                        name="city"
                                        value={formik.values.city}
                                        label="City"
                                        fullWidth
                                        onChange={formik.handleChange} />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <TextInput
                                        name="address"
                                        value={formik.values.address}
                                        label="Address"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        rows={2} />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Box display="flex" justifyContent="end">
                                        <PurpleButton text="Save Changes" />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>

            </Box>
        </Box >
    )
}