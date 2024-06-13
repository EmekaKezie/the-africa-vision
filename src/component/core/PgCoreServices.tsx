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
            fontSize: "1.1em",
            lineHeight: "24px",
            color: "#717171",
            textAlign: "center",
          }}>
          Our dedication to excellence defines everything we do
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
                  fontSize: "1.5em",
                }}>
                {item.title}
              </Typography>
              <br />
              <Typography sx={{ color: "#717171", fontSize: "1.1em" }}>
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
    summary: `We're here to empower Africa's groundbreaking ideas, support the 
      brilliance of Africa's innovators, and champion Africa's entrepreneurial spirit through 
      our cutting-edge crowdfunding platform.`,
  },
  {
    id: "2",
    icon: Thumbnail2,
    title: "Empowerment",
    summary: `African Stories – Share your inspiring experiences in Africa and discover the 
      continent's rich cultural heritage and creativity with African Stories.`,
  },
  {
    id: "3",
    icon: Thumbnail3,
    title: "Africa stories",
    summary: `Empowerment – Beyond crowdfunding, we are passionate about empowering 
      innovators with the resources and support they need to turn their dreams into reality.`,
  },
];
