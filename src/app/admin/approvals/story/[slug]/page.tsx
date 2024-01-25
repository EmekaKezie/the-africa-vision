"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import BreadCrumb from "@/component/core/BreadCrumb";
import { storyData } from "@/data/storyData";
import { IStory } from "@/types/IStory";
import { Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function AdminApproveStoryView() {
  const pathname = usePathname();
  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[4];

  const [data, setData] = useState<IStory>({} as IStory);

  useEffect(() => {
    const item = storyData.filter((i: IStory) => i.id === pageId)[0];
    setData(item);
     // eslint-disable-next-line
  }, []);

  return (
    <AuthenticatedLayout>
      <br />
      <Box
        sx={{
          display: { md: "flex" },
        }}>
        <Box flexGrow={1}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#0F172A",
              fontSize: "1.5em",
            }}>
            {data?.title}
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
                  displayName: "Approvals > Story",
                  url: "/admin/approvals",
                  isActive: false,
                  divider: "/",
                },
                {
                  displayName: data.title,
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
          {/* <Link href={`/creators/create`}>
            <PurpleButton
              text="Add Creator"
              shade="purple"
              size="small"
              startIcon={<Add />}
            />
          </Link> */}
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(AdminApproveStoryView);
