import { useFormik } from "formik";
import TextInput from "../common/TextInput";
import PurpleButton from "../common/PurpleButton";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ApiCommentOnBlog } from "../api/blogApi";
import { IBlogComment, IBlogCommentInput } from "@/types/IBlog";
import { enqueueSnackbar } from "notistack";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import ReduxProvider from "../common/ReduxProvider";
import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import { onSessionValid } from "@/redux/slices/sessionSlice";
import ExpiredSessionModal from "../common/ExpiredSessionModal";

type props = {
  submitWithButtonClick: boolean;
  submitWithEnterKey: boolean;
  inputFieldHeight?: number;
  onReturnComment?: (comments: IBlogComment[]) => void;
  blogId: string;
};

function BlogCommentForm(props: props) {
  const authStore = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const sessionStore = useAppSelector((state) => state.sessionReducer);

  const [submittedComments, setSubmittedComments] = useState<IBlogComment[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading]
  //console.log(submittedComments);

  useEffect(() => {
    if (props.onReturnComment) props.onReturnComment(submittedComments);
    // eslint-disable-next-line
  }, [submittedComments]);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values: any) => {
    setLoading(true);
    const comment = values.comment.trim();

    const payload = {
      comment: comment,
    };

    ApiCommentOnBlog(payload, props.blogId, authStore.token)
      .then((response: IResponse<any>) => {
        setLoading(false);
        if (response.status === ResponseEnum.success) {
          const commentData: IBlogComment = {
            avatar: null,
            comment: comment,
            email: authStore.email ?? "Anonymous",
            id: "0",
            created_at: new Date().toDateString(),
            updated_at: "",
            post_id: props.blogId,
            user_id: authStore.id.toString() ?? 0,
          };

          setSubmittedComments((prev) => [...prev, commentData]);
          formik.resetForm();

          enqueueSnackbar(response.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }

        if (response.status === ResponseEnum.expired_token) {
          dispatch(onSessionValid({ isValid: false }));
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
        enqueueSnackbar("Something went wrong. Please try again", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      });
  };

  const handleSubmitByEnterKey = (e: any) => {
    if (e.keyCode === 13) {
      const comment = e.target.value?.trim();

      const payload = {
        comment: comment,
      };

      ApiCommentOnBlog(payload, props.blogId, authStore.token)
        .then((response: IResponse<any>) => {
          if (response.status === ResponseEnum.success) {
            const commentData: IBlogComment = {
              avatar: null,
              comment: comment,
              email: authStore.email ?? "Anonymous",
              id: "0",
              created_at: new Date().toDateString(),
              updated_at: "",
              post_id: props.blogId,
              user_id: authStore.id.toString() ?? 0,
            };
            setSubmittedComments((prev) => [...prev, commentData]);
            formik.resetForm();

            enqueueSnackbar(response.message, {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            });
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
          enqueueSnackbar("Something went wrong. Please try again", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        });
    }
  };

  return (
    <Box component={"div"} id="comment">
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          name="comment"
          placeholder="Write your comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          onKeyUp={
            !props.submitWithEnterKey ? () => {} : handleSubmitByEnterKey
          }
          rows={props.inputFieldHeight ?? 1}
          style={{
            width: "100%",
          }}
        />
        <br />
        {props.submitWithButtonClick && (
          <PurpleButton
            text="Submit"
            style={{ width: "150px" }}
            loading={loading}
            disabled={loading}
          />
        )}
      </form>
      {!sessionStore.isValid && <ExpiredSessionModal canClose />}
    </Box>
  );
}

export default ReduxProvider(BlogCommentForm);
