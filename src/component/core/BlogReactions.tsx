import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import { Comment, Share, ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Badge,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  ApiAddDislikeOnBlog,
  ApiAddLikeOnBlog,
  ApiRemoveDislikeOnBlog,
  ApiRemoveLikeOnBlog,
} from "../api/blogApi";
import { useState } from "react";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { onSessionValid } from "@/redux/slices/sessionSlice";

type props = {
  blogId: number;
  likes?: number;
  dislikes?: number;
  comments?: number;
  shares?: number;
};

export default function BlogReactions(props: props) {
  const router = useRouter();
  const authStore = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const [currentLikes, setCurrentLikes] = useState(props.likes ?? 0);
  const [currentDislikes, setCurrentDislikes] = useState(props.dislikes ?? 0);

  const handleAddLike = () => {
    ApiAddLikeOnBlog(props.blogId, authStore.token)
      .then((response: IResponse<any>) => {
        if (response.status === ResponseEnum.success) {
          setCurrentLikes(currentLikes! + 1);
        }
        if (response.status === ResponseEnum.fail) {
          handleRemoveLike();
        }
        if (response.status === ResponseEnum.expired_token) {
          dispatch(onSessionValid({ isValid: false }));
        }
      })
      .catch((error) => {});
  };

  const handleRemoveLike = () => {
    ApiRemoveLikeOnBlog(props.blogId, authStore.token)
      .then((response: IResponse<any>) => {
        if (response.status === ResponseEnum.success) {
          setCurrentLikes(currentLikes! - 1);
        }
        if (response.status === ResponseEnum.expired_token) {
          dispatch(onSessionValid({ isValid: false }));
        }
      })
      .catch((error) => {});
  };

  const handleAddDislike = () => {
    ApiAddDislikeOnBlog(props.blogId, authStore.token)
      .then((response: IResponse<any>) => {
        if (response.status === ResponseEnum.success) {
          setCurrentDislikes(currentDislikes! + 1);
        }
        if (response.status === ResponseEnum.fail) {
          handleRemoveDislike();
        }
        if (response.status === ResponseEnum.expired_token) {
          dispatch(onSessionValid({ isValid: false }));
        }
      })
      .catch((error) => {});
  };

  const handleRemoveDislike = () => {
    ApiRemoveDislikeOnBlog(props.blogId, authStore.token)
      .then((response: IResponse<any>) => {
        if (response.status === ResponseEnum.success) {
          setCurrentDislikes(currentDislikes! - 1);
        }
        if (response.status === ResponseEnum.expired_token) {
          dispatch(onSessionValid({ isValid: false }));
        }
      })
      .catch((error) => {});
  };

  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //   }}>
    //   {props?.likes && <Stack></Stack>}

    //   <Box>d</Box>
    // </Box>

    <Stack direction="row" spacing={1} display={"flex"} alignItems={"center"}>
      {/* <Tooltip title="Shares">
        <IconButton>
          <Badge badgeContent={props?.shares ?? 0} color="info">
            <Share
              sx={{
                fontSize: "20px",
                //color: "#A9518B",
              }}
            />
          </Badge>
        </IconButton>
      </Tooltip> */}

      <Tooltip title="Likes">
        <IconButton onClick={handleAddLike}>
          <Badge badgeContent={currentLikes ?? 0} color="success">
            <ThumbUp
              sx={{
                fontSize: "20px",
                //color: "#A9518B",
              }}
            />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Dislikes">
        <IconButton onClick={handleAddDislike}>
          <Badge badgeContent={currentDislikes ?? 0} color="error">
            <ThumbDown
              sx={{
                fontSize: "20px",
                //color: "#A9518B",
              }}
            />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Comments">
        <IconButton onClick={() => router.push("#comment")}>
          <Badge badgeContent={props?.comments ?? 0} color="secondary">
            <Comment
              sx={{
                fontSize: "20px",
                //color: "#A9518B",
              }}
            />
          </Badge>
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
