import {  Box } from "@mui/material";
import ReduxProvider from "./ReduxProvider";
import { ReactNode, useState } from "react";
import AuthenticatedNavDrawer from "../core/AuthenticatedNavDrawer";

type props = {
  children: ReactNode;
};

function AuthenticatedLayout(props: props) {
  const [drawer, setDrawer] = useState<boolean>(true);
  const [drawerWidthMd, setDrawerWidthMd] = useState<number>(250);
  const [drawerWidthSm, setDrawerWidthSm] = useState<number>(0);

  return (
    <Box>
      <AuthenticatedNavDrawer
        drawerWidthMd={drawerWidthMd}
        drawerWidthSm={drawerWidthSm}
        openDrawer={drawer}
        onToggleDrawer={(
          drawerValue: boolean,
          drawerWidthMd: number,
          drawerWidthSm: number
        ) => {
          setDrawer(drawerValue);
          setDrawerWidthMd(drawerWidthMd);
          setDrawerWidthSm(drawerWidthSm);
        }}
      />
      <Box
        sx={{
          marginLeft: {
            md: `${drawerWidthMd}px`,
            sm: `${drawerWidthSm}px`,
          },
        }}>
        <br />
        <br />
        <br />
        <br />
        <Box sx={{ padding: "1rem" }}>{props.children}</Box>
      </Box>
    </Box>
  );
}
export default ReduxProvider(AuthenticatedLayout);
