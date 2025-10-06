import { useEffect, useState } from "react";

export type Theme = "light" | "dark";
const THEME_KEY = "app-theme";
const themes: Theme[] = ["light", "dark"];

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  themes.forEach((t) => html.classList.remove(t));
  if (theme !== "light") {
    html.classList.add(theme);
  }
}

export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    return stored && themes.includes(stored) ? stored : "light";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return [theme, setTheme];
} 