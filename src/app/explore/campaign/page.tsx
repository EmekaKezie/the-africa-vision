"use client";

import ReduxProvider from "@/component/common/ReduxProvider";
import UnauthenticatedLayout from "@/component/common/UnauthenticatedLayout";
import Hero from "@/component/core/Hero";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

function ExploreCampaignPage() {
  const router = usePathname();

  console.log(router);
  return (
    <UnauthenticatedLayout>
      <br />
      <br />
      <br />
      <br />

      <Hero pageName="Campaigns" />
      <br />
      <br />
    </UnauthenticatedLayout>
  );
}

export default ReduxProvider(ExploreCampaignPage);
