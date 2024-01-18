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
import { storyData } from "@/data/storyData";
import { IStory } from "@/types/IStory";
import { KeyboardArrowLeft } from "@mui/icons-material";
import {
  convertToPercentage,
  formatNumberWithSuffix,
  getDateDifference,
} from "@/component/common/helpers";
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

  const splitPathname: string[] = pathname.split("/");
  const pageId = splitPathname[splitPathname.length - 1];
  const data = storyData.filter((x: IStory) => x.id === pageId)[0];

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
            src={data.coverImage}
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
                    {convertToPercentage(data?.budget, data?.revenue)}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={convertToPercentage(
                    data?.budget ?? 0,
                    data?.revenue ?? 0
                  )}
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
                    Raised: {data.currency}
                    {formatNumberWithSuffix(!data?.revenue ? 0 : data?.revenue)}
                  </Typography>
                  <Typography fontSize="0.7em">
                    Goal: {data?.currency}
                    {formatNumberWithSuffix(!data?.budget ? 0 : data?.budget)}
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
                  attanied: data?.revenue,
                  currency: data?.currency,
                  goal: data?.budget,
                  outstanding: data?.budget! - data?.revenue!,
                  contributions: 120,
                  percentage: convertToPercentage(
                    data?.budget ?? 0,
                    data?.revenue ?? 0
                  ),
                  countdown: 10,
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
