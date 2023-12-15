import { Camera } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import Thumbnail1 from "@/assets/ourservices-thumbnail-1.png";
import Thumbnail2 from "@/assets/ourservices-thumbnail-2.png";
import Thumbnail3 from "@/assets/ourservices-thumbnail-2.png";
import Image from "next/image";

type dataProps = {
  id: string;
  icon: any;
  title: string;
  summary: string;
};

export default function PgCoreServices() {
  return (
    <Box
      sx={{
        padding: "4rem 0",
      }}>
      <Box sx={{ marginBottom: "3rem" }}>
        <Typography
          sx={{
            fontSize: "2.5em",
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: "44px",
            color: "#4D4D4D",
          }}>
          Our Core Services
        </Typography>
        <Typography
          sx={{
            fontSize: "1em",
            lineHeight: "24px",
            color: "#717171",
            textAlign: "center",
          }}>
          Why we believe in our vision
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {data?.map((item: dataProps) => (
          <Grid item lg={4} md={4} sm={4} xs={12} key={item.id}>
            <Box sx={{ textAlign: "center" }}>
              <Box>
                <Image src={item.icon} alt="thumbnail" />
              </Box>
              <br />
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#4D4D4D",
                  fontSize: "1.6em",
                }}>
                {item.title}
              </Typography>
              <br />
              <Typography sx={{ color: "#717171", fontSize: "1.15em" }}>
                {item.summary}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const data: dataProps[] = [
  {
    id: "1",
    icon: Thumbnail1,
    title: "Crowdfunding",
    summary:
      "Beyond crowdfunding, we are passionate about preserving and celebrating African culture.",
  },
  {
    id: "2",
    icon: Thumbnail2,
    title: "Empowerment",
    summary:
      "We exist to bridge this gap, offering a platform where innovators can connect with the resources and backing, they require to turn their dreams into reality",
  },
  {
    id: "3",
    icon: Thumbnail3,
    title: "Africa stories",
    summary:
      "Our commitment goes beyond crowdfunding. We recognize the immense value of preserving and celebrating African culture",
  },
];
