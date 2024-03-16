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

/**
 * ApolloProvider: When wrap app with <ApolloProvider client={client}>, you're creating a new context object using the React.createContext() API
 * Then, ApolloProvider uses this context to provide the Apollo Client instance to the component tree
 * Inside useQuery / useMutation, Apollo Client uses React's useContext hook to access the nearest <ApolloContext.Provider> up in the component tree so that useQuery gets the Apollo Client instance.
 *
 * Executing Query: With the client instance retrieved from the context, useQuery can then execute GraphQL queries against your GraphQL server using that client.
 *
 * In essence, the connection between the Apollo Client and the useQuery hook is made possible through the React Context API.
 * ApolloProvider sets up this context at the top of React app, and useQuery accesses the Apollo Client instance from this context using React's useContext hook.
 */
const App = () => {
  //set up hook here and pass the function down to header.
  const { theme, toggleTheme } = useThemeToggle();

  return (
    // <Box sx={{ flexGrow: 1, overflow: "auto" }}>
    <Box sx={{ display: "flex" }}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MuiDrawer />
          <Header toggleTheme={toggleTheme} />
          {/* <BrowserRouter> */}

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
