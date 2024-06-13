import { Box, Typography } from "@mui/material";
import StoryBackground from "@/assets/story-background.png";
import Image from "next/image";
import Thumbnail1 from "@/assets/story-thumbnail-1.png";
import Thumbnail2 from "@/assets/story-thumbnail-2.png";
import PurpleButton from "../common/PurpleButton";
import PurpleLightButton from "../common/PurpleLightButton";

type dataProps = {
  id: string;
  src: any;
  title: string;
  summary: string;
  url: string;
};

export default function PgStory() {
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
          Our Stories
        </Typography>
      </Box>

      <Box
        sx={{
          padding: "0 4rem",
          height: "1300px",
          backgroundImage: `url(${StoryBackground.src})`,
          backgroundPosition: "center",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          display: { xs: "none", md: "block" },
        }}>
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Box>
            <Image
              src={data[0].src}
              alt="thumbnail"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "500px",
              color: "#FFFFFF",
            }}>
            <Box>
              <Typography
                sx={{
                  fontSize: "2.5em",
                  lineHeight: "42.66px",
                  fontWeight: "bold",
                }}>
                {data[0].title}
              </Typography>
              <br />
              <Typography
                sx={{
                  fontSize: "1.2em",
                  lineHeight: "30px",
                }}>
                {data[0].summary}
              </Typography>
              <br />
              <br />
              <PurpleButton text="Learn More" style={{ width: "150px" }} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "500px",
              color: "#FFFFFF",
            }}>
            <Box>
              <Typography
                sx={{
                  fontSize: "2.5em",
                  lineHeight: "42.66px",
                  fontWeight: "bold",
                }}>
                {data[1].title}
              </Typography>
              <br />
              <Typography
                sx={{
                  fontSize: "1.2em",
                  lineHeight: "30px",
                }}>
                {data[1].summary}
              </Typography>
              <br />
              <br />
              <PurpleButton text="Learn More" />
              {/* <PurpleLightButton text="Learn More"/> */}
            </Box>
          </Box>
          <Box>
            <Image
              src={data[1].src}
              alt="thumbnail"
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          padding: "1rem",
          //height: "1300px",
          backgroundColor: `#2F840B`,
          display: { xs: "block", md: "none" },
        }}>
        {data?.map((item: dataProps) => (
          <Box key={item.id} sx={{ border: "0px solid gray" }}>
            <Box>
              <Image
                src={item.src}
                alt="thumbnail"
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Box>
            <Box sx={{ color: "#FFFFFF" }}>
              <Typography
                sx={{
                  fontSize: "2.5em",
                  lineHeight: "42.66px",
                  fontWeight: "bold",
                }}>
                {item.title}
              </Typography>
              <br />
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "30px",
                }}>
                {data[1].summary}
              </Typography>
              <br />
              <br />
              <PurpleButton text="Learn More" style={{ width: "150px" }} />
            </Box>
          </Box>
        ))}
        {/* <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Box>
            <Image
              src={data[0].src}
              alt="thumbnail"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "500px",
              color: "#FFFFFF",
            }}>
            <Box>
              <Typography
                sx={{
                  fontSize: "36px",
                  lineHeight: "42.66px",
                  fontWeight: "bold",
                }}>
                {data[0].title}
              </Typography>
              <br />
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "30px",
                }}>
                {data[0].summary}
              </Typography>
              <br />
              <br />
              <PurpleButton text="Learn More" />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "500px",
              color: "#FFFFFF",
            }}>
            <Box>
              <Typography
                sx={{
                  fontSize: "36px",
                  lineHeight: "42.66px",
                  fontWeight: "bold",
                }}>
                {data[1].title}
              </Typography>
              <br />
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "30px",
                }}>
                {data[1].summary}
              </Typography>
              <br />
              <br />
              <PurpleButton text="Learn More" />
            </Box>
          </Box>
          <Box>
            <Image
              src={data[1].src}
              alt="thumbnail"
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}

const data: dataProps[] = [
  {
    id: "1",
    src: Thumbnail1,
    title: "Empower Innovation",
    summary:
      "TheAfrica Vision Ventures Limited, our mission is clear: to provide Africa with a cuttingedge, tech-driven crowdfunding platform that empowers the innovators and visionaries shaping its future.",
    url: "/",
  },
  {
    id: "2",
    src: Thumbnail2,
    title: "Create Positive Impact",
    summary:
      "Our ultimate goal is to foster positive change, economic growth, and cultural preservation throughout the African continent. We exist because Africa is a treasure trove of untapped brilliance. Countless groundbreaking ideas and ventures struggle to find the support they need.",
    url: "/",
  },
];
