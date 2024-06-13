"use client";
import { Box, IconButton, Stack, Typography } from "@mui/material";

import ReduxProvider from "@/component/common/ReduxProvider";
import Nav from "@/component/core/Nav";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import PgFooter from "@/component/core/PgFooter";
import { useEffect, useState } from "react";
import DonationActionForm from "@/component/core/DonationActionForm";
import { enqueueSnackbar } from "notistack";
import { ApiGetCampaignByIdForAll } from "@/component/api/campaignApi";
import { ICampaignData } from "@/types/ICampaign";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import LoadingPage from "@/component/core/LoadingPage";
import PageEmpty from "@/component/core/PageEmpty";

function ExploreDonateAction() {
  const router = useRouter();
  const pathname = usePathname();

  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[splitPathname.length - 2];

  const [campaign, setCampaign] = useState<ICampaignData | undefined>();
  const [loadingCampaign, setLoadingCampaign] = useState<boolean>(true);

  useEffect(() => {
    fetchCampaign();
    // eslint-disable-next-line
  }, []);

  const fetchCampaign = () => {
    setLoadingCampaign(true);
    ApiGetCampaignByIdForAll(pageId)
      .then((response: IResponse<any>) => {
        if (response.status === ResponseEnum.success) {
          const campaignData = response?.data;
          setCampaign(campaignData);
        }
        setLoadingCampaign(false);
      })
      .catch((error: any) => {
        setLoadingCampaign(false);
        enqueueSnackbar("Error fetching content", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const handleBackButton = () => {
    router.push(`/explore/donate/${pageId}`);
  };

  const renderContent = () => {
    if (loadingCampaign) {
      return <LoadingPage />;
    }

    if (!loadingCampaign && !campaign) {
      return (
        <PageEmpty
          title="Page not found"
          subtitle={<Box>{"We can't find what you are looking for"}</Box>}
        />
      );
    }

    if (!loadingCampaign && campaign) {
      return (
        <Box sx={{ padding: { md: "0 8rem", xs: "0 1rem" } }}>
          <DonationActionForm
            paymentOptions={campaign?.payment_options ?? []}
            campaignTitle={campaign?.title ?? "Donation"}
          />
        </Box>
      );
    }
  };

  return (
    <Box>
      <Nav />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ padding: { md: "0 8rem", xs: "0 1rem" } }}>
        <Stack direction="row" alignItems="center">
          <IconButton
            onClick={() => {
              handleBackButton();
            }}>
            <KeyboardArrowLeft />
          </IconButton>
          <Box component={"h3"} marginLeft={"1rem"} color="black">
            {campaign?.title}
          </Box>
        </Stack>
        <br />
        <br />
        <br />
      </Box>
      {renderContent()}
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ padding: { xs: "0 1rem", md: "0 8rem" } }}>
        <PgFooter />
      </Box>
    </Box>
  );
}

export default ReduxProvider(ExploreDonateAction);
