import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { AccessAlarm, PlaceOutlined, Today } from "@mui/icons-material";
import {
  convertToReadableDate,
  convertToReadableTime,
} from "../common/helpers";
import { IBlogData } from "@/types/IBlog";
import { ReactNode } from "react";

type props = {
  redirectUrl?: string;
  item: IBlogData;
  otherInfo?: ReactNode | string;
};

export default function BlogListCardType4(props: props) {
  return (
    <Box>
      <Card elevation={0} sx={{ border: "1px solid #E6E6E6" }}>
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            gap: 1,
          }}>
          <Box
            sx={{
              width: "70px",
              height: "70px",
              overflow: "hidden",
              border: "0px solid gray",
            }}>
            <Link
              href={
                !props?.redirectUrl
                  ? ""
                  : `${props.redirectUrl}/${props.item.id}`
              }>
              <CardMedia
                component="img"
                src={props.item.image}
                alt={props.item.title}
                height="100%"
                sx={{
                  width: "100%",
                }}
              />
            </Link>
          </Box>
          <Box flexGrow={1} border={0} width="50%">
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box flexGrow={1}>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "0.7em",
                    backgroundColor: "#F4F3FF",
                    padding: "0.2rem 0.4rem",
                    color: "#5925DC",
                    fontWeight: "bold",
                    //boxShadow:"1px 1px 1px 1px lightgray",
                    //borderRadius:"5px"
                  }}>
                  {props.item?.category?.name}
                </Typography>
              </Box>
              <Box>
                <Typography>{props?.otherInfo}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "#120F0F",
                  fontSize: "0.8em",
                  fontWeight: "bold",
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "block-axis",
                  WebkitLineClamp: 1,
                  margin: "10px 0 0px 0",
                }}>
                <Link
                  href={
                    !props?.redirectUrl
                      ? ""
                      : `${props.redirectUrl}/${props.item.id}`
                  }>
                  {props.item.title}
                </Link>
              </Typography>
              <Stack direction="row" spacing={1}>
                <Stack direction="row" alignItems="center">
                  {/* <PlaceOutlined
                    sx={{ fontSize: "0.6em", color: "#120F0F", opacity: 0.6 }}
                  /> */}
                  <Typography
                    sx={{
                      color: "#120F0F",
                      opacity: 0.8,
                      fontSize: "0.55em",
                      fontWeight: "bold",
                      marginRight: "5px",
                    }}>
                    Created:
                  </Typography>

                  <Typography
                    sx={{
                      color: "#120F0F",
                      opacity: 0.6,
                      fontSize: "0.55em",
                    }}>
                    {convertToReadableDate(props.item?.created_at)}
                  </Typography>
                </Stack>

                {/* <Stack direction="row" alignItems="center">
                    <Typography
                      sx={{
                        color: "#120F0F",
                        opacity: 0.8,
                        fontSize: "0.55em",
                        fontWeight: "bold",
                        marginRight: "5px",
                      }}>
                      Published:
                    </Typography>
                    <Typography
                      sx={{
                        color: "#120F0F",
                        opacity: 0.6,
                        fontSize: "0.55em",
                      }}>
                      {convertToReadableDate(props?.item?.published_at)}
                    </Typography>
                  </Stack> */}

                {/* <Stack direction="row" alignItems="center">
                  <AccessAlarm
                    sx={{ fontSize: "0.6em", color: "#120F0F", opacity: 0.6 }}
                  />
                  <Typography
                    sx={{ color: "#120F0F", opacity: 0.6, fontSize: "0.55em" }}>
                    {convertToReadableTime(props?.item?.start_date!)}
                  </Typography>
                </Stack> */}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
