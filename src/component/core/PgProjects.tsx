import { Box, Grid, Typography } from "@mui/material";
import Thumbnail1 from "@/assets/projects-thumbnail-1.png";
import Thumbnail2 from "@/assets/projects-thumbnail-2.png";
import Underliner from "@/assets/projects-title-underline.png";
import Image from "next/image";
import PurpleButton from "../common/PurpleButton";
import { ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";

type dataProps = {
  id: string;
  title: string;
  underliner: any;
  summary: string;
  url: string;
  src: any;
};

export default function PgProjects() {
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
          Our Projects
        </Typography>
      </Box>

      <Box sx={{ display: { xs: "none", md: "block" } }}>
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
                  {data[0].title}
                </Typography>
                <Box>
                  <Image
                    src={data[0].underliner}
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
                  sx={{
                    fontSize: "18px",
                    lineHeight: "30px",
                    color: "#120F0F",
                  }}>
                  {data[0].summary}
                </Typography>
                <br />
                <br />
                <br />
                <Box>
                  <Link href={data[0].url}>
                    <PurpleButton text="Let's go" endIcon={<ArrowRightAlt />} />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box>
              <Image
                src={data[0].src}
                alt="Thumbnail"
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Grid container spacing={10}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box>
              <Image
                src={data[1].src}
                alt="Thumbnail"
                style={{
                  width: "100%",
                  objectFit: "cover",
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
                  {data[1].title}
                </Typography>
                <Box>
                  <Image
                    src={data[0].underliner}
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
                  sx={{
                    fontSize: "18px",
                    lineHeight: "30px",
                    color: "#120F0F",
                  }}>
                  {data[1].summary}
                </Typography>
                <br />
                <br />
                <br />
                <Box>
                  <Link href={data[1].url}>
                    <PurpleButton text="Let's go" endIcon={<ArrowRightAlt />} />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Grid container>
          {data?.map((item: dataProps) => (
            <Grid item sm={12} xs={12} key={item.id}>
              <br />
              <br />
              <Box>
                <Box>
                  <Image
                    src={item.src}
                    alt="thumbnail"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
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
                    src={item.underliner}
                    alt="underliner"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <br />
                <Typography
                  component="div"
                  sx={{
                    fontSize: "18px",
                    lineHeight: "30px",
                    color: "#120F0F",
                  }}>
                  {item.summary}
                </Typography>
                <br />
                <Box>
                  <Link href={data[1].url}>
                    <PurpleButton text="Let's go" endIcon={<ArrowRightAlt />} />
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

const data: dataProps[] = [
  {
    id: "1",
    title: "Crowdfunding intiative",
    underliner: Underliner,
    summary:
      "Use the web clipper extension, available on Chrome and Firefox, to save web pages or take screenshots as notes.",
    url: "/project",
    src: Thumbnail1,
  },
  {
    id: "2",
    title: "Hands of hope ",
    underliner: Underliner,
    summary:
      "Use the web clipper extension, available on Chrome and Firefox, to save web pages or take screenshots as notes.",
    url: "/project",
    src: Thumbnail2,
  },
];
