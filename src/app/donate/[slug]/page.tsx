"use client";
import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { storyDonationData } from "@/data/storyDonationData";
import { IStory } from "@/types/IStory";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { formatNumberWithSuffix } from "@/component/common/helpers";
import StoryImages from "@/component/core/StoryImages";
import { start } from "repl";
import Image from "next/image";
import Nav from "@/component/core/Nav";
import PurpleButton from "@/component/common/PurpleButton";
import PgFooter from "@/component/core/PgFooter";
import DonationAnalytics from "@/component/core/DonationAnalytics";

export default function DonateViewPage() {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  //console.log(searchParams.get("p"));

  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[splitPathname.length - 1];
  const data = storyDonationData.filter((x: IStory) => x.id === pageId)[0];
  console.log(data);

  console.log(pageId);
  return (
    <Box>
      <Nav />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ padding: { md: "0 8rem", xs: "0 1rem" } }}>
        <Stack direction="row" alignItems="center">
          <IconButton
            onClick={() => {
              router.push("/donate");
            }}>
            <KeyboardArrowLeft />
          </IconButton>
          <Typography>Back</Typography>
        </Stack>
        <br />

        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { md: "2em", xs: "1.5em" },
          }}>
          {data?.title}
        </Typography>

        <br />

        <Box
          sx={{
            height: { md: "300px", xs: "200px" },
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
              background: "rgba(0, 0, 0, 0.5)",
            },
          }}>
          <Image
            src={data.image.src}
            alt="Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <br />
        <br />
        <br />

        <Grid container spacing={4}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box>
              <Box>
                <Stack direction="row" marginBottom="0.5rem">
                  <Typography flexGrow={1} fontSize="0.7em">
                    Donation
                  </Typography>
                  <Typography fontSize="0.7em">
                    {data?.analytics?.percentage}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={
                    !data?.analytics?.percentage
                      ? 0
                      : data?.analytics?.percentage
                  }
                  sx={{
                    padding: "0.2rem",
                    borderRadius: "5px",
                    backgroundColor: "#C7E7DF",
                    "&>.MuiLinearProgress-bar": {
                      background: "#A9518B",
                    },
                  }}
                />
                <Stack direction="row" marginTop="0.5rem">
                  <Typography flexGrow={1} fontSize="0.7em">
                    Raised: {data.analytics?.currency}
                    {formatNumberWithSuffix(
                      !data?.analytics?.attanied ? 0 : data?.analytics?.attanied
                    )}
                  </Typography>
                  <Typography fontSize="0.7em">
                    Goal: {data.analytics?.currency}
                    {formatNumberWithSuffix(
                      !data?.analytics?.goal ? 0 : data?.analytics?.goal
                    )}
                  </Typography>
                </Stack>
              </Box>

              <br />
              <br />

              <Box
                sx={{
                  color: "#667085",
                  fontSize: "0.9em",
                  lineHeight: "30.45px",
                }}>
                {data?.content}
              </Box>

              <br />
              <br />

              <Box>
                <TextField
                  placeholder="Add message here"
                  multiline
                  fullWidth
                  rows={10}
                />
                <br />
                <br />
                <PurpleButton text="Send Message" style={{ width: "150px" }} />
              </Box>
            </Box>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Box>
              <DonationAnalytics
                data={{
                  attanied: data?.analytics?.attanied,
                  currency: data?.analytics?.currency,
                  goal: data?.analytics?.goal,
                  outstanding: data?.analytics?.outstanding,
                  contributions: data?.analytics?.contributions,
                  percentage: data?.analytics?.percentage,
                  countdown: data?.analytics?.countdown,
                }}
                url={`/donate/${pageId}/action`}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br />
      <br />
      <Box
        sx={{
          padding: { md: "0 8rem", xs: "0 1rem" },
          backgroundColor: "#FFF9FD",
        }}>
        <PgFooter />
      </Box>
    </Box>
  );
}
