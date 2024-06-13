import { IBlogComment } from "@/types/IBlog";
import { Person } from "@mui/icons-material";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { getDateDifference } from "../common/helpers";

type props = {
  tempComments?: IBlogComment[];
  comments?: IBlogComment[];
  blogId: string;
};
export default function BlogCommentList(props: props) {
  return (
    <Box>
      <Box>
        {props?.tempComments?.map((item: IBlogComment) => (
          <Box key={item.id}>
            <Box
              sx={{
                display: "flex",
                marginBottom: "10px",
              }}>
              <Box marginRight="10px">
                <Avatar>
                  <Person />
                </Avatar>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "black",
                  }}>
                  {item.email}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.7em",
                    color: "#94A3B8",
                  }}>
                  {getDateDifference(
                    item?.created_at!,
                    new Date().toDateString()
                  ).diffInDays.toFixed(0)}{" "}
                  days ago
                </Typography>

                <Typography
                  sx={{
                    color: "#667085",
                    fontSize: "0.9em",
                    marginTop: "10px",
                  }}>
                  {item.comment}
                </Typography>
              </Box>
            </Box>
            <br />
          </Box>
        ))}
      </Box>
     
      <Box>
        {props?.comments?.map((item: IBlogComment) => (
          <Box key={item.id}>
            <Box
              sx={{
                display: "flex",
                marginBottom: "10px",
              }}>
              <Box marginRight="10px">
                <Avatar>
                  <Person />
                </Avatar>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "black",
                  }}>
                  {item.email}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.7em",
                    color: "#94A3B8",
                  }}>
                  {getDateDifference(
                    item?.created_at!,
                    new Date().toDateString()
                  ).diffInDays.toFixed(0)}{" "}
                  days ago
                </Typography>

                <Typography
                  sx={{
                    color: "#667085",
                    fontSize: "0.9em",
                    marginTop: "10px",
                  }}>
                  {item.comment}
                </Typography>
              </Box>
            </Box>
            <br />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
