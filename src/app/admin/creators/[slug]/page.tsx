"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import BreadCrumb from "@/component/core/BreadCrumb";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IUser } from "@/types/IUser";
import { creatorMockData } from "@/data/creatorMockData";
import { usePathname } from "next/navigation";
import CreatorDetail from "@/component/core/CreatorDetail";
import CreatorStatCards from "@/component/core/CreatorStatCards";
import TransactionTable from "@/component/core/TransactionTable";
import { transactionData } from "@/data/transactionData";

function ViewCreatorDetail() {
  const pathname = usePathname();
  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[3];

  const [data, setData] = useState<IUser>({} as IUser);

  useEffect(() => {
    const item = creatorMockData.filter((i: IUser) => i.id === pageId)[0];
    setData(item);
    // eslint-disable-next-line
  }, []);
  return (
    <AuthenticatedLayout>
      <Box
        sx={{
          display: { md: "flex", xs: "block" },
        }}>
        <Box flexGrow={1}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#0F172A",
              fontSize: "1.5em",
            }}>
            Creator Details
          </Typography>

          <Box>
            <BreadCrumb
              data={[
                {
                  displayName: "Dashboard",
                  url: "/admin/dashboard",
                  isActive: false,
                  divider: "/",
                },
                {
                  displayName: "Creators",
                  url: "/admin/creators",
                  isActive: false,
                  divider: "/",
                },
                {
                  displayName: "Creator Details",
                  isActive: true,
                },
              ]}
            />
          </Box>
        </Box>

        <Box
          sx={{
            justifyContent: { md: "end" },
          }}>
          <Link href={`/creators/create`}>
            <PurpleButton
              text="Delete Creator"
              shade="purple"
              size="small"
              startIcon={<Delete />}
            />
          </Link>
        </Box>
      </Box>

      <br />

      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={5} xs={12}>
          <Box>
            <CreatorDetail data={data} />
          </Box>
        </Grid>
        <Grid item lg={8} md={8} sm={7} xs={12}>
          <Box>
            <CreatorStatCards />
          </Box>
          <br />
          <Box>
            <TransactionTable data={transactionData} elevation={1}/>
          </Box>
        </Grid>
      </Grid>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(ViewCreatorDetail);
