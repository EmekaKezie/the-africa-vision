"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import BlogCreationForm from "@/component/core/BlogCreationForm";
import BreadCrumb from "@/component/core/BreadCrumb";
import { Box, Grid, Typography } from "@mui/material";

function CreateStory() {
  return (
    <AuthenticatedLayout>
      <br/>
      <Box
        sx={{
          display: { md: "flex", xs: "Block" },
        }}>
        <Box flexGrow={1}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#0F172A",
              fontSize: "1.5em",
            }}>
            Create Blog Story
          </Typography>

          <Box>
            <BreadCrumb
              data={[
                {
                  displayName: "Dashboard",
                  url: "/creator/dashboard",
                  isActive: false,
                  divider: "/",
                },
                {
                  displayName: "Stories",
                  url: "/creator/story",
                  isActive: false,
                  divider: "/",
                },
                {
                  displayName: "Create",
                  isActive: true,
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
      <br />
      <Box>
        <Typography
          sx={{
            color: "#120F0F",
            fontSize: "0.9em",
          }}>
          {`All content you add to you blogs post must be original content. If it is your own content from any other websites, Please use the Url option to indicate this. All acknowledgement of source reference must be ensured.`}
        </Typography>
      </Box>
      <br />
      <br />
      <Box>
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <BlogCreationForm />
          </Grid>
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}

export default ReduxProvider(CreateStory);
