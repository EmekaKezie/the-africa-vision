import { Box } from "@mui/material";
import ReduxProvider from "./ReduxProvider";
import { ReactNode } from "react";
import Nav from "../core/Nav";

type props = {
  children: ReactNode;
};

function UnauthenticatedLayout(props: props) {
  return (
    <Box>
      <Nav />
      
      sdsdsd
      <Box>{props.children}</Box>
    </Box>
  );
}

export default ReduxProvider(UnauthenticatedLayout);
