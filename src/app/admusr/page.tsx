"use client"
import ReduxProvider from "@/component/common/ReduxProvider";
import { useAppSelector } from "@/redux/useReduxHooks";
import { Box } from "@mui/material";

function AdminUserOverview(){
    const auth = useAppSelector(state => state.authReducer)
    return <Box>{auth?.email}</Box>
}

export default ReduxProvider(AdminUserOverview)