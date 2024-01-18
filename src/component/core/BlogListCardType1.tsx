import { IStory } from "@/types/IStory";
import { Comment, Share, ThumbUp } from "@mui/icons-material";
import {
  Badge,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import MUIRichTextEditor from "mui-rte";
import Link from "next/link";

type props = {
  elevation?: number;
  redirectUrl?: string;
  item: IStory;
};

export default function BlogListCardType1(props: props) {
  return (
    <Link
      href={!props?.redirectUrl ? "" : `${props.redirectUrl}/${props.item.id}`}>
      <Card
        elevation={props.elevation}
        sx={{
          padding: "1rem",
          borderRadius: "20px",
          "&:hover": {
            backgroundColor: "#EFF8FF",
            opacity: 0.9,
          },
        }}>
        <CardMedia
          component="img"
          height="150px"
          image={props.item.coverImage.src}
          sx={{ borderRadius: "20px" }}
        />
        <CardContent>
          <Tooltip title={props.item.title}>
            <Typography
              component="div"
              variant="body1"
              sx={{
                fontSize: "1.1em",
                fontWeight: "bold",
                letterSpacing: "-1px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}>
              {props.item.title}
            </Typography>
          </Tooltip>
          <br />
          <Typography
            component="div"
            variant="body2"
            sx={{
              color: "#7B7D8C",
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
          <br />
          <Stack direction="row" spacing={4}>
            <Tooltip title="Shares">
              <Badge badgeContent={props.item.shares} color="success">
                <Share
                  sx={{
                    fontSize: "20px",
                    color: "#A9518B",
                  }}
                />
              </Badge>
            </Tooltip>
            <Tooltip title="Likes">
              <Badge badgeContent={props.item.likes} color="error">
                <ThumbUp
                  sx={{
                    fontSize: "20px",
                    color: "#A9518B",
                  }}
                />
              </Badge>
            </Tooltip>
            <Tooltip title="Comments">
              <Badge badgeContent={props.item.comments} color="info">
                <Comment
                  sx={{
                    fontSize: "20px",
                    color: "#A9518B",
                  }}
                />
              </Badge>
            </Tooltip>
          </Stack>

          {/* <br /> */}
          {/* <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}>
                <Stack direction="row">
                  <Typography sx={{ fontSize: "9px", marginRight: "2px" }}>
                    {props.shares} Shares
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: "9px" }}>
                  {props.likes} Likes
                </Typography>
                <Typography sx={{ fontSize: "9px" }}>
                  {props.comments} Comments
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Share sx={{ fontSize: "14px" }} />
                  <ThumbUp sx={{ fontSize: "14px" }} />
                  <ThumbDown sx={{ fontSize: "14px" }} />
                </Stack>
              </Box> */}
        </CardContent>
      </Card>
    </Link>
  );
}


const myTheme = createTheme({
  // Set up your custom MUI theme here
});