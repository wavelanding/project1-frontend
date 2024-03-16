import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatIcon from "@mui/icons-material/Chat";
import LoginIcon from "@mui/icons-material/Login";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";

// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

// Import your logo
// import Logo from "./2.webp"; // Adjust the path as necessary
// import { Link } from "react-router-dom";
import router from "../components/Routes";
import { useLogout } from "../hooks/useLogout";
import { onLogout } from "../utils/logout";
import { snackVar } from "../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../constants/errors";

const drawerWidth = 300;

const waveStyle = {
  color: "green", // Use the specific grass green color you want here
  fontWeight: "bold", // Makes "wave" bold
};

const landingStyle = {
  color: "skyblue", // Use the specific sky blue color you want here
};

export default function MuiDrawer() {
  const { logout } = useLogout();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#000" : "lightgreen",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography
          component="h1"
          sx={{
            fontFamily: "'Dancing Script', cursive", // Apply directly
            fontWeight: 700,
            fontSize: "1.5rem", // You can adjust the size as needed
          }}
        >
          <span style={waveStyle}>Wave</span>
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 700,
            fontSize: "1.5rem", // You can adjust the size as needed
          }}
        >
          <span style={landingStyle}>landing</span>
        </Typography>
      </Toolbar>
      {/* <Divider /> */}
      <List sx={{ paddingLeft: "40px" }}>
        <ListItem key="home" disablePadding>
          <ListItemButton onClick={() => router.navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem key="login" disablePadding>
          <ListItemButton onClick={() => router.navigate("/login")}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
        </ListItem>

        <ListItem key="signup" disablePadding>
          <ListItemButton onClick={() => router.navigate("/signup")}>
            <ListItemIcon>
              <PersonAddAltIcon />
            </ListItemIcon>
            <ListItemText primary="Signup" />
          </ListItemButton>
        </ListItem>

        <ListItem key="logout" disablePadding>
          <ListItemButton
            onClick={async () => {
              try {
                await logout();
                onLogout();
              } catch (err) {
                snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
              }
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>

        <ListItem key="chat" disablePadding>
          <ListItemButton onClick={() => router.navigate("/chat")}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>

            <ListItemText primary="Chat" />
          </ListItemButton>
        </ListItem>

        <ListItem key="explore" disablePadding>
          <ListItemButton onClick={() => router.navigate("/explore")}>
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Expore" />
          </ListItemButton>
        </ListItem>

        <ListItem key="notification" disablePadding>
          <ListItemButton onClick={() => router.navigate("/notification")}>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notification" />
          </ListItemButton>
        </ListItem>

        <ListItem key="profile" disablePadding>
          <ListItemButton onClick={() => router.navigate("/profile")}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem key="setting" disablePadding>
          <ListItemButton onClick={() => router.navigate("/setting")}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
