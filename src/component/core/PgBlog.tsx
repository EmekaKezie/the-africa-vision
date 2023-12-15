import {
  CalendarMonth,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Thumbnail1 from "@/assets/donate-thumbnail-1.jpg";
import Thumbnail2 from "@/assets/donate-thumbnail-2.jpg";
import Thumbnail3 from "@/assets/donate-thumbnail-3.jpg";
import Link from "next/link";
import PurpleButton from "../common/PurpleButton";
import { makeStyles } from "@mui/styles";
import PurpleLightButton from "../common/PurpleLightButton";

type dataProps = {
  id: string;
  src: any;
  author: string;
  date: string;
  title: string;
  content: string;
  url: string;
};

export default function PgBlog() {
  const classes = useStyles();
  return (
    <Box
      sx={{
        padding: "4rem 0",
      }}>
      <Box>
        <Typography
          sx={{
            fontSize: "1.2em",
            lineHeight: "28px",
          }}>
          Latest News
        </Typography>
        <br />
        <Typography
          component="div"
          sx={{
            fontSize: "2.5em",
            lineHeight: "40px",
            fontWeight: "bold",
            display: "inline-block",
            width: "500px",
            wordWrap: "break-word",
          }}>
          Articel You May Read
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton sx={{ backgroundColor: "#FFE1F5" }}>
            <KeyboardArrowLeft />
          </IconButton>
          <span style={{ marginLeft: "10px" }}></span>
          <IconButton sx={{ backgroundColor: "#FFE1F5" }}>
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>

      <Box>
        <Box
          className={classes.scrollableContainer}
          sx={{
            width: "100%",
            overflowX: "auto",
            display: "flex",
            gap: 7,
            padding: "1rem",
            marginBottom: "5rem",
          }}>
          {data?.map((item: dataProps) => (
            <Box
              key={item.id}
              sx={{
                minWidth: "300px",
                minHeight: "100px",
                color: "#4B5563",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Card>
                <CardMedia
                  component="img"
                  height="150px"
                  image={item.src.src}
                  alt={item.id}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexGrow: 1,
                        alignItems: "center",
                      }}>
                      <Person
                        sx={{
                          fontSize: "20px",
                          color: "#999999",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#999999",
                        }}>
                        {item.author}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "end",
                      }}>
                      <CalendarMonth
                        sx={{
                          fontSize: "20px",
                          color: "#999999",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#999999",
                        }}>
                        {item.date}
                      </Typography>
                    </Box>
                  </Box>
                  <br />
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1em",
                      textOverflow: "ellipsis",
                      color:"#252A34"
                    }}>
                    {item.title}
                  </Typography>
                  <br />
                  <Typography
                    sx={{
                      fontSize: "0.9em",
                      textOverflow: "ellipsis",
                      color:"#555555"
                    }}>
                    {item.content}
                  </Typography>
                </CardContent>
                <CardActions sx={{ padding: "1rem" }}>
                  <Link href={item.url}>
                    <PurpleLightButton text="Learn more" size="small"/>
                  </Link>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  scrollableContainer: {
    "&::-webkit-scrollbar": {
      //width: '7px',
      backgroundColor: "transparent",
    },
    // '&::-webkit-scrollbar-track': {
    //     background: '#F4F6F7'
    //  },
    // '&::-webkit-scrollbar-thumb': {
    //     backgroundColor: '#DBDEDF',
    //     borderRadius: '20px',
    // }
  },

  linearProgress: {
    "&>.MuiLinearProgress-bar": {
      background: "#A9518B",
    },
  },
}));

const data: dataProps[] = [
  {
    id: "1",
    src: Thumbnail1,
    author: "Ester Howard",
    date: "12 Sept 2023",
    title: "Charity, Expectations vs. Reality",
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing sed diam nonumy  tempor invidunt ut labore et magna aliquyam erat, sed diam voluptua.....",
    url: "/block",
  },
  {
    id: "2",
    src: Thumbnail2,
    author: "Ester Howard",
    date: "12 Sept 2023",
    title: "Charity, Expectations vs. Reality",
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing sed diam nonumy  tempor invidunt ut labore et magna aliquyam erat, sed diam voluptua.....",
    url: "/block",
  },
  {
    id: "3",
    src: Thumbnail3,
    author: "Ester Howard",
    date: "12 Sept 2023",
    title: "Charity, Expectations vs. Reality",
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing sed diam nonumy  tempor invidunt ut labore et magna aliquyam erat, sed diam voluptua.....",
    url: "/block",
  },
  {
    id: "4",
    src: Thumbnail3,
    author: "Ester Howard",
    date: "12 Sept 2023",
    title: "Charity, Expectations vs. Reality",
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing sed diam nonumy  tempor invidunt ut labore et magna aliquyam erat, sed diam voluptua.....",
    url: "/block",
  },
];
