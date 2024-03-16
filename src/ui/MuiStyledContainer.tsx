import { styled } from "@mui/system";
import Container from "@mui/material/Container";

// Export the styled Container component
// Using MUI's styled function
export const MuiStyledContainer1 = styled(Container)({
  height: "100vh",
  width: "90vw",
  padding: 0,
  margintop: "1rem",
});

export const MuiStyledContainer = styled(Container)({
  flexGrow: 1,
  bgcolor: "background.default",
  p: 3,
  border: "none",
  height: "100vh",
  width: "90vw",
  padding: 0,
  margintop: "1rem",
});
