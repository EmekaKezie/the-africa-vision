import { Box, CardMedia, Grid, Typography, createTheme } from "@mui/material";
import Underliner from "@/assets/projects-title-underline.png";
import Image from "next/image";
import PurpleButton from "../common/PurpleButton";
import { ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ICampaignData } from "@/types/ICampaign";
import { ApiGetCampaignsForAll } from "../api/campaignApi";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import SkeletonList from "./SkeletonList";
import { ThemeProvider, makeStyles } from "@mui/styles";
import MUIRichTextEditor from "mui-rte";


export default function PgProjects() {
  const classes = useStyles();

  const [campaigns, setCampaigns] = useState<ICampaignData[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(true);

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line
  }, []);

  const fetchCampaigns = () => {
    setLoadingCampaigns(true);
    ApiGetCampaignsForAll()
      .then((response: IResponse<any>) => {
        setLoadingCampaigns(false);
        if (response.status === ResponseEnum.success) {
          const campaignData = response?.data?.campaigns;
          const lastTwoItems = campaignData.slice(-2);
          setCampaigns(lastTwoItems);
        }
      })
      .catch((error: any) => {
        setLoadingCampaigns(false);
        // enqueueSnackbar("Error fetching donations", {
        //   variant: "error",
        //   anchorOrigin: {
        //     vertical: "top",
        //     horizontal: "right",
        //   },
        // });
      });
  };

  const renderCampaignMD1 = (item: ICampaignData) => {
    if (loadingCampaigns) {
      return (
        <Box sx={{ paddingTop: "1rem" }}>
          <SkeletonList itemcount={3} cardType="type1" />
        </Box>
      );
    }
    if (!loadingCampaigns && campaigns.length > 0) {
      return (
        <Grid container spacing={10}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}>
              <Box>
                <Typography
                  component="div"
                  sx={{
                    fontSize: "5em",
                    lineHeight: "87.14px",
                    color: "#120F0F",
                    fontWeight: "bold",
                    letterSpacing: "-0.4rem",
                  }}>
                  {item.title}
                </Typography>
                <Box>
                  <Image
                    src={Underliner}
                    alt="underliner"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <br />
                <br />
                <Typography
                  component="div"
                  variant="body2"
                  sx={{
                    color: "#7B7D8C",
                    fontSize: "40px",
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 6,
                  }}>
                  <ThemeProvider theme={myTheme}>
                    <MUIRichTextEditor
                      defaultValue={!item ? "" : item.content}
                      readOnly
                      controls={["my-style"]}
                      customControls={[
                        {
                            name: "my-style",
                            // icon: <InvertColorsIcon />,
                            type: "inline",
                            inlineStyle: {
                                backgroundColor: "black",
                                color: "white"
                            },
                            

                        }
                    ]}
                    />
                  </ThemeProvider>
                </Typography> 
                <br />
                <br />
                <Box>
                  <Link href={`/explore/campaign/${item.id}`}>
                    <PurpleButton text="Let's go" endIcon={<ArrowRightAlt />} />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box
              sx={{
                height: { md: "500px", xs: "200px" },
                overflow: "hidden",
                position: "relative",
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  background: "rgba(0, 0, 0, 0.1)",
                },
              }}>
              <CardMedia
                component="img"
                image={item.image}
                style={{
                  //width: "100%",
                  objectFit: "cover",
                  height: "500px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      );
    }
  };

  const renderCampaignMD2 = (item: ICampaignData) => {
    if (loadingCampaigns) {
      return (
        <Box sx={{ paddingTop: "1rem" }}>
          <SkeletonList itemcount={3} cardType="type1" />
        </Box>
      );
    }
    if (!loadingCampaigns && campaigns.length > 0) {
      return (
        <Grid container spacing={10}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box
              sx={{
                height: { md: "500px", xs: "200px" },
                overflow: "hidden",
                position: "relative",
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  background: "rgba(0, 0, 0, 0.1)",
                },
              }}>
              <CardMedia
                component="img"
                image={item.image}
                style={{
                  //width: "100%",
                  objectFit: "cover",
                  height: "500px",
                }}
              />
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}>
              <Box>
                <Typography
                  component="div"
                  sx={{
                    fontSize: "5em",
                    lineHeight: "87.14px",
                    color: "#120F0F",
                    fontWeight: "bold",
                    letterSpacing: "-0.4rem",
                  }}>
                  {item.title}
                </Typography>
                <Box>
                  <Image
                    src={Underliner}
                    alt="underliner"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <br />
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
                    WebkitLineClamp: 6,
                  }}>
                  <ThemeProvider theme={myTheme}>
                    <MUIRichTextEditor
                      defaultValue={!item ? "" : item.content}
                      readOnly
                      controls={[]}
                    />
                  </ThemeProvider>
                </Typography>
                <br />
                <br />
                <Box>
                  <Link href={`/explore/campaign/${item.id}`}>
                    <PurpleButton text="Let's go" endIcon={<ArrowRightAlt />} />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      );
    }
  };

  const renderCampaignSM = (items: ICampaignData[]) => {
    if (loadingCampaigns) {
      return (
        <Box sx={{ paddingTop: "1rem" }}>
          <SkeletonList itemcount={3} cardType="type1" />
        </Box>
      );
    }
    if (!loadingCampaigns && campaigns.length > 0) {
      return (
        <Grid container>
          {items?.map((item: ICampaignData) => (
            <Grid item sm={12} xs={12} key={item.id}>
              <br />
              <br />
              <Box>
                <Box>
                  <CardMedia
                    component="img"
                    image={item.image}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* <Image
                    src={item.src}
                    alt="thumbnail"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                  /> */}
                </Box>

                <Typography
                  component="div"
                  sx={{
                    fontSize: "3em",
                    color: "#120F0F",
                    fontWeight: "bold",
                    letterSpacing: "-0.3rem",
                    textAlign: "center",
                  }}>
                  {item.title}
                </Typography>
                <Box>
                  <Image
                    src={Underliner}
                    alt="underliner"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Box>
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
                      defaultValue={!item ? "" : item.content}
                      readOnly
                      controls={[]}
                    />
                  </ThemeProvider>
                </Typography>
                <br />
                <Box>
                  <Link href={`/explore/campaign/${item.id}`}>
                    <PurpleButton text="Let's go" endIcon={<ArrowRightAlt />} />
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  return (
    <Box
      sx={{
        padding: "4rem 0",
      }}>
      <Box sx={{ marginBottom: "3rem" }}>
        <Typography
          sx={{
            color: "#4D4D4D",
            lineHeight: "47.4px",
            fontSize: "2.5em",
            fontWeight: "bold",
            textAlign: "center",
          }}>
          African Stories
        </Typography>
      </Box>

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        {renderCampaignMD1(campaigns[0])}
        <br />
        <br />
        <br />
        <br />
        <br />
        {renderCampaignMD2(campaigns[1])}
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {renderCampaignSM(campaigns)}
      </Box>
    </Box>
  );
}

const myTheme = createTheme({
  // Set up your custom MUI theme here
  
});


const useStyles = makeStyles((theme) => ({
  readOnly: {
    // Define your read-only styles here
    backgroundColor: '#f0f0f0',
    color: '#333',
    //padding: theme.spacing(2),
    //borderRadius: theme.shape.borderRadius,
    border: '1px solid #ddd',
  },
  editor: {
    // Styles for the editable mode
  },
}));
