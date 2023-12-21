"use client"
import ReduxProvider from "@/component/common/ReduxProvider";
import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";

function DonateVerify() {
  const searchParam = useSearchParams();
  const reference = searchParam.get("reference");

  return <Box>{reference}</Box>;
}

export default ReduxProvider(DonateVerify);
