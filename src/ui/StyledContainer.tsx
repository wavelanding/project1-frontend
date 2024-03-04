import styled from "styled-components";
import Container, { ContainerProps } from "@mui/material/Container";

interface StyledContainerProps extends ContainerProps {
  className?: string;
}

// Export the styled Container component
export const StyledContainer = styled(
  ({ className, ...props }: StyledContainerProps) => (
    <Container className={className} {...props} />
  )
)`
  height: "100vh";
  width: "90vw";
  padding: 0;
  margintop: "1rem";
`;
