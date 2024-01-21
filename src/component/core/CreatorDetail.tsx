import { IUser } from "@/types/IUser";
import { Box, Divider, Icon, Paper, Typography } from "@mui/material";
import ProfileImage from "@/assets/profile-sample1.jpeg";
import Image from "next/image";
import {
  Email,
  EmailOutlined,
  PhoneOutlined,
  StarOutline,
} from "@mui/icons-material";

type props = {
  data: IUser;
};

export default function CreatorDetail(props: props) {
  let backgroundColor = "";
  let color = "";

  switch (props.data.status) {
    case "active":
      backgroundColor = "#ECFDF3";
      color = "#027A48";
      break;
    case "deactivated":
      backgroundColor = "#F8E0E0";
      color = "#EB0505";
      break;
    case "pending":
      backgroundColor = "#FFF7E4";
      color = "#FECE51";
      break;
  }
  return (
    <Box>
      <Paper>
        <Box>
          <Box
            sx={{
              height: "150px",
              backgroundColor: "#A9518B",
            }}></Box>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              marginTop: "-100px",
            }}>
            <Box
              sx={{
                border: "0px solid gray",
                height: "150px",
                width: "150px",
                borderRadius: "50%",
                overflow: "hidden",
              }}>
              <Image
                src={ProfileImage}
                alt="Profile"
                style={{
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </Box>
          </Box>
          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Box textAlign="center">
              <Typography color="#333843" fontWeight="bold">
                {props.data?.fullname}
              </Typography>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: "0.95em",
                  backgroundColor: backgroundColor,
                  color: color,
                  fontWeight: "bold",
                  padding: "0.2em",
                  borderRadius: "10px",
                  width: "100px",
                  textAlign: "center",
                }}>
                {props.data?.status}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ padding: "1em" }}>
            <Divider />
            <br />
            <Box display="flex" gap={2} alignItems="center">
              <Icon
                sx={{
                  backgroundColor: "#F0F1F3",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <EmailOutlined
                  sx={{
                    color: "#667085",
                  }}
                />
              </Icon>
              <Box>
                <Typography
                  sx={{
                    color: "#4D5464",
                    fontSize: "0.7em",
                  }}>
                  Email Address
                </Typography>
                <Typography
                  sx={{
                    color: "#1A1C21",
                    fontSize: "0.9em",
                  }}>
                  {props.data?.email}
                </Typography>
              </Box>
            </Box>
            <br />
            <Box display="flex" gap={2} alignItems="center">
              <Icon
                sx={{
                  backgroundColor: "#F0F1F3",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <PhoneOutlined
                  sx={{
                    color: "#667085",
                  }}
                />
              </Icon>
              <Box>
                <Typography
                  sx={{
                    color: "#4D5464",
                    fontSize: "0.7em",
                  }}>
                  Phone Number
                </Typography>
                <Typography
                  sx={{
                    color: "#1A1C21",
                    fontSize: "0.9em",
                  }}>
                  {props.data?.phone}
                </Typography>
              </Box>
            </Box>
            <br />
            <Box display="flex" gap={2} alignItems="center">
              <Icon
                sx={{
                  backgroundColor: "#F0F1F3",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <StarOutline
                  sx={{
                    color: "#1A1C21",
                    fontSize: "0.9em",
                  }}
                />
              </Icon>
              <Box>
                <Typography
                  sx={{
                    color: "#4D5464",
                    fontSize: "0.7em",
                  }}>
                  Role
                </Typography>
                <Typography
                  sx={{
                    color: "#1A1C21",
                    fontSize: "0.9em",
                  }}>
                  {props.data?.role}
                </Typography>
              </Box>
            </Box>
            <br/>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
