import { CheckBox, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TextInput from "../common/TextInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import PurpleButton from "../common/PurpleButton";
import { generateRandomNumber } from "../common/helpers";
import { AddBankAccountsApi, GetBankListApi } from "../api/paymentApi";
import ReduxProvider from "../common/ReduxProvider";
import { useAppSelector } from "@/redux/useReduxHooks";
import { enqueueSnackbar } from "notistack";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import ExpiredSessionModal from "../common/ExpiredSessionModal";
import InputFile from "../common/InputFile";
import { IBankInput, IBankVerification } from "@/types/IBank";

type props = {
  open: boolean;
  onToggle: (toggle: boolean) => void;
};

function PayoutBankAccountCreationForm(props: props) {
  const authStore = useAppSelector((state) => state.authReducer);
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [bankList, setBankList] = useState<IBankVerification[]>([]);
  const [loadingBankList, setLoadingBankList] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSessionValid, setIsSessionValid] = useState<boolean>(true);

  useEffect(() => {
    fetchBankList();
    // eslint-disable-next-line
  }, []);

  const fetchBankList = () => {
    GetBankListApi()
      .then((response: IResponse<any>) => {
        setLoadingBankList(false);
        if (response.status === ResponseEnum.success) {
          const bankListData = response.data.banks;
          setBankList(bankListData);
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
      })
      .catch((error) => {
        setLoadingBankList(false);
        enqueueSnackbar("Failed to get bank list", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      bank_code: "",
      bank_name: "",
      account_number: "",
    },
    validationSchema: Yup.object({
      bank_name: Yup.string().required("Bank name is required"),
      account_number: Yup.string().required("Account number is required"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values: any) => {
    setLoading(true);
    const payload: IBankInput = {
      bank_code: values.bank_code,
      bank_name: values.bank_name,
      account_number: values.account_number,
      default: isDefault,
    };
    console.log(payload);

    AddBankAccountsApi(payload, authStore.token)
      .then((response: IResponse<any>) => {
        console.log(response);
        setLoading(false);
        if (response.status === ResponseEnum.success) {
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
          setIsSessionValid(false);
          handleToggleDialog();
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Failed to add bank account", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const handleToggleDialog = () => {
    if (props.onToggle) props.onToggle(!props.open);
  };
  return (
    <Box>
      <Dialog open={props.open} maxWidth="xs" fullWidth>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}>
          <Box display="flex" flexGrow={1}>
            <DialogTitle>Add Bank Account</DialogTitle>
          </Box>
          <Box sx={{ padding: "1rem" }}>
            <IconButton onClick={handleToggleDialog}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Typography
              sx={{
                marginBottom: "2px",
                border: "0px solid gray",
                fontSize: "13px",
                color: "#667085",
                fontWeight: "bold",
              }}>
              Bank Name
            </Typography>
            <Autocomplete
              options={bankList}
              getOptionLabel={(option) => option.name}
              onChange={(e, val) => {
                if (val) {
                  formik.values.bank_name = val.name;
                  formik.values.bank_code = val.code
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={
                    !formik.errors.bank_name
                      ? "Search bank name"
                      : formik.errors.bank_name
                  }
                  name="bank_name"
                  style={{
                    background: "#FFF9FD",
                    border: "1px solid #CCCCCC",
                    borderRadius: "5px",
                  }}
                  sx={{
                    "& fieldset": {
                      border: !formik.errors.bank_name
                        ? "none"
                        : "1px solid red",
                    },
                    "&:hover": {
                      border: formik.errors.bank_name
                        ? "none"
                        : "1px solid #A8518A",
                      borderRadius: "5px",
                    },
                  }}
                />
              )}
            />
            <br />
            <TextInput
              name="account_number"
              label="Account No."
              placeholder="Enter account no."
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.account_number}
              validate={formik.touched.account_number}
              validationMessage={formik.errors.account_number}
            />
            <br />
            <FormControl>
              <FormControlLabel
                control={<Checkbox sx={{ color: "#A8518A" }} color="default" />}
                label={<Typography color="#667085">Set as default</Typography>}
                value={isDefault}
                onChange={() => {
                  setIsDefault(!isDefault);
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ padding: "0 1.5rem 1rem 1.5rem" }}>
            <PurpleButton
              text="Add Bank Account"
              loading={loading}
              disabled={loading}
            />
          </DialogActions>
        </form>
      </Dialog>

      {!isSessionValid && <ExpiredSessionModal />}
    </Box>
  );
}

export default ReduxProvider(PayoutBankAccountCreationForm);
