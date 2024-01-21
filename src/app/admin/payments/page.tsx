"use client"
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import { Box } from "@mui/material";

function PaymentOverview() {
  return <AuthenticatedLayout></AuthenticatedLayout>;
}

export default ReduxProvider(PaymentOverview);
