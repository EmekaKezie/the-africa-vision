import { Favorite, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  createTheme,
} from "@mui/material";
import TextInput from "../common/TextInput";
import { getDateDifference } from "../common/helpers";
import Link from "next/link";
import MUIRichTextEditor from "mui-rte";
import { ThemeProvider } from "@mui/styles";
import { IBlog, IBlogData } from "@/types/IBlog";
import BlogReactions from "./BlogReactions";

type props = {
  elevation?: number;
  showInput?: boolean;
  redirectUrl?: string;
  item: IBlogData;
};

export default function BlogListCardType2(props: props) {
  return (
    <Card elevation={props.elevation}>
      <CardHeader
        avatar={
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <Avatar
                alt="Remy Sharp"
                //src={props.item.user}
                src={""}
                sx={{ height: "20px", width: "20px" }}
              />
            }>
            <Avatar sx={{ backgroundColor: "#2563EB" }}>
              {props.item.user?.fullname?.split("")[0].charAt(0)}
              {props.item.user?.fullname?.split("")[1]?.charAt(0)}
            </Avatar>
          </Badge>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={
          <Typography
            component="div"
            variant="body1"
            sx={{
              color: "#0F172A",
              fontSize: "1.1em",
              fontWeight: "bold",
              letterSpacing: "-1px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              "&:hover": {
                opacity: 0.8,
              },
            }}>
            <Link
              href={
                !props?.redirectUrl
                  ? ""
                  : `${props.redirectUrl}/${props.item.id}`
              }>
              {props.item.title}
            </Link>
          </Typography>
        }
        subheader={
          <Typography
            sx={{
              fontSize: "0.7em",
              color: "#94A3B8",
            }}>
            {props.item.user.fullname} •{" "}
            {getDateDifference(
              props.item.created_at!,
              new Date().toDateString()
            ).diffInDays.toFixed(0)}{" "}
            days ago
          </Typography>
        }
      />
      <CardContent>
        <Box>
          <Typography
            component="div"
            variant="body2"
            sx={{
              color: "#64748B",
              fontSize: "0.9em",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}>
            <ThemeProvider theme={myTheme}>
              <MUIRichTextEditor
                defaultValue={!props.item.content ? "" : props.item.content}
                readOnly
                controls={[]}
              />
            </ThemeProvider>
          </Typography>
        </Box>
        <br />
        <CardMedia
          component="img"
          src={props.item.image}
          height="200px"
          sx={{
            width: "100%",
          }}
        />
        <br />
        <BlogReactions
          blogId={props.item.id}
          likes={props.item.likes}
          dislikes={props.item.dislikes}
          comments={props.item.comments}
          shares={props.item.shares}
        />
        {/* <Box display="flex">
            <Box
              flexGrow={1}
              display="flex"
              justifyContent="start"
              alignItems="center">
              <Favorite sx={{ fontSize: "14px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "14px" }}>2.6k Likes</Typography>
            </Box>
            <Box
              flexGrow={1}
              display="flex"
              justifyContent="center"
              alignItems="center">
              <Favorite sx={{ fontSize: "14px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "14px" }}>2.6k Likes</Typography>
            </Box>
            <Box
              flexGrow={1}
              display="flex"
              justifyContent="end"
              alignItems="center">
              <Favorite sx={{ fontSize: "14px", marginRight: "5px" }} />
              <Typography sx={{ fontSize: "14px" }}>2.6k Likes</Typography>
            </Box>
          </Box> */}
      </CardContent>

      {props.showInput && (
        <Box>
          <TextInput
            size="small"
            fullWidth
            inputStyle={{
              background: "#FFF9FD",
              border: "1px solid #CCCCCC",
            }}
          />
        </Box>
      )}
      {/* */}
    </Card>
  );
}

const myTheme = createTheme({
  // Set up your custom MUI theme here
});
