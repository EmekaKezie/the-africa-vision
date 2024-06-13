import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { AccessAlarm, PlaceOutlined, Today } from "@mui/icons-material";
import {
  convertToReadableDate,
  convertToReadableTime,
} from "../common/helpers";
import { ICampaignData } from "@/types/ICampaign";
import { ReactNode } from "react";

type props = {
  redirectUrl?: string;
  item: ICampaignData;
  otherInfo?: ReactNode | string;
};

export default function CampaignListCardType3(props: props) {
  return (
    <Box>
      <Link
        href={
          !props?.redirectUrl ? "" : `${props.redirectUrl}/${props.item.id}`
        }>
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
              <CardMedia
                component="img"
                src={props.item.image}
                alt={props.item.title}
                height="100%"
                sx={{
                  width: "100%",
                }}
              />
            </Box>
            <Box flexGrow={1} border={0} width="50%">
              <Box>
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
                  <Box>{props?.otherInfo}</Box>
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
                  {props.item.title}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Stack direction="row" alignItems="center">
                    <PlaceOutlined
                      sx={{ fontSize: "0.6em", color: "#120F0F", opacity: 0.6 }}
                    />
                    <Typography
                      sx={{
                        color: "#120F0F",
                        opacity: 0.6,
                        fontSize: "0.55em",
                      }}>
                      Lagos Nigeria
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center">
                    <Today
                      sx={{ fontSize: "0.6em", color: "#120F0F", opacity: 0.6 }}
                    />
                    <Typography
                      sx={{
                        color: "#120F0F",
                        opacity: 0.6,
                        fontSize: "0.55em",
                      }}>
                      {convertToReadableDate(props?.item?.start_date!)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center">
                    <AccessAlarm
                      sx={{ fontSize: "0.6em", color: "#120F0F", opacity: 0.6 }}
                    />
                    <Typography
                      sx={{
                        color: "#120F0F",
                        opacity: 0.6,
                        fontSize: "0.55em",
                      }}>
                      {convertToReadableTime(props?.item?.start_date!)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Card>
      </Link>
    </Box>
  );
}
