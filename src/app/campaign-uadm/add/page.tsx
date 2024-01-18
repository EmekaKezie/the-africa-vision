"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import InputFile from "@/component/common/InputFile";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import TextInput from "@/component/common/TextInput";
import CampaignCreationForm from "@/component/core/CampaignCreationForm";
import { categoryData } from "@/data/categoryData";
import { paymentOptionData } from "@/data/paymentOptionData";
import { ICategory } from "@/types/ICategory";
import { IPaymentOption } from "@/types/IPayment";
import { Close, InvertColors } from "@mui/icons-material";
import {
  Box,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { useFormik } from "formik";
import MUIRichTextEditor from "mui-rte";
import { useState } from "react";
import * as Yup from "yup";

function CreateCampaign() {
  return (
    <AuthenticatedLayout>
      <Box>
        <Box>
          <Typography
            component="div"
            sx={{
              color: "#120F0F",
              fontSize: { md: "2em", xs: "1.5em" },
              fontWeight:"bold"
            }}>
            Create a New Project
          </Typography>
        </Box>
        <br/>
        <Box>
          <Grid container>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <CampaignCreationForm />
            </Grid>
          </Grid>
        </Box>
      </Box>

    </AuthenticatedLayout>
  );
}

export default ReduxProvider(CreateCampaign);
