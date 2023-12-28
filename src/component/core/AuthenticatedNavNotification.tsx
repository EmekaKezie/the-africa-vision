import { Notifications } from "@mui/icons-material";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

export default function AuthenticatedNavNotification() {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };
  return (
    <Box sx={{ marginTop: "5px" }}>
      <Tooltip title="Notification">
        <IconButton onClick={handleOpenMenu}>
          <Badge badgeContent={4} color="secondary">
            <Notifications color="action" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        elevation={1}
        id="menu-appbar"
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ marginTop: "10px" }}
        onClose={handleCloseMenu}>
        <List
          sx={{
            border: "0px solid gray",
            width: { md: "20vw", xs: "100vw" },
          }}>
          <ListItem>
            <ListItemText primary="Notification 1" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Notification 2" />
          </ListItem>
        </List>
      </Menu>
    </Box>
  );
}
