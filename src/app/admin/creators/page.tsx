"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import BreadCrumb from "@/component/core/BreadCrumb";
import CreatorList from "@/component/core/CreatorList";
import { creatorMockData } from "@/data/creatorMockData";
import { IUser } from "@/types/IUser";
import { Add } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Creators() {
  const router = useRouter();
  return (
    <AuthenticatedLayout>
      <Box
        sx={{
          display: { md: "flex", xs: "flex" },
        }}>
        <Box flexGrow={1}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#0F172A",
              fontSize: "1.5em",
            }}>
            Creators
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
              text="Add Creator"
              shade="purple"
              size="small"
              startIcon={<Add />}
            />
          </Link>
        </Box>
      </Box>
      <Box>
        <CreatorList
          data={creatorMockData}
          variation="tabular"
          redirectUrl="ssssd"
          onActionClick={(item: IUser, url, action) => {
            switch (action) {
              case "view":
                router.push(`creators/${item.id}/view`);
              default:
                router.push(`creators/${item.id}/view`);
                break;
            }
            console.log(item);
            console.log(url);
            console.log(action);
          }}
        />
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Creators);
