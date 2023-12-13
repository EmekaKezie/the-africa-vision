import { FormatQuoteRounded } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

type props = {
  counter: string;
  title: string;
  desc: string;
};

export default function Testimonials() {
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
            Testimonials
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
            What people say about us
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{
              display: { xs: "none", md: "inline-block" },
              //   padding: "3rem",
              margin: "0 20%",
              background: "#F9FAFB",
            }}>
            <FormatQuoteRounded
              sx={{ fontSize: "100px", color: "lightgray" }}
            />
            <Typography sx={{ padding: "2rem" }}>{texts[0]}</Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "inline-block", md: "none" },
              //   padding: "3rem",
              background: "#F9FAFB",
            }}>
            <FormatQuoteRounded
              sx={{ fontSize: "100px", color: "lightgray" }}
            />
            <Typography sx={{ padding: "2rem" }}>{texts[1]}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ paddingTop: "3rem" }}>
        <Grid container spacing={4}>
          {data?.map((item: props, index: number) => (
            <Grid item lg={3} md={3} sm={6} xs={6} key={index}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#A8518A",
                    fontSize: "1.2rem",
                    paddingBottom: "1rem",
                  }}>
                  {item.counter}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#4B5563",
                    fontSize: "0.9rem",
                  }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: "#4B5563", fontSize: "0.8rem" }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

const data: props[] = [
  {
    counter: "0%",
    title: "Platform charge",
    desc: "contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    counter: "12+",
    title: "Donations given",
    desc: "contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    counter: "16+",
    title: "Active Donors",
    desc: "contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
  {
    counter: "2000+",
    title: "Success stories",
    desc: "contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
];

const texts: string[] = [
  "Our commitment goes beyond crowdfunding. We recognize the immense value of preserving and celebrating African culture. That's why we have a dedicated blog where we curate and share authentic African",
  "Our commitment goes beyond crowdfunding. We recognize the immense value of preserving and celebrating African culture. That's why we have a dedicated blog where we curate and share authentic African content.",
];
