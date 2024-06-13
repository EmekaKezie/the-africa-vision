import { IPayoutData } from "@/types/IPayout";
import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import PurpleButton from "../common/PurpleButton";
import { ApiApprovePayout } from "../api/paymentApi";
import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import { error } from "console";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { onSessionValid } from "@/redux/slices/sessionSlice";
import { enqueueSnackbar } from "notistack";

type props = {
  openDialog: boolean;
  data: IPayoutData;
  onToggleDialog: (openDialog: boolean) => void;
};

export default function PayoutApprovalDialog(props: props) {
  const authStore = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const handleToggleDialog = () => {
    if (props.onToggleDialog) props.onToggleDialog(!props.onToggleDialog);
  };

  const handleApprovePayout = () => {
    setLoading(true);
    ApiApprovePayout(props.data.id, authStore.token)
      .then((response: IResponse<any>) => {
        setLoading(false);
        if (response.status === ResponseEnum.success) {
          handleToggleDialog();
          enqueueSnackbar(response.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
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
        console.log(error)
        setLoading(false);
        //handleToggleDialog()
        enqueueSnackbar("Something went wrong. Please try again", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  return (
    <Dialog open={props.openDialog} maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}>
        <Box flexGrow={1}>
          <DialogTitle>Approve Payout</DialogTitle>
        </Box>
        <Box padding="0 1rem">
          <IconButton onClick={handleToggleDialog}>
            <Close></Close>
          </IconButton>
        </Box>
      </Box>
      <DialogContent>
        <DialogContentText>
          {" "}
          Are you sure you want to approve the payout?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: "0 1.5rem 1.5rem 1.5rem" }}>
        <PurpleButton
          disabled={loading}
          loading={loading}
          text="Approve Payout"
          type="button"
          size="small"
          onClick={handleApprovePayout}
        />
      </DialogActions>
    </Dialog>
  );
}
