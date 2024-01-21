"use client";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ReduxProvider from "@/component/common/ReduxProvider";
import BlogCreationForm from "@/component/core/BlogCreationForm";
import BreadCrumb from "@/component/core/BreadCrumb";
import { Box, Grid, Typography } from "@mui/material";

function CreateStory() {
  return (
    <AuthenticatedLayout>
      <Box>
        <BreadCrumb
          data={[
            {
              displayName: "Stories",
              url: "/creator/blog",
              isActive: false,
              divider: "/",
            },
            {
              displayName: "Create Story",
              isActive: true,
            },
          ]}
        />
      </Box>
      <br />
      <Box>
        <Typography
          component="div"
          sx={{
            color: "#120F0F",
            fontSize: { md: "1.8em", xs: "1.3em" },
            fontWeight: "bold",
          }}>
          Create a New Blog Post
        </Typography>
        <br />
        <Typography
          sx={{
            color: "#120F0F",
            fontSize: "0.9em",
          }}>
          {`All content you add to you blogs post must be original content. If it is your own content from any other websites, Please use the Url option to indicate this. All acknowledgement of source reference must be ensured.`}
        </Typography>
      </Box>
      <br />
      <br/>
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
