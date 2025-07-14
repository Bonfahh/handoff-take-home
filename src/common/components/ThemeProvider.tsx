import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeScheme } from '../theme/types'; // "light" | "dark"
import { StatusBar } from 'react-native';

export const ThemeContext = createContext<{
  theme: ThemeScheme;
  setTheme: (t: ThemeScheme) => void;
}>({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [theme, setTheme] = useState<ThemeScheme>('light');

  useEffect(() => {
    StatusBar.setBarStyle(theme === 'light' ? 'dark-content' : 'light-content');
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export function useThemeContext(): {
  theme: ThemeScheme;
  setTheme: (t: ThemeScheme) => void;
} {
  return useContext(ThemeContext);
}
