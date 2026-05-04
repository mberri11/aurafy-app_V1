import React, { createContext, useContext, useMemo } from 'react';
import { ThemeColors } from '../types';
import { cosmicTheme } from './cosmic';
import { desertOracleTheme } from './desertOracle';
import { useSettingsStore } from '../store/settingsStore';

const themeMap: Record<string, ThemeColors> = {
  cosmic: cosmicTheme,
  desertOracle: desertOracleTheme,
};

const ThemeContext = createContext<ThemeColors>(cosmicTheme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeId = useSettingsStore((s) => s.themeId);
  const theme = useMemo(() => themeMap[themeId] ?? cosmicTheme, [themeId]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

/** All components consume colors ONLY via useTheme() — never hardcode theme colors. */
export function useTheme(): ThemeColors {
  return useContext(ThemeContext);
}
