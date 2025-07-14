import { useCurrentThemeScheme } from '../hooks/useCurrentThemeScheme';
import { customFonts } from './fonts';
import { getColors } from './tokens/alias/colors';
import { getComponentTokens } from './tokens/components';
import { numbersAliasTokens } from './tokens/alias/numbers';

type ThemeTokens = {
  colors: ReturnType<typeof getColors>;
  fonts: typeof customFonts;
  components: ReturnType<typeof getComponentTokens>;
  numbers: typeof numbersAliasTokens;
};

export function useThemeTokens(): ThemeTokens {
  const { value: theme } = useCurrentThemeScheme();
  const colors = getColors(theme);
  const components = getComponentTokens(theme);
  const fonts = customFonts;
  const numbers = numbersAliasTokens;
  return { colors, fonts, components, numbers };
}
