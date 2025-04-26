// src/providers/ThemeProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  // 1. קרא מה־localStorage (אם קיים), אחרת ברירת מחדל light
  const [mode, setMode] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // 2. ברגע שה‐mode משתנה, תעדכן את html element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
