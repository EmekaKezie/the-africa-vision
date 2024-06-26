"use client";
import { Box } from "@mui/material";
import ReduxProvider from "./ReduxProvider";
import { ReactNode, useEffect, useState } from "react";
import AuthenticatedNavDrawer from "../core/AuthenticatedNavDrawer";
import { useAppSelector } from "@/redux/useReduxHooks";
import { useRouter } from "next/navigation";
import ExpiredSessionModal from "./ExpiredSessionModal";

type props = {
  children: ReactNode;
};

function AuthenticatedLayout(props: props) {
  const router = useRouter();
  const authStore = useAppSelector((state) => state.authReducer);
  const sessionStore = useAppSelector(state => state.sessionReducer);

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      router.push("../auth/login");
    }
    // eslint-disable-next-line
  }, []);

  const [drawer, setDrawer] = useState<boolean>(true);
  const [drawerWidthMd, setDrawerWidthMd] = useState<number>(250);
  const [drawerWidthSm, setDrawerWidthSm] = useState<number>(0);

  return (
    <Box
      sx={{
        backgroundColor: "#F9F9F9",
        minHeight: "100vh",
      }}>
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
        <Box
          sx={{
            padding: "1rem",
          }}>
          {props.children}
        </Box>
      </Box>

      {!sessionStore.isValid && <ExpiredSessionModal/>}
    </Box>
  );
}
export default ReduxProvider(AuthenticatedLayout);
