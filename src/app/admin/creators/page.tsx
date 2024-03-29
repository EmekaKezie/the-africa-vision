"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import PurpleButton from "@/component/common/PurpleButton";
import ReduxProvider from "@/component/common/ReduxProvider";
import BreadCrumb from "@/component/core/BreadCrumb";
import CreatorList from "@/component/core/CreatorList";
import { creatorMockData } from "@/data/creatorMockData";
import { IUser } from "@/types/IUser";
import { Add } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Creators() {
  const router = useRouter();

  const handleOnClickCampaignActions = (
    item: IUser,
    url: string,
    action: string
  ) => {
    if (action === "view") {
      router.push(`${url}/${item.id}`);
    }
  };
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
          redirectUrl="creators"
          onActionClick={(item: IUser, url, action) => {
            handleOnClickCampaignActions(item, url, action);
          }}
        />
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(Creators);
