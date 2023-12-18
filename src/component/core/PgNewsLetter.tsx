import { Box, Grid, TextField, Typography } from "@mui/material";
import PurpleButton from "../common/PurpleButton";

export default function PgNewsLetter() {
  return (
    <Box
      sx={{
        padding: "4rem 0",
      }}>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box>
            <Typography
              sx={{
                lineHeight: "30px",
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: "#120F0F",
              }}>
              Subscribed to our Newsletter to receive more updates
            </Typography>
            <Typography
              sx={{
                lineHeight: "30px",
                fontSize: "1.1rem",
                color: "#120F0F",
              }}>
              Stay up to date with the latest news, announcements, and articles.
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, justifyContent: "end" }}>
            <TextField
              placeholder="Enter your email"
              fullWidth
              style={{ marginRight: "5px" }}
            />
            <PurpleButton text="Subscribe"  style={{ width: "150px" }}/>
          </Box>

          <Box
            sx={{ display: { xs: "block", md: "none" }, justifyContent: "end" }}>
            <TextField
              placeholder="Enter your email"
              fullWidth
              style={{ marginBottom: "5px" }}
            />
            <PurpleButton text="Subscribe"  style={{ width: "150px" }}/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
