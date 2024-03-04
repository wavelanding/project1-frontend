import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/Snackbar";
import { useThemeToggle } from "./hooks/useThemeToggle";
import Main from "./components/main/Main";
import MuiDrawer from "./ui/MuiDrawer";
// import { BrowserRouter } from "react-router-dom";

const App = () => {
  //set up hook here and pass the function down to header.
  const { theme, toggleTheme } = useThemeToggle();

  return (
    // <Box sx={{ flexGrow: 1, overflow: "auto" }}>
    <Box sx={{ display: "flex" }}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header toggleTheme={toggleTheme} />
          {/* <BrowserRouter> */}
          <MuiDrawer />

          <Guard>
            <Main />
          </Guard>

          {/* </BrowserRouter> */}
          <Snackbar />
        </ThemeProvider>
      </ApolloProvider>
    </Box>
  );
};

export default App;
