import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { useFonts as useFontsFromExpo } from 'expo-font';
import type { TextStyle } from 'react-native';
import { numbersBaseTokens } from './tokens/base/numbers';

type FontSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

type FontSpec = 'headline' | 'text';

type CustomFontVariant = {
  [K in FontSpec]: K extends 'headline'
    ? Record<FontSize, TextStyle>
    : Record<Exclude<FontSize, 'xl'>, TextStyle>;
};

export interface CustomFonts {
  bold: CustomFontVariant;
  regular: CustomFontVariant;
}

export type FontsKeys = {
  [K in keyof CustomFonts]: `${keyof CustomFonts}.${FontSpec}.${FontSize}`;
}[keyof CustomFonts];

const poppinsFontFace = {
  400: 'Poppins_400Regular',
  500: 'Poppins_500Medium',
  600: 'Poppins_600SemiBold',
};

const interFontFace = {
  400: 'Inter_400Regular',
  500: 'Inter_500Medium',
  600: 'Inter_600SemiBold',
};

interface FontFamilies {
  poppins: typeof poppinsFontFace;
  inter: typeof interFontFace;
}

type FontWeights<T extends keyof FontFamilies> = keyof FontFamilies[T];

export const getFontFamilyAndFontWeight = (
  fontFamily: keyof FontFamilies,
  fontWeight: FontWeights<keyof FontFamilies>,
): TextStyle => {
  const fontFace = fontFamily === 'poppins' ? poppinsFontFace : interFontFace;
  return {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    fontFamily: fontFace[fontWeight as keyof typeof fontFace],
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    fontWeight: fontWeight.toString() as TextStyle['fontWeight'],
  };
};

export const customFonts = {
  bold: {
    headline: {
      xl: {
        ...getFontFamilyAndFontWeight('poppins', 600),
        fontSize: numbersBaseTokens.typography.size[10],
        lineHeight: 62,
        letterSpacing: -1.12,
      },
      lg: {
        ...getFontFamilyAndFontWeight('poppins', 600),
        fontSize: numbersBaseTokens.typography.size[9],
        lineHeight: 50,
        letterSpacing: -0.84,
      },
      md: {
        ...getFontFamilyAndFontWeight('poppins', 600),
        fontSize: numbersBaseTokens.typography.size[8],
        lineHeight: 42,
        letterSpacing: -0.64,
      },
      sm: {
        ...getFontFamilyAndFontWeight('poppins', 600),
        fontSize: numbersBaseTokens.typography.size[7],
        lineHeight: 36,
        letterSpacing: -0.56,
      },
      xs: {
        ...getFontFamilyAndFontWeight('poppins', 600),
        fontSize: numbersBaseTokens.typography.size[6],
        lineHeight: 32,
        letterSpacing: -0.44,
      },
      xxs: {
        ...getFontFamilyAndFontWeight('poppins', 600),
        fontSize: numbersBaseTokens.typography.size[5],
        lineHeight: 26,
        letterSpacing: -0.38,
      },
    },
    text: {
      lg: {
        ...getFontFamilyAndFontWeight('inter', 600),
        fontSize: numbersBaseTokens.typography.size[5],
        lineHeight: 24,
        letterSpacing: 0,
      },
      md: {
        ...getFontFamilyAndFontWeight('inter', 600),
        fontSize: numbersBaseTokens.typography.size[4],
        lineHeight: 24,
        letterSpacing: 0,
      },
      sm: {
        ...getFontFamilyAndFontWeight('inter', 600),
        fontSize: numbersBaseTokens.typography.size[3],
        lineHeight: 24,
        letterSpacing: 0,
      },
      xs: {
        ...getFontFamilyAndFontWeight('inter', 600),
        fontSize: numbersBaseTokens.typography.size[2],
        lineHeight: 18,
        letterSpacing: 0,
      },
      xxs: {
        ...getFontFamilyAndFontWeight('inter', 600),
        fontSize: numbersBaseTokens.typography.size[1],
        lineHeight: 16,
        letterSpacing: 0,
      },
    },
  },
  regular: {
    headline: {
      xl: {
        ...getFontFamilyAndFontWeight('poppins', 400),
        fontSize: numbersBaseTokens.typography.size[10],
        lineHeight: 62,
        letterSpacing: -1.12,
      },
      lg: {
        ...getFontFamilyAndFontWeight('poppins', 400),
        fontSize: numbersBaseTokens.typography.size[9],
        lineHeight: 52,
        letterSpacing: -0.84,
      },
      md: {
        ...getFontFamilyAndFontWeight('poppins', 400),
        fontSize: numbersBaseTokens.typography.size[8],
        lineHeight: 42,
        letterSpacing: -0.64,
      },
      sm: {
        ...getFontFamilyAndFontWeight('poppins', 400),
        fontSize: numbersBaseTokens.typography.size[7],
        lineHeight: 36,
        letterSpacing: -0.56,
      },
      xs: {
        ...getFontFamilyAndFontWeight('poppins', 400),
        fontSize: numbersBaseTokens.typography.size[6],
        lineHeight: 32,
        letterSpacing: -0.44,
      },
      xxs: {
        ...getFontFamilyAndFontWeight('poppins', 400),
        fontSize: numbersBaseTokens.typography.size[5],
        lineHeight: 26,
        letterSpacing: 0,
      },
    },
    text: {
      lg: {
        ...getFontFamilyAndFontWeight('inter', 500),
        fontSize: numbersBaseTokens.typography.size[5],
        lineHeight: 24,
        letterSpacing: -0.38,
      },
      md: {
        ...getFontFamilyAndFontWeight('inter', 500),
        fontSize: numbersBaseTokens.typography.size[4],
        lineHeight: 24,
        letterSpacing: 0,
      },
      sm: {
        ...getFontFamilyAndFontWeight('inter', 500),
        fontSize: numbersBaseTokens.typography.size[3],
        lineHeight: 24,
        letterSpacing: 0,
      },
      xs: {
        ...getFontFamilyAndFontWeight('inter', 500),
        fontSize: numbersBaseTokens.typography.size[2],
        lineHeight: 18,
        letterSpacing: 0,
      },
      xxs: {
        ...getFontFamilyAndFontWeight('inter', 500),
        fontSize: numbersBaseTokens.typography.size[1],
        lineHeight: 16,
        letterSpacing: 0,
      },
    },
  },
} as const satisfies CustomFonts;

export const useFonts = (): [boolean, Error | null] => {
  return useFontsFromExpo({
    // Poppins
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    // Inter
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
};
