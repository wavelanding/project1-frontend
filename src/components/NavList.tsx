// import React from "react";
// import {
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import HomeIcon from "@mui/icons-material/Home";
// import ExploreIcon from "@mui/icons-material/Explore";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SettingsIcon from "@mui/icons-material/Settings";
// import MailIcon from "@mui/icons-material/Mail";

// interface NavLinkProps {
//   label: string;
//   icon: React.ComponentType<any>;
//   path: string;
// }

// const NavList: React.FC = () => {
//   const navigationLinks: NavLinkProps[] = [
//     { label: "Home", icon: HomeIcon, path: "/" },
//     { label: "Explore", icon: ExploreIcon, path: "/explore" },
//     { label: "Notifications", icon: NotificationsIcon, path: "/notifications" },
//     { label: "Messages", icon: MailIcon, path: "/messages" },
//     { label: "Settings", icon: SettingsIcon, path: "/settings" },
//   ];

//   return (
//     <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
//       {navigationLinks.map((item) => (
//         <ListItem key={item.label} button component={Link} to={item.path}>
//           <ListItemIcon>
//             <item.icon />
//           </ListItemIcon>
//           <ListItemText
//             primary={<Typography variant="body2">{item.label}</Typography>}
//           />
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default NavList;

import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SvgIconComponent } from "@mui/icons-material";

// Define the type for each navigation item
type NavItem = {
  label: string;
  path?: string; // Optional if not used for navigation
  icon?: SvgIconComponent;
};

// Props type for the NavList component
type NavListProps = {
  items: NavItem[];
};

// NavList component without the 'button' prop
const NavList: React.FC<NavListProps> = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem
          key={index}
          onClick={() => {
            // Optional: Implement navigation or other click handling logic here
            console.log(`Clicked on ${item.label}`);
          }}
          // Apply any styling here to mimic the appearance of a button, if necessary
          sx={{ cursor: "pointer" }}
        >
          {item.icon && (
            <ListItemIcon>
              <item.icon />
            </ListItemIcon>
          )}
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );
};

export default NavList;
