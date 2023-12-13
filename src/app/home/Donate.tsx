import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import thumbnail1 from "@/assets/donate-thumbnail-1.jpg";
import thumbnail2 from "@/assets/donate-thumbnail-2.jpg";
import thumbnail3 from "@/assets/donate-thumbnail-3.jpg";
import thumbnail4 from "@/assets/donate-thumbnail-3.jpg";
import supportus1 from "@/assets/supportus-thumbnail-1.png";
import supportus2 from "@/assets/supportus-thumbnail-2.png";
import supportus3 from "@/assets/supportus-thumbnail-3.png";
import supportus4 from "@/assets/supportus-thumbnail-4.png";
import supportus5 from "@/assets/supportus-thumbnail-5.png";
import supportus6 from "@/assets/supportus-thumbnail-6.png";
import Link from "next/link";
import PurpleButton from "@/common/buttons/PurpleButton";
import {
  ArrowRightAlt,
  BrokenImage,
  Favorite,
  Redo,
} from "@mui/icons-material";
import { formatNumberWithSuffix } from "@/common/helpers";

type donationAnaysis = {
  id: string;
  purpose: string;
  amount: number;
  currency: string;
};

type donationProps = {
  id: string;
  src: any;
  alt: string;
  label: string;
  title: string;
  percentage: number;
  color: string;
  background: string;
  analysis: donationAnaysis[];
};

type activityProps = {
  id: string;
  count: string;
  info: string;
};

type supportProps = {
  src: any;
  alt: string;
  title: string;
  content: string;
  logo: any;
};

const useStyles = makeStyles((theme) => ({
  scrollContainer: {
    width: "100%",
    overflowX: "auto",
    display: "flex",
    gap: 20,
    padding: "1rem",
  },
  scrollContentBox: {
    minWidth: "300px",
    minHeight: "100px",
    color: "#4B5563",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
      width: "300px",
    },
  },

  imageBox: {
    height: "150px",
    "& > img": {
      objectFit: "cover",
      width: "100%",
    },
  },

  contentBox: {
    background: "#FFFFF",
    // height: "150px",
    margin: "-5% 5% 0 5%",
    zIndex: 100,
    position: "relative",
  },

  contentLabel: {
    fontSize: "0.6em",
    fontWeight: "bold",
    display: "inline-block",
    padding: "0.3rem 1rem",
    borderRadius: "5px",
    marginBottom: "1rem",
    background: "lightgreen",
  },

  contentTitle: {
    fontSize: "0.8em",
    fontWeight: "bold",
    marginBottom: "1rem",
  },

  contentAnalysisPurpose: {
    fontSize: "0.7em",
    color: "#667085",
    paddingTop: "1rem",
    fontWeight: "bold",
  },

  contentAnalysisAmount: {
    fontSize: "0.7em",
    fontWeight: "bold",
    color: "#2E4049",
  },

  contentActionIconBox: {
    display: "flex",
    justifyContent: "end",
    flexGrow: 1,
  },

  linearProgress: {
    "&>.MuiLinearProgress-bar": {
      background: "#92CD00",
    },
  },
}));

const data: donationProps[] = [
  {
    id: "1",
    src: thumbnail1,
    alt: "donate-thumbnail-1",
    label: "Education",
    title: "Help Azar to continue his study",
    percentage: 50,
    color: "#027A48",
    background: "#ECFDF3",
    analysis: [
      {
        id: "1",
        purpose: "Goal",
        amount: 12323,
        currency: "NGN",
      },
      {
        id: "1",
        purpose: "Collected",
        amount: 1000,
        currency: "NGN",
      },
      {
        id: "1",
        purpose: "Remaining",
        amount: 11034,
        currency: "NGN",
      },
    ],
  },
  {
    id: "2",
    src: thumbnail2,
    alt: "donate-thumbnail-2",
    label: "Health",
    title: "Save Peter life",
    percentage: 90,
    color: "#3538CD",
    background: "#EEF4FF",
    analysis: [
      {
        id: "1",
        purpose: "Goal",
        amount: 12034000,
        currency: "NGN",
      },
      {
        id: "1",
        purpose: "Collected",
        amount: 100000000,
        currency: "NGN",
      },
      {
        id: "1",
        purpose: "Remaining",
        amount: 11034000,
        currency: "NGN",
      },
    ],
  },
  {
    id: "1",
    src: thumbnail3,
    alt: "donate-thumbnail-3",
    label: "School Construction",
    title: "Build School for poor students",
    percentage: 60,
    color: "#5925DC",
    background: "#F4F3FF",
    analysis: [
      {
        id: "1",
        purpose: "Goal",
        amount: 12034000,
        currency: "NGN",
      },
      {
        id: "1",
        purpose: "Collected",
        amount: 100000000,
        currency: "NGN",
      },
      {
        id: "1",
        purpose: "Remaining",
        amount: 11034000,
        currency: "NGN",
      },
    ],
  },
  {
    id: "1",
    src: thumbnail4,
    alt: "donate-thumbnail-4",
    label: "Education",
    title: "Make them happy",
    percentage: 40,
    color: "#026AA2",
    background: "#F0F9FF",
    analysis: [
      {
        id: "1",
        purpose: "Goal",
        amount: 12034000,
        currency: "NGN",
      },
      {
        id: "1",
        purpose: "Collected",
        amount: 100000000,
        currency: "NGN",
      },
      {
        id: "1",
        purpose: "Remaining",
        amount: 11034000,
        currency: "NGN",
      },
    ],
  },
];

const activity: activityProps[] = [
  {
    id: "1",
    count: "7000+",
    info: "HUMANS IMPACTED",
  },
  {
    id: "2",
    count: "250+",
    info: "COLLABORATORS",
  },
  {
    id: "3",
    count: "32+",
    info: "NGOs/BUSINESSES",
  },
  {
    id: "4",
    count: "32+",
    info: "YEARS OF OPERATION",
  },
];

const supportUs: supportProps[] = [
  {
    src: supportus1,
    alt: "supportus1",
    title: "Land of Hope Foundation",
    content:
      "The Land of Hope was founded to fight against the idea that children are witches in Nigeria to be tortured or killed.",
    logo: "",
  },
  {
    src: supportus2,
    alt: "supportus2",
    title: "The GEANCO Foundation",
    content:
      "We organize special surgical missions and run an innovative, life-saving program to fight anemia in Nigeria.",
    logo: "",
  },
  {
    src: supportus3,
    alt: "supportus3",
    title: "Chess in slum Africa",
    content:
      "A non-profit organization using the game of chess to help youngsters in slum communities realize their full potential.",
    logo: "",
  },
  {
    src: supportus4,
    alt: "supportus4",
    title: "Yinka Shonibare Foundation",
    content:
      "Founded to encourage cultural interchange through residencies and development programmes in the UK and Nigeria.",
    logo: "",
  },
  {
    src: supportus5,
    alt: "supportus5",
    title: "Lagos Food Bank Initiative",
    content:
      "The Lagos Food Bank Initiative provides low-income communities across Nigeria with basic food and self-care items.",
    logo: "",
  },
  {
    src: supportus6,
    alt: "supportus6",
    title: "TASTE Nigeria Foundation",
    content:
      "TASTE Nigeria was founded to encourage the spread of appropriate and sustainable technology in Nigeria.",
    logo: "",
  },
];

export default function Donate() {
  const classes = useStyles();

  return (
    <Box
      sx={{
        paddingTop: "7rem",
        color: "#4B5563",
      }}>
      <Box sx={{ textAlign: "center" }}>
        <Box>
          <Typography
            component="div"
            sx={{
              textAlign: "center",
              display: { xs: "inline-block" },
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              background: "#F2DFEE",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}>
            Donate
          </Typography>
          <br />
          <Typography
            component="div"
            sx={{
              textAlign: "center",
              display: { xs: "inline-block" },
              paddingBottom: "2rem",
              borderRadius: "5px",
              fontSize: "1.4em",
              fontWeight: "bold",
            }}>
            Your help is Needed
          </Typography>
        </Box>
      </Box>

      <Box className={classes.scrollContainer}>
        {data?.map((item: donationProps) => (
          <Box key={item.id} className={classes.scrollContentBox}>
            <Box component="div">
              <Box className={classes.imageBox}>
                <Image src={item.src} alt={item.alt} />
              </Box>
              <Box className={classes.contentBox}>
                <Card elevation={2}>
                  <CardContent>
                    <Box component="div">
                      <Typography
                        className={classes.contentLabel}
                        style={{
                          color: item.color,
                          background: item.background,
                        }}>
                        {item.label}
                      </Typography>
                      <Typography className={classes.contentTitle}>
                        {item.title}
                      </Typography>
                      <Box>
                        <LinearProgress
                          variant="determinate"
                          value={item.percentage}
                          className={classes.linearProgress}
                          color="inherit"
                          sx={{ padding: "0.2rem", borderRadius: "5px" }}
                        />
                      </Box>
                      <Grid container spacing={1}>
                        {item?.analysis?.map(
                          (analizedItem: donationAnaysis) => (
                            <Grid key={analizedItem.id} item xs={4}>
                              <Box>
                                <Typography
                                  className={classes.contentAnalysisPurpose}>
                                  {analizedItem.purpose}
                                </Typography>
                                <Typography
                                  className={classes.contentAnalysisAmount}>
                                  {analizedItem.currency}
                                  {formatNumberWithSuffix(analizedItem.amount)}
                                </Typography>
                              </Box>
                            </Grid>
                          )
                        )}
                      </Grid>
                      <Box style={{ padding: "1rem 0 0 0" }}>
                        <Divider />
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ padding: "0 1rem 1rem 1rem" }}>
                    <Link href="#">
                      <PurpleButton
                        text="Donate"
                        endIcon={<Favorite sx={{ color: "#92CD00" }} />}
                        size="small"
                        style={{
                          padding: "0.5rem",
                        }}
                      />
                    </Link>
                    <Box className={classes.contentActionIconBox}>
                      <IconButton>
                        <Redo />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ marginTop: "10rem" }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Grid container spacing={4}>
            {activity?.map((item: activityProps) => (
              <Grid item lg={3} md={3} key={item.id}>
                <Typography
                  style={{
                    color: "#175CD3",
                    fontSize: "60px",
                    lineHeight: "32px",
                  }}>
                  {item.count}
                </Typography>
                <br />
                <Typography
                  style={{
                    fontWeight: 500,
                    lineHeight: "32px",
                    fontSize: "22px",
                  }}>
                  {item.info}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ display: { xs: "block", md: "none" }}}>
          <Grid container spacing={4}>
            {activity?.map((item: activityProps) => (
              <Grid item sm={6} xs={6} key={item.id}>
                <Typography
                  style={{
                    color: "#175CD3",
                    fontSize: "40px",
                    lineHeight: "32px",
                  }}>
                  {item.count}
                </Typography>
                <br />
                <Typography
                  component="div"
                  style={{
                    fontWeight: 500,
                    lineHeight: "32px",
                    // fontSize: "22px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "0px solid gray",
                    height: "50px",
                  }}>
                  {item.info}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box style={{ marginTop: "10rem" }}>
          <Grid container spacing={10}>
            {supportUs?.map((item: supportProps, index) => (
              <Grid item lg={4} md={4} sm={6} xs={12} key={index}>
                <Card style={{ padding: "1rem", background: "#FAFAFA" }}>
                  <Box>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        borderRadius:"10px"
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        lineHeight: "28px",
                        letterSpacing: "-1",
                        color: "#30312C",
                      }}>
                      {item.title}
                    </Typography>
                    <Typography
                      style={{
                        color: "#4B5563",
                        fontSize: "0.8rem",
                        lineHeight: "28px",
                      }}>
                      {item.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton>
                      <BrokenImage />
                    </IconButton>
                    <Button
                      endIcon={<ArrowRightAlt />}
                      style={{
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                        color: "#30312C",
                      }}>
                      Learn more
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
