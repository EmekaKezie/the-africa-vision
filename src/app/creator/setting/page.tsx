"use client"
import { ApiGetLoggedInUser } from "@/component/api/authApi";
import AuthenticatedLayout from "@/component/common/AuthenticatedLayout";
import ExpiredSessionModal from "@/component/common/ExpiredSessionModal";
import ReduxProvider from "@/component/common/ReduxProvider";
import BreadCrumb from "@/component/core/BreadCrumb";
import SettingChangePassword from "@/component/core/SettingChangePassword";
import SettingPersonalDetail from "@/component/core/SettingPersonalDetail";
import { useAppSelector } from "@/redux/useReduxHooks";
import { IResponse, ResponseEnum } from "@/types/IAppbaseTypes";
import { IUser2 } from "@/types/IUser";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

function CreatorSetting() {
  const authStore = useAppSelector((state) => state.authReducer);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [user, setUser] = useState<IUser2>({} as IUser2);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [isSessionValid, setIsSessionValid] = useState<boolean>(true)

  const tabList: string[] = ["Personal Information", "Change Password"];

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const getUser = () => {
    setLoadingUser(true)
    ApiGetLoggedInUser(authStore.token).then((response: IResponse<any>) => {
      setLoadingUser(false)
      if (response.status === ResponseEnum.success) {
        const user = response.data.user;
        setUser(user)
      }

      if (response.status === ResponseEnum.fail) {

      }

      if (response.status === ResponseEnum.expired_token) {
        console.log("sdfsdfsdfsdfsdf")
        setIsSessionValid(false)
      }
      console.log(response)
    }).catch((error) => {
      setLoadingUser(false);
      enqueueSnackbar("Error fetching user information", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    })
  }

  const handleTabChange = (e: any, value: number) => {
    setTabIndex(value);
  };


  return (
    <AuthenticatedLayout>
      <Box>
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#0F172A",
              fontSize: "1.5em",
            }}>
            Setting
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
                  displayName: "Setting",
                  isActive: true,
                },
              ]}
            />
          </Box>


        </Box>

        <br />
        <br />


        <Box
          sx={{
            padding: "1rem",
            backgroundColor: "#FFFFFF",
            height: "100%",
            boxShadow: "1px 1px 5px lightgray",
            borderRadius: "5px",
          }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            {tabList.map((item: string, index: number) => (
              <Tab
                key={index}
                label={
                  <Box
                    sx={{
                      color: "#A9518B",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      textTransform: "none",
                    }}>
                    {item}
                  </Box>
                }
              />
            ))}
          </Tabs>
          <Divider />
          {tabIndex === 0 && <SettingPersonalDetail data={user}/>}
          {tabIndex === 1 && <SettingChangePassword />}
        </Box>

      </Box>

      {!loadingUser && !isSessionValid && <ExpiredSessionModal />}

    </AuthenticatedLayout>
  )
}

export default ReduxProvider(CreatorSetting);
