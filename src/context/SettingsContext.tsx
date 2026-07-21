"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations } from "@/lib/translations";

export type ThemeMode = "light" | "dark" | "system";

interface SettingsContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  timezone: string;
  setTimezone: (tz: string) => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType>({
  theme: "light",
  setTheme: () => {},
  language: "en",
  setLanguage: () => {},
  timezone: "Asia/Colombo",
  setTimezone: () => {},
  t: (key: string) => key,
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [language, setLanguageState] = useState<Language>("en");
  const [timezone, setTimezoneState] = useState<string>("Asia/Colombo");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("schooldev_theme") as ThemeMode | null;
      if (savedTheme) setThemeState(savedTheme);

      const savedLang = localStorage.getItem("schooldev_lang") as Language | null;
      if (savedLang) setLanguageState(savedLang);

      const savedTz = localStorage.getItem("schooldev_tz");
      if (savedTz) setTimezoneState(savedTz);
    } catch {}
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else if (mode === "light") {
      root.classList.remove("dark");
    } else if (mode === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem("schooldev_theme", newTheme);
  };

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem("schooldev_lang", newLang);
  };

  const setTimezone = (newTz: string) => {
    setTimezoneState(newTz);
    localStorage.setItem("schooldev_tz", newTz);
  };

  const t = (key: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return key;
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        timezone,
        setTimezone,
        t,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
