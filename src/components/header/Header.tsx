import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./mobile/MobileNavigation";
import MobileBranding from "./mobile/MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../constants/authenticated";
import { Page } from "../../interfaces/page.interface";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

const pages: Page[] = [
  {
    title: "Home",
    path: "/",
  },
];

const unauthenticatedPages: Page[] = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Signup",
    path: "/signup",
  },
];

const drawerWidth = 240;

const Header = ({ toggleTheme }: any) => {
  const authenticated = useReactiveVar(authenticatedVar);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#000" : "lightgreen",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Branding />
          <MobileBranding />

          <MobileNavigation
            pages={authenticated ? pages : unauthenticatedPages}
          />
          <Navigation pages={authenticated ? pages : unauthenticatedPages} />

          <FormGroup>
            <FormControlLabel
              control={<Switch onChange={toggleTheme} color="warning" />}
              label="change theme"
            />
          </FormGroup>

          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
