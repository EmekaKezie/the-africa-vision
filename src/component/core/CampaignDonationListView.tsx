import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import { ICampaignData } from "@/types/ICampaign";
import { useEffect, useState } from "react";
import { ApiGetDonationsByCampaignId } from "../api/campaignApi";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { enqueueSnackbar } from "notistack";
import { onSessionValid } from "@/redux/slices/sessionSlice";
import { Box } from "@mui/material";

type props = {
  campaignId: number;
};
export default function CampaignDonationListView(props: props) {
  const authStore = useAppSelector((state) => state.authReducer);
  console.log(authStore.token)
  const dispatch = useAppDispatch();

  const [data, setData] = useState<ICampaignData[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDonations();
    // eslint-disable-next-line
  }, []);

  const fetchDonations = () => {
    setLoading(true);
    ApiGetDonationsByCampaignId(authStore.token, props.campaignId)
      .then((response: IResponse<any>) => {
        setLoading(false);
        console.log(response);
        if (response.status === ResponseEnum.success) {
          const campaignData = response.data;
          console.log(response);
          setData(campaignData);
        }
        if (response.status === ResponseEnum.fail) {
          enqueueSnackbar(response.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
        if (response.status === ResponseEnum.expired_token) {
          dispatch(onSessionValid({ isValid: false }));
        }
      })
      .catch((error: any) => {
        setLoading(false);
        enqueueSnackbar("Something went wrong. Please try again", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  return <Box></Box>;
}
