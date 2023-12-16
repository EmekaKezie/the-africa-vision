"use client";


import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

export default function CampaignPage(){
    const router = usePathname();

  console.log(router)
    return(<Box>Campaign</Box>)
}