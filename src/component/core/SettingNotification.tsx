import { Box, Divider, List, ListItem, ListItemText, Switch, Typography } from "@mui/material";

export default function SettingNotification() {
    return (
        <Box sx={{
            padding: "1rem"
        }}>
            <Box
                sx={{
                    display: "flex"
                }}>
                <Box>
                    <Typography
                        sx={{
                            fontSize: "0.8em",
                            //pointerEvents: !item.isActive ? "auto" : "none",
                            //color: !item.isActive ? "#ADBCD0" : "#120F0F",
                            color: "#120F0F",
                            fontWeight: "bold",
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                        }}
                    >
                        Notification
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "0.8em",
                            //pointerEvents: !item.isActive ? "auto" : "none",
                            //color: !item.isActive ? "#ADBCD0" : "#120F0F",
                            color: "#898989",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                        }}
                    >
                        You can Manage your notification setting
                    </Typography>
                </Box>


            </Box>

            <br />

            <Box>
                <List sx={{ border: "1px solid lightgray" }}>
                    <ListItem>
                        <ListItemText
                            primary="Notification"
                            secondary="You can Manage your notification setting" />
                        <Switch />
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <ListItemText
                            primary="Reminders"
                            secondary="These are notification to remind you of updates you might missed" />
                        <Switch />
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <ListItemText
                            primary="Marketing"
                            secondary="These are notification for marketing changes or news" />
                        <Switch />


                    </ListItem>

                    <Divider />

                    <ListItem>
                        <ListItemText
                            primary="App Notification"
                            secondary="Toggle the one and off to get notifications" />
                        <Switch />
                    </ListItem>

                </List>
            </Box>
        </Box>
    )
}