import { IStory } from "@/types/IStory";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import PurpleLightButton from "../common/PurpleLightButton";
import Image from "next/image";
import { AccessAlarm, PlaceOutlined, Today } from "@mui/icons-material";
import {
  convertToReadableDate,
  convertToReadableTime,
} from "../common/helpers";

type props = {
  redirectUrl?: string;
  item: IStory;
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
              <Image
                src={props?.item?.coverImage}
                alt={props.item.title}
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box flexGrow={1} border={0} width="50%">
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
                {props.item.categoryName}
              </Typography>
              <Typography
                sx={{
                  color: "#120F0F",
                  fontSize: "0.8em",
                  fontWeight: "bold",
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "block-axis",
                  WebkitLineClamp: 1,
                  margin: "5px 0 10px 0",
                }}>
                {props.item.title}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Stack direction="row" alignItems="center">
                  <PlaceOutlined
                    sx={{ fontSize: "0.6em", color: "#120F0F", opacity: 0.6 }}
                  />
                  <Typography
                    sx={{ color: "#120F0F", opacity: 0.6, fontSize: "0.55em" }}>
                    Lagos Nigeria
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Today
                    sx={{ fontSize: "0.6em", color: "#120F0F", opacity: 0.6 }}
                  />
                  <Typography
                    sx={{ color: "#120F0F", opacity: 0.6, fontSize: "0.55em" }}>
                    {convertToReadableDate(props?.item?.startDate!)}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <AccessAlarm
                    sx={{ fontSize: "0.6em", color: "#120F0F", opacity: 0.6 }}
                  />
                  <Typography
                    sx={{ color: "#120F0F", opacity: 0.6, fontSize: "0.55em" }}>
                    {convertToReadableTime(props?.item?.startDate!)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Card>
      </Link>
    </Box>
  );
}
