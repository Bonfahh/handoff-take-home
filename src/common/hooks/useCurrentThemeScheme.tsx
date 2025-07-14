import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeScheme } from '../theme/types';
import { useThemeContext } from '../components/ThemeProvider';

const DEFAULT_THEME_SCHEME = 'light';

interface UseCurrentThemeSchemePayload {
  value: ThemeScheme;
  setValue: (value: ThemeScheme) => void;
}

interface UseCurrentThemeSchemeProps {
  preferSystem?: boolean;
}

export function useCurrentThemeScheme(
  props?: UseCurrentThemeSchemeProps,
): UseCurrentThemeSchemePayload {
  const deviceThemeScheme = useColorScheme();
  const { theme, setTheme } = useThemeContext();

  return useMemo(() => {
    const systemThemeScheme = deviceThemeScheme ?? DEFAULT_THEME_SCHEME;

    const value = props?.preferSystem === true ? systemThemeScheme : theme;

    return {
      value,
      setValue: setTheme,
    };
  }, [deviceThemeScheme, props?.preferSystem, setTheme, theme]);
}
