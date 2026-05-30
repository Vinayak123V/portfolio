import { createContext, useContext, useState, useEffect } from "react";

const themes = [
  { id: "dark", label: "Dark" },
  { id: "silent", label: "Silent" }
];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    let savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    if (savedTheme === "professional") savedTheme = "dark";
    return savedTheme;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const cycleTheme = () => {
    const idx = themes.findIndex((t) => t.id === theme);
    setTheme(themes[(idx + 1) % themes.length].id);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
