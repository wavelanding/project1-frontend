// useThemeToggle.tsx
import { useState } from "react";
import { createTheme, Theme } from "@mui/material";

export const useThemeToggle = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme: Theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return { theme, toggleTheme };
};
