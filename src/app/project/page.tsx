"use client";


import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

export default function Projects(){
    const router = usePathname();

  console.log(router)
    return(<Box>dssd</Box>)
}