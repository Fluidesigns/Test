"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";
export type Density = "airy" | "balanced" | "dense";

type UIContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  density: Density;
  setDensity: (d: Density) => void;
};

const UIContext = createContext<UIContextValue | null>(null);

const STORAGE_THEME = "astra.theme";
const STORAGE_DENSITY = "astra.density";

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [density, setDensityState] = useState<Density>("balanced");

  // Hydrate from localStorage / prefers-color-scheme on mount.
  useEffect(() => {
    const storedTheme = (typeof window !== "undefined"
      ? window.localStorage.getItem(STORAGE_THEME)
      : null) as Theme | null;
    const storedDensity = (typeof window !== "undefined"
      ? window.localStorage.getItem(STORAGE_DENSITY)
      : null) as Density | null;

    if (storedTheme === "light" || storedTheme === "dark") {
      setThemeState(storedTheme);
    } else if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark");
    }
    if (storedDensity === "airy" || storedDensity === "balanced" || storedDensity === "dense") {
      setDensityState(storedDensity);
    }
  }, []);

  // Reflect to <html> attributes so CSS variables swap instantly.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-density", density);
  }, [density]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { window.localStorage.setItem(STORAGE_THEME, t); } catch {}
  }, []);

  const setDensity = useCallback((d: Density) => {
    setDensityState(d);
    try { window.localStorage.setItem(STORAGE_DENSITY, d); } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const value = useMemo<UIContextValue>(
    () => ({ theme, setTheme, toggleTheme, density, setDensity }),
    [theme, setTheme, toggleTheme, density, setDensity],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
