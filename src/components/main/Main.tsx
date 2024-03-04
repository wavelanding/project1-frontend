import { RouterProvider } from "react-router-dom";
import { usePath } from "../../hooks/usePath";
// import { StyledContainer } from "../../ui/StyledContainer";
import { MuiStyledContainer } from "../../ui/MuiStyledContainer";
import { Grid, Toolbar } from "@mui/material";
import ChatList from "../chat-list/ChatList";
import router from "../Routes";

const Main = () => {
  const { path } = usePath();
  const showChatList = path === "/" || path.includes("chats");

  let content = (
    // <Container maxWidth="xl" sx={{ marginTop: "1rem" }}>
    <MuiStyledContainer>
      <Toolbar />
      <Routes />
    </MuiStyledContainer>
  );

  if (showChatList) {
    content = (
      // <Container maxWidth="xl" sx={{ marginTop: "1rem" }}>
      <MuiStyledContainer>
        <Toolbar />
        <Grid container spacing={5}>
          <Grid item xs={12} md={5} lg={4} xl={3}>
            <ChatList />
          </Grid>
          <Grid item xs={12} md={7} lg={8} xl={9}>
            <Routes />
          </Grid>
        </Grid>
      </MuiStyledContainer>
    );
  }
  return content;
};

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Main;
