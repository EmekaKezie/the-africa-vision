import InputFile from "@/component/common/InputFile";
import PurpleButton from "@/component/common/PurpleButton";
import TextInput from "@/component/common/TextInput";
import { categoryData } from "@/data/categoryData";
// import { paymentOptionData } from "@/data/paymentOptionData";
import { ICategory } from "@/types/ICategory";
import { IPaymentOption } from "@/types/IPayment";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { useFormik } from "formik";
import MUIRichTextEditor from "mui-rte";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { getDateDifference } from "../common/helpers";
import { useAppSelector } from "@/redux/useReduxHooks";
import {
  ApiCreateCampaign,
  ApiGetCampaignCategories,
} from "../api/campaignApi";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { ICampaignInput } from "@/types/ICampaign";
import { useRouter } from "next/navigation";

export default function CampaignCreationForm() {
  const router = useRouter();
  const authStore = useAppSelector((state) => state.authReducer);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [selectedPartners, setSelectedPartners] = useState<ICategory[]>([]);
  const [imageBase64, setImageBase64] = useState<any>(null);
  const [richContent, setRichContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSavedRichContentUpdate, setIsSavedRichContentUpdate] =
    useState<boolean>(false);
  const [saveRichContentIndicator, setSaveRichContentIndicator] =
    useState<any>("info");
  const [saveRichContentMessage, setSaveRichContentMessage] = useState<any>(
    "Your content is empty. Ensure to fill it and save before submitting"
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = () => {
    setLoadingCategories(true);
    ApiGetCampaignCategories(authStore.token)
      .then((response: IResponse<ICategory[]>) => {
        setLoadingCategories(false);
        if ((response.status = ResponseEnum.success)) {
          setCategories(response.data);
        } else {
          enqueueSnackbar(response.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      })
      .catch((error: any) => {
        setLoadingCategories(false);
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const handleEditorSave = (state: any) => {
    setRichContent(state);
    setIsSavedRichContentUpdate(true);
    setSaveRichContentIndicator("success");
    setSaveRichContentMessage("Your content is saved");
  };

  const handleEditorChange = () => {
    setIsSavedRichContentUpdate(false);
    if (!richContent) {
      setSaveRichContentIndicator("info");
      setSaveRichContentMessage(
        "Your content is empty. Ensure to fill it and save before submitting"
      );
    } else {
      setSaveRichContentIndicator("warning");
      setSaveRichContentMessage(
        "You are updating your content. Ensure to save before submitting"
      );
    }
  };

  const handleSelectPartner = (event: any) => {
    const value = event.target.value;
    const selected = categoryData.filter((i: ICategory) => i.id === value)[0];
    if (!selectedPartners.includes(selected)) {
      setSelectedPartners((prev) => [...prev, selected]);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      startDate: "",
      endDate: "",
      categoryId: "",
      budget: "",
      paymentOptionId: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter the Camplaign Title"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values: any) => {
    let isValidInput = 0;

    if (!richContent && !isSavedRichContentUpdate) {
      isValidInput++;
      enqueueSnackbar("Please create the campaign content", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }

    if (richContent && !isSavedRichContentUpdate) {
      isValidInput++;
      enqueueSnackbar("Please save campaign content first", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }

    if (!imageBase64) {
      isValidInput++;
      enqueueSnackbar("You must choose an image for the campaign", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }

    if (isValidInput < 1) {
      setLoading(true);

      const selectedPartnerIds = selectedPartners.map((i: ICategory) => {
        return i.id;
      });

      const payload: ICampaignInput = {
        title: values.title,
        content: richContent,
        imageBase64: imageBase64,
        start_date: values.startDate,
        end_date: values.endDate,
        category_id: values.categoryId,
        target_amount: values.budget,
        payment_options: ["paystack", "flutterwave"],
        //selectedPartnerIds: selectedPartnerIds,
        partners: [""],
        venue: "Lagos",
        draft: true,
      };
      //console.log(payload);

      ApiCreateCampaign(payload, authStore.token)
        .then((response) => {
          setLoading(false);
          if (response.status === ResponseEnum.success) {
            enqueueSnackbar(response.message, {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
            setOpenDialog(true);
          } else {
            enqueueSnackbar(response.message, {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
          }
        })
        .catch((error: any) => {
          setLoading(false);
          enqueueSnackbar("Something went wrong", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        });

      // setTimeout(() => {
      //   setLoading(false);
      //   enqueueSnackbar("Save and awaiting approval", {
      //     variant: "success",
      //     autoHideDuration: 6000,
      //     anchorOrigin: {
      //       vertical: "top",
      //       horizontal: "right",
      //     },
      //   });
      //   setOpenDialog(true);
      // }, 2000);
    }
  };

  return (
    <Box>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextInput
                name="title"
                placeholder="Enter Campaign Title"
                fullWidth
                label="Campaign Title"
                onChange={formik.handleChange}
                value={formik.values.title}
                validate={formik.touched.title}
                validationMessage={formik.errors.title}
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <InputFile
                showPreview={true}
                onSelect={(file, preview, base64) => {
                  setImageBase64(base64);
                }}
              />
            </Grid>

            {/* <Grid item lg={12} md={12} sm={12} xs={12}>
              <ThemeProvider theme={myTheme}>
                <MUIRichTextEditor
                  defaultValue={!richContent ? "" : richContent}
                  readOnly
                  controls={[]}
                />
              </ThemeProvider>
            </Grid> */}

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box sx={{ border: "1px solid gray" }}>
                <Box>
                  <Alert severity={saveRichContentIndicator}>
                    {saveRichContentMessage}
                  </Alert>
                </Box>
                <Box
                  sx={{
                    minHeight: "300px",
                    padding: "1rem",
                    overflow: "scroll",
                    color: "#667085",
                  }}>
                  <ThemeProvider theme={myTheme}>
                    <MUIRichTextEditor
                      label="Start typing..."
                      onSave={handleEditorSave}
                      onChange={handleEditorChange}
                    />
                  </ThemeProvider>
                </Box>
              </Box>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextInput
                name="startDate"
                type="datetime-local"
                fullWidth
                label="Start Date"
                selectedValue={formik.values.startDate}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextInput
                name="endDate"
                type="datetime-local"
                fullWidth
                label="End Date"
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextInput
                name="budget"
                value={formik.values.budget}
                placeholder="Enter Funding Amount"
                type="number"
                fullWidth
                label="Funding Amount"
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextInput
                select
                fullWidth
                label="Add team or partners"
                onChange={(e) => handleSelectPartner(e)}>
                {categoryData?.map((item: ICategory) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextInput>
              <Box sx={{ padding: "0.5rem 0" }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selectedPartners?.map((item: ICategory) => (
                    <Chip
                      key={item.id}
                      label={item.name}
                      onDelete={
                        item.name === "React"
                          ? undefined
                          : () => {
                              const index = selectedPartners.indexOf(item);
                              const newPartners = [...selectedPartners];
                              newPartners.splice(index, 1);
                              setSelectedPartners(newPartners);
                            }
                      }
                    />
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextInput
                name="categoryId"
                placeholder="Select Category"
                select
                fullWidth
                label="Category"
                selectedValue={formik.values?.categoryId}
                onChange={formik.handleChange}
                startIcon={
                  loadingCategories ? <CircularProgress size={20} /> : <></>
                }>
                {categories?.map((item: ICategory) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextInput>
            </Grid>

            {/* <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextInput
                name="paymentOptionId"
                placeholder="Select Payment Option"
                select
                fullWidth
                label="Payment Option"
                selectedValue={formik.values.paymentOptionId}
                onChange={formik.handleChange}>
                {paymentOptionData?.map((item: IPaymentOption) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextInput>
            </Grid> */}

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextInput
                type="number"
                fullWidth
                label="Campaign Duration"
                disabled
                value={getDateDifference(
                  formik.values.startDate,
                  formik.values.endDate
                ).diffInDays.toFixed(0)}
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
                <PurpleButton
                  type="button"
                  text="Save as draft"
                  shade="white"
                  style={{ width: "150px" }}
                />

                <PurpleButton
                  text="Publish"
                  style={{ width: "150px" }}
                  disabled={loading}
                  loading={loading}
                />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Saved and awaiting approval</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Your Post Has been succesuflly sent to an admin for aprroval, when
              it is approve your post will be Uploaded on the Blog.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <PurpleButton
              text="Continue"
              size="small"
              onClick={() => {
                setOpenDialog(false);
                router.push("/creator/campaign");
              }}
            />
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

const myTheme = createTheme({
  // Set up your custom MUI theme here
});
