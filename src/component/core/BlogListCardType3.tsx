import { CalendarMonth, Person } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  createTheme,
} from "@mui/material";
import { convertToReadableDate } from "../common/helpers";
import Link from "next/link";
import PurpleButton from "../common/PurpleButton";
import { ThemeProvider } from "@mui/styles";
import MUIRichTextEditor from "mui-rte";
import { IBlogData } from "@/types/IBlog";

type props = {
  elevation?: number;
  redirectUrl?: string;
  item: IBlogData;
};

export default function BlogListCardType3(props: props) {
  return (
    <Box>
      <Card elevation={props.elevation}>
        <CardMedia
          component="img"
          height="150px"
          image={props?.item?.image}
        />
        <CardContent>
          <Box display="flex">
            <Stack direction="row" flexGrow={1} spacing={0.5}>
              <Person
                sx={{
                  fontSize: "15px",
                  color: "#999999",
                }}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#999999",
                }}>
                {props?.item?.user?.fullname}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <CalendarMonth
                sx={{
                  fontSize: "15px",
                  color: "#999999",
                }}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#999999",
                }}>
                {convertToReadableDate(props?.item?.created_at!)}
              </Typography>
            </Stack>
          </Box>
          <br />
          <Typography
            component="div"
            variant="body1"
            sx={{
              color: "#0F111D",
              fontSize: "1.1em",
              fontWeight: "bold",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}>
            {props.item.title}
          </Typography>
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
        </CardContent>
        <CardActions sx={{ padding: "1rem" }}>
          <Link
            href={
              !props?.redirectUrl ? "" : `${props.redirectUrl}/${props.item.id}`
            }>
            <PurpleButton
              text="Read More"
              size="small"
              shade="white"
              style={{ width: "150px" }}
            />
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}

const myTheme = createTheme({
  // Set up your custom MUI theme here
});
