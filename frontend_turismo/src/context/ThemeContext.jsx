import { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

export function ThemeProviderComponent({ children }) {
  const [modoOscuro, setModoOscuro] = useState(false);

  const toggleTheme = () => {
    setModoOscuro(!modoOscuro);
  };

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: modoOscuro ? "dark" : "light",
      },
    })
  , [modoOscuro]);

  return (
    <ThemeContext.Provider value={{ modoOscuro, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
