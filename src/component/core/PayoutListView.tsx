import { IUser } from "@/types/IUser";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { convertToCurrency } from "../common/helpers";
import { useAppSelector } from "@/redux/useReduxHooks";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IPayoutData } from "@/types/IPayout";
import { ApiGetPayouts } from "../api/paymentApi";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { enqueueSnackbar } from "notistack";
import { onSessionValid } from "@/redux/slices/sessionSlice";
import SkeletonList from "./SkeletonList";
import PageEmpty from "./PageEmpty";

type props = {
  title?: string;
  elevation?: number;
  pageSize?: number;
};

export default function PayoutListView(props: props) {
  const authStore = useAppSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState<IPayoutData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const pageSize = !props.pageSize ? 6 : props.pageSize;

  useEffect(() => {
    fetchPayouts();
    // eslint-disable-next-line
  }, [pageNum]);

  const fetchPayouts = () => {
    setLoading(true);
    ApiGetPayouts(authStore.token, pageNum, pageSize)
      .then((response: IResponse<any>) => {
        setLoading(false);
        if (response.status === ResponseEnum.success) {
          const payoutData = response.data.results;
          const payoutTotal = response.data.total;

          const pendingPayouts: IPayoutData[] = payoutData.filter(
            (x: IPayoutData) => x.status === "pending"
          );

          setData(pendingPayouts);
          setTotal(payoutTotal);
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
      .catch((error) => {
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

  const handleRenderContent = () => {
    if (loading) {
      return (
        <Box sx={{ background: "#FFFFFF", padding: "1rem" }}>
          <SkeletonList itemcount={3} cardType="type2" />
        </Box>
      );
    }

    if (!loading && data?.length < 1) {
      return <PageEmpty title="There are no payout requests" />;
    }

    if (!loading && data?.length > 0) {
      return content();
    }
  };

  const content = () => {
    return (
      <Box>
        {data?.map((item: IPayoutData) => (
          <ListItem key={item.id}>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color={"#111827"} fontSize={"0.8em"}>
                  {item.account_name}
                </Typography>
              }
              secondary={
                <Typography color={"#6B7280"} fontSize={"0.7em"}>
                  {item.email}
                </Typography>
              }
            />
            <Typography color={"#111827"} fontSize={"0.9em"}>
              {convertToCurrency(item.total_payments, item.currency ?? "NGN")}
            </Typography>
          </ListItem>
        ))}
      </Box>
    );
  };

  return handleRenderContent();
}
