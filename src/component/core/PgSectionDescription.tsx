import { Box, Typography } from "@mui/material";

type props = {
  title: string;
  subtitle: string;
};

export default function PgSectionDescription(props: props) {
  return (
    <Box>
      <Typography
        sx={{
          color: "#4D4D4D",
          fontSize: "1.1em",
          fontWeight: "bold",
        }}>
        {props.title}
      </Typography>
      <Typography
        sx={{
          color: "#252A34",
          fontSize: { md: "2em", xs: "1.5em" },
          fontWeight: "bold",
          lineHeight: { md: "40px", xs: "30px" },
          //width: { md: "40%", xs: "100%" },
        }}>
        {props.subtitle}
      </Typography>
    </Box>
  );
}
