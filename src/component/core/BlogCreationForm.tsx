import InputFile from "@/component/common/InputFile";
import PurpleButton from "@/component/common/PurpleButton";
import TextInput from "@/component/common/TextInput";
import { ICategory } from "@/types/ICategory";
import {
  Alert,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Typography,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { useFormik } from "formik";
import MUIRichTextEditor from "mui-rte";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import { getFileBase64 } from "../common/helpers";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/useReduxHooks";
import { ApiCreateBlog, ApiGetBlogCategories } from "../api/blogApi";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { IBlogInput } from "@/types/IBlog";

export default function BlogCreationForm() {
  const router = useRouter();
  const authStore = useAppSelector((state) => state.authReducer);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [imageBase64, setImageBase64] = useState<any>(null);
  const [powerPointBase64, setPowerPointBase64] = useState<any>(null);
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
  const [dialogActionLoading, setDialogActionLoading] =
    useState<boolean>(false);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = () => {
    setLoadingCategories(true);
    ApiGetBlogCategories(authStore.token)
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

  const handlePowerPointUpload = (event: ChangeEvent) => {
    const { files } = event.target as HTMLInputElement;
    const acceptedType =
      "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    if (files?.length) {
      const file = (files as FileList)[0];
      if (file.type === acceptedType) {
        getFileBase64(file)
          .then((base64) => {
            setPowerPointBase64(base64);
          })
          .catch((err) => {});
      } else {
        enqueueSnackbar("Only Power Point files are accepted", {
          variant: "warning",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      videoUrl: "",
      seoKeywords: "",
      categoryId: "",
      referenceUrl: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter the Blog Title"),
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

      const payload: IBlogInput = {
        title: values.title,
        content: richContent,
        imageBase64: imageBase64,
        //powerPointBase64: powerPointBase64 ?? " ",
        category_id: values.categoryId,
        video_url: values.videoUrl,
        seo_keywords: values.seoKeywords,
        referenceUrl: values.referenceUrl,
        draft: true,
      };
      //console.log(payload);

      ApiCreateBlog(payload, authStore.token)
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
                placeholder="Enter Blog Title"
                fullWidth
                label="Blog Title"
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
                name="videoUrl"
                value={formik.values.videoUrl}
                placeholder="Enter Video Url"
                type="text"
                fullWidth
                label="Video Url (optional)"
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextInput
                name="powerPointUpload"
                placeholder="Upload Power Point Slide"
                type="file"
                fullWidth
                label="Power Point slide Upload (Optional)"
                onChange={(event) => {
                  handlePowerPointUpload(event);
                }}
              />
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

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextInput
                name="seoKeywords"
                placeholder="Enter SEO Keywords"
                fullWidth
                label="SEO Keywords"
                selectedValue={formik.values.seoKeywords}
                onChange={formik.handleChange}
              />
              <Typography color="#667085" fontSize="13px">
                seperate each word with a comma
              </Typography>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextInput
                name="referenceUrl"
                value={formik.values.referenceUrl}
                placeholder="Enter Reference URL"
                type="text"
                fullWidth
                label="Reference URL"
                onChange={formik.handleChange}
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
        <Dialog open={openDialog}>
          <DialogTitle>Saved and awaiting approval</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Your Post Has been succesuflly sent to an admin for aprroval, when
              it is approve your post will be Uploaded on the Blog.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: "0 1rem 1rem 1rem" }}>
            <PurpleButton
              text="Continue"
              size="small"
              disabled={dialogActionLoading}
              loading={dialogActionLoading}
              onClick={() => {
                setDialogActionLoading(true);
                router.push("/creator/story");
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
