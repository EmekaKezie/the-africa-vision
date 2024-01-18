"use client";

import ReduxProvider from "@/component/common/ReduxProvider";
import UnauthenticatedLayout from "@/component/common/UnauthenticatedLayout";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

function CampaignPage() {
  const router = usePathname();

  console.log(router);
  return <UnauthenticatedLayout></UnauthenticatedLayout>;
}

export default ReduxProvider(CampaignPage);
