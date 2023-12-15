import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import Thumbnail1 from "@/assets/donate-thumbnail-1.jpg";
import { makeStyles } from "@mui/styles";
import { formatNumberWithSuffix } from "@/component/common/helpers";
import PurpleButton from "../common/PurpleButton";
import Link from "next/link";
import PurpleLightButton from "../common/PurpleLightButton";

type dataProps = {
  id: string;
  src: any;
  label: string;
  title: string;
  summary: string;
  donationPercentage: number;
  raisedAmount: number;
  goalAmount: number;
  currency: string;
};

export default function PgLatestCauses() {
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
          Latest Causes
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
          Find the popular cause and donate them
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
                //border: "1px solid gray",
              }}>
              <Card>
                <CardMedia
                  component="img"
                  height="150px"
                  image={item.src.src}
                  alt={item.id}
                />
                <CardContent>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.9em",
                      color: "#A9518B",
                      lineHeight: "24px",
                    }}>
                    {item.label}
                  </Typography>
                  <br />
                  <Typography
                    sx={{
                      height: "54px",
                      fontWeight: "bold",
                      fontSize: "1.1em",
                      color: "#252A34",
                      textOverflow: "ellipsis",
                      lineHeight: "20px",
                    }}>
                    {item.title}
                  </Typography>
                  {/* <br/> */}
                  <Typography
                    sx={{
                      height: "41px",
                      fontSize: "0.9rem",
                      color: "#555555",
                      textOverflow: "ellipsis",
                      lineHeight: "20px",
                    }}>
                    {item.summary}
                  </Typography>
                  <br />
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        color: "#555555",
                        paddingBottom: "0.3rem",
                      }}>
                      <Typography
                        component="div"
                        sx={{
                          justifyContent: "start",
                          flexGrow: 1,
                          fontSize: "0.7em",
                        }}>
                        Donation
                      </Typography>
                      <Typography
                        component="div"
                        sx={{
                          justifyContent: "end",
                          fontSize: "0.7em",
                        }}>
                        {item.donationPercentage}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={item.donationPercentage}
                      className={classes.linearProgress}
                      color="inherit"
                      sx={{
                        padding: "0.2rem",
                        borderRadius: "5px",
                        backgroundColor: "#C7E7DF",
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        color: "#555555",
                        paddingTop: "0.3rem",
                      }}>
                      <Typography
                        component="div"
                        sx={{
                          justifyContent: "start",
                          flexGrow: 1,
                          fontSize: "0.7em",
                        }}>
                        Raised: {item.currency}
                        {formatNumberWithSuffix(item.raisedAmount)}
                      </Typography>
                      <Typography
                        component="div"
                        sx={{
                          justifyContent: "end",
                          fontSize: "0.7em",
                        }}>
                        Goal: {item.currency}
                        {formatNumberWithSuffix(item.goalAmount)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ padding: "1rem" }}>
                  <Link href="/donate">
                    <PurpleLightButton text="Donate Now" size="small" />
                  </Link>
                </CardActions>
              </Card>
              {/* <Box>
                <Box>
                  <Image
                    src={Thumbnail1}
                    alt="Thumbnail"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}>
                  {item.label}
                </Typography>
              </Box> */}
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
    label: "Medical",
    title: "Donate for poor peoples treatment and medicine.",
    summary:
      "Lorem ipsum dolor sit amet, consete sadipscing elitr, sed diam nonumy....",
    donationPercentage: 60,
    raisedAmount: 600,
    goalAmount: 1000,
    currency: "NGN",
  },
  {
    id: "2",
    src: Thumbnail1,
    label: "Medical",
    title: "Donate for poor peoples treatment and medicine.",
    summary:
      "Lorem ipsum dolor sit amet, consete sadipscing elitr, sed diam nonumy....",
    donationPercentage: 60,
    raisedAmount: 600,
    goalAmount: 1000,
    currency: "NGN",
  },
  {
    id: "3",
    src: Thumbnail1,
    label: "Medical",
    title: "Donate for poor peoples treatment and medicine.",
    summary:
      "Lorem ipsum dolor sit amet, consete sadipscing elitr, sed diam nonumy....",
    donationPercentage: 60,
    raisedAmount: 600,
    goalAmount: 1000,
    currency: "NGN",
  },
  {
    id: "4",
    src: Thumbnail1,
    label: "Medical",
    title: "Donate for poor peoples treatment and medicine.",
    summary:
      "Lorem ipsum dolor sit amet, consete sadipscing elitr, sed diam nonumy....",
    donationPercentage: 60,
    raisedAmount: 600,
    goalAmount: 1000,
    currency: "NGN",
  },
  {
    id: "5",
    src: Thumbnail1,
    label: "Medical",
    title: "Donate for poor peoples treatment and medicine.",
    summary:
      "Lorem ipsum dolor sit amet, consete sadipscing elitr, sed diam nonumy....",
    donationPercentage: 60,
    raisedAmount: 600,
    goalAmount: 1000,
    currency: "NGN",
  },
  {
    id: "6",
    src: Thumbnail1,
    label: "Medical",
    title: "Donate for poor peoples treatment and medicine.",
    summary:
      "Lorem ipsum dolor sit amet, consete sadipscing elitr, sed diam nonumy....",
    donationPercentage: 60,
    raisedAmount: 600,
    goalAmount: 1000,
    currency: "NGN",
  },
];
