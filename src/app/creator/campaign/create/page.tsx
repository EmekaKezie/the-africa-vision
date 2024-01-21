"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import InputFile from "@/component/common/InputFile";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import TextInput from "@/component/common/TextInput";
import BreadCrumb from "@/component/core/BreadCrumb";
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
      <br/>
        <Box
          sx={{
            display: { md: "flex", xs: "Block" },
          }}>
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#0F172A",
                fontSize: "1.5em",
              }}>
              Create Campaign
            </Typography>

            <Box>
              <BreadCrumb
                data={[
                  {
                    displayName: "Dashboard",
                    url: "/creator/dashboard",
                    isActive: false,
                    divider: "/",
                  },
                  {
                    displayName: "Campaign",
                    url: "/creator/campaign",
                    isActive: false,
                    divider: "/",
                  },
                  {
                    displayName: "Create",
                    isActive: true,
                  },
                ]}
              />
            </Box>
          </Box>
        </Box>
        <br />
        <br />
        <Box>
          <Grid container>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <CampaignCreationForm />
            </Grid>
          </Grid>
        </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(CreateCampaign);
