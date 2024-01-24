import { useAppSelector } from "@/redux/useReduxHooks";
import { Notifications, Person } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

export default function AuthenticatedNavUserMenu() {
  const authStore = useAppSelector((state) => state.authReducer);
  return (
    <Stack direction="row" spacing={1}>
      <Avatar>
        <Person />
      </Avatar>
      <Box
        sx={{
          display: { md: "flex", xs: "none" },
          alignItems: "center",
        }}>
        <Box>
          <Typography
            sx={{
              color: "#202020",
              fontSize: "14px",
              lineHeight: "16.94px",
            }}>
            {authStore?.fullname}
          </Typography>
          <Typography
            sx={{
              color: "#898989",
              fontSize: "12px",
              lineHeight: "14.52px",
            }}>
            {authStore.role}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}
