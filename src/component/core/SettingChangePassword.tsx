import { Box, Grid, Typography } from "@mui/material";
import * as Yup from "yup"
import { useFormik } from "formik";
import TextInput from "../common/TextInput";
import PurpleButton from "../common/PurpleButton";

export default function SettingChangePassword() {

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required("Please enter current password"),
            newPassword: Yup.string().required("Please enter new password"),
            confirmPassword: Yup.string().required("Please confirm new password")
        }),
        onSubmit: () => { }
    })

    return (
        <Box sx={{
            padding: "1rem"
        }}>
            <Box
                sx={{
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
                        Change Password
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
                        Here you can change password
                    </Typography>
                </Box>


            </Box>
            
            
            <br />


            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item lg={5} md={5} sm={6} xs={12}>
                            <Grid container  spacing={2}>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <TextInput
                                        name="currentPassword"
                                        placeholder="Enter current password"
                                        value={formik.values.currentPassword}
                                        label="Current Password"
                                        fullWidth
                                        validate={formik.touched.currentPassword}
                                        validationMessage={formik.errors.currentPassword}
                                        onChange={formik.handleChange} />
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <TextInput
                                        name="newPassword"
                                        placeholder="Enter new password"
                                        value={formik.values.newPassword}
                                        label="New password"
                                        fullWidth
                                        validate={formik.touched.newPassword}
                                        validationMessage={formik.errors.newPassword}
                                        onChange={formik.handleChange} />
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <TextInput
                                        name="confirmPassword"
                                        placeholder="Confirm new password"
                                        value={formik.values.confirmPassword}
                                        label="Confirm Password"
                                        fullWidth
                                        validate={formik.touched.confirmPassword}
                                        validationMessage={formik.errors.confirmPassword}
                                        onChange={formik.handleChange} />
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
        </Box>
    )
}