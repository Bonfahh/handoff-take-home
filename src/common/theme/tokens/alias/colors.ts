import { ThemeScheme } from '../../types';
import { colorsBaseTokens } from '../base/colors';

type SolidVariant = 'light' | 'medium' | 'dark' | 'darker' | 'darkest' | 'deepest';

type AlphaVariant = 'brand' | 'positive' | 'attention' | 'danger' | 'blue' | 'lightNeutral';

interface Layer {
  solid: Record<SolidVariant, string>;
  alpha: Record<AlphaVariant, string>;
}

type CoreVariant = 'base' | 'baseHover' | 'dark' | 'light' | 'lightHover' | 'fade';

type FlatVariant =
  | 'white'
  | 'black'
  | 'shade'
  | 'transparentTint'
  | 'transparentShade'
  | 'transparentInverse'
  | 'inverse';

interface Core {
  green: Record<CoreVariant, string>;
  yellow: Record<CoreVariant, string>;
  red: Record<CoreVariant, string>;
  gray: Record<CoreVariant, string>;
  flat: Record<FlatVariant, string>;
}

type TextVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'white'
  | 'tint'
  | 'brand'
  | 'brandDark'
  | 'positive'
  | 'positiveDark'
  | 'attention'
  | 'attentionDark'
  | 'danger'
  | 'dangerDark'
  | 'hyperlink'
  | 'inverse';

type IconVariant = Exclude<TextVariant, 'hyperlink' | 'inverse'> | 'info' | 'infoDark';

type OutlineVariant =
  | 'light'
  | 'medium'
  | 'dark'
  | 'darker'
  | 'darkest'
  | 'deepest'
  | 'brandDark'
  | 'brandMedium'
  | 'brandLight'
  | 'dangerMedium'
  | 'bgCutoutLight'
  | 'bgCutoutMedium';

export interface ColorMode {
  layer: Layer;
  core: Core;
  text: Record<TextVariant, string>;
  icon: Record<IconVariant, string>;
  outline: Record<OutlineVariant, string>;
}

type ColorsAliasTokens = Record<ThemeScheme, ColorMode>;

const light = {
  layer: {
    solid: {
      light: colorsBaseTokens.solid.neutral['10'],
      medium: colorsBaseTokens.solid.neutral['50'],
      dark: colorsBaseTokens.solid.neutral['100'],
      darker: colorsBaseTokens.solid.neutral['200'],
      darkest: colorsBaseTokens.solid.neutral['300'],
      deepest: colorsBaseTokens.solid.neutral['800'],
    },
    alpha: {
      brand: colorsBaseTokens.alpha.brand['500']['10'],
      positive: colorsBaseTokens.alpha.positive['500']['10'],
      attention: colorsBaseTokens.alpha.attention['500']['10'],
      danger: colorsBaseTokens.alpha.negative['500']['10'],
      blue: colorsBaseTokens.alpha.blue['500']['10'],
      lightNeutral: colorsBaseTokens.alpha.neutral['400']['10'],
    },
  },
  core: {
    green: {
      base: colorsBaseTokens.solid.brand['600'],
      baseHover: colorsBaseTokens.solid.brand['700'],
      dark: colorsBaseTokens.solid.brand['800'],
      light: colorsBaseTokens.solid.brand['200'],
      lightHover: colorsBaseTokens.solid.brand['300'],
      fade: colorsBaseTokens.solid.brand['50'],
    },
    yellow: {
      base: colorsBaseTokens.solid.attention['500'],
      baseHover: colorsBaseTokens.solid.attention['600'],
      dark: colorsBaseTokens.solid.attention['800'],
      light: colorsBaseTokens.solid.attention['300'],
      lightHover: colorsBaseTokens.solid.attention['400'],
      fade: colorsBaseTokens.solid.attention['50'],
    },
    red: {
      base: colorsBaseTokens.solid.negative['500'],
      baseHover: colorsBaseTokens.solid.negative['600'],
      dark: colorsBaseTokens.solid.negative['800'],
      light: colorsBaseTokens.solid.negative['200'],
      lightHover: colorsBaseTokens.solid.negative['300'],
      fade: colorsBaseTokens.solid.negative['50'],
    },
    gray: {
      base: colorsBaseTokens.solid.neutral['50'],
      baseHover: colorsBaseTokens.solid.neutral['100'],
      dark: colorsBaseTokens.solid.neutral['800'],
      light: colorsBaseTokens.solid.neutral['10'],
      lightHover: colorsBaseTokens.solid.neutral['50'],
      fade: colorsBaseTokens.solid.neutral['10'],
    },
    flat: {
      white: colorsBaseTokens.solid.neutral['10'],
      black: colorsBaseTokens.solid.neutral['900'],
      shade: colorsBaseTokens.solid.neutral['600'],
      inverse: colorsBaseTokens.solid.neutral['900'],
      transparentTint: colorsBaseTokens.alpha.neutral['10']['70'],
      transparentShade: colorsBaseTokens.alpha.neutral['900']['80'],
      transparentInverse: colorsBaseTokens.alpha.neutral['900']['70'],
    },
  },
  text: {
    primary: colorsBaseTokens.solid.neutral['900'],
    secondary: colorsBaseTokens.solid.neutral['500'],
    tertiary: colorsBaseTokens.solid.neutral['400'],
    white: colorsBaseTokens.solid.neutral['10'],
    tint: colorsBaseTokens.alpha.neutral['10']['70'],
    brand: colorsBaseTokens.solid.brand['600'],
    brandDark: colorsBaseTokens.solid.brand['800'],
    positive: colorsBaseTokens.solid.positive['600'],
    positiveDark: colorsBaseTokens.solid.positive['700'],
    attention: colorsBaseTokens.solid.attention['500'],
    attentionDark: colorsBaseTokens.solid.attention['800'],
    danger: colorsBaseTokens.solid.negative['500'],
    dangerDark: colorsBaseTokens.solid.negative['800'],
    inverse: colorsBaseTokens.solid.neutral['50'],
    hyperlink: colorsBaseTokens.solid.brand['800'],
  },
  icon: {
    primary: colorsBaseTokens.solid.neutral['700'],
    secondary: colorsBaseTokens.solid.neutral['500'],
    tertiary: colorsBaseTokens.solid.neutral['400'],
    white: colorsBaseTokens.solid.neutral['10'],
    tint: colorsBaseTokens.alpha.neutral['10']['70'],
    brand: colorsBaseTokens.solid.brand['600'],
    brandDark: colorsBaseTokens.solid.brand['800'],
    positive: colorsBaseTokens.solid.positive['600'],
    positiveDark: colorsBaseTokens.solid.positive['800'],
    attention: colorsBaseTokens.solid.attention['500'],
    attentionDark: colorsBaseTokens.solid.attention['800'],
    danger: colorsBaseTokens.solid.negative['500'],
    dangerDark: colorsBaseTokens.solid.negative['700'],
    info: colorsBaseTokens.solid.blue['500'],
    infoDark: colorsBaseTokens.solid.blue['800'],
  },
  outline: {
    light: colorsBaseTokens.solid.neutral['100'],
    medium: colorsBaseTokens.solid.neutral['200'],
    dark: colorsBaseTokens.solid.neutral['300'],
    darker: colorsBaseTokens.solid.neutral['400'],
    darkest: colorsBaseTokens.solid.neutral['600'],
    deepest: colorsBaseTokens.solid.neutral['800'],
    brandDark: colorsBaseTokens.solid.brand['800'],
    brandMedium: colorsBaseTokens.solid.brand['600'],
    brandLight: colorsBaseTokens.solid.brand['200'],
    dangerMedium: colorsBaseTokens.solid.negative['500'],
    bgCutoutLight: colorsBaseTokens.solid.neutral['10'],
    bgCutoutMedium: colorsBaseTokens.solid.neutral['50'],
  },
} satisfies ColorMode;

const dark = {
  layer: {
    solid: {
      light: colorsBaseTokens.solid.neutral['800'],
      medium: colorsBaseTokens.solid.neutral['900'],
      dark: colorsBaseTokens.solid.neutral['700'],
      darker: colorsBaseTokens.solid.neutral['600'],
      darkest: colorsBaseTokens.solid.neutral['500'],
      deepest: colorsBaseTokens.solid.neutral['50'],
    },
    alpha: {
      brand: colorsBaseTokens.alpha.brand['500']['20'],
      positive: colorsBaseTokens.alpha.positive['500']['20'],
      attention: colorsBaseTokens.alpha.attention['500']['20'],
      danger: colorsBaseTokens.alpha.negative['500']['20'],
      blue: colorsBaseTokens.alpha.blue['500']['20'],
      lightNeutral: colorsBaseTokens.alpha.neutral['10']['10'],
    },
  },
  core: {
    green: {
      base: colorsBaseTokens.solid.brand['600'],
      baseHover: colorsBaseTokens.solid.brand['700'],
      dark: colorsBaseTokens.solid.brand['800'],
      light: colorsBaseTokens.solid.brand['200'],
      lightHover: colorsBaseTokens.solid.brand['300'],
      fade: colorsBaseTokens.solid.brand['50'],
    },
    yellow: {
      base: colorsBaseTokens.solid.attention['500'],
      baseHover: colorsBaseTokens.solid.attention['600'],
      dark: colorsBaseTokens.solid.attention['800'],
      light: colorsBaseTokens.solid.attention['300'],
      lightHover: colorsBaseTokens.solid.attention['400'],
      fade: colorsBaseTokens.solid.attention['50'],
    },
    red: {
      base: colorsBaseTokens.solid.negative['500'],
      baseHover: colorsBaseTokens.solid.negative['600'],
      dark: colorsBaseTokens.solid.negative['800'],
      light: colorsBaseTokens.solid.negative['200'],
      lightHover: colorsBaseTokens.solid.negative['300'],
      fade: colorsBaseTokens.solid.negative['50'],
    },
    gray: {
      base: colorsBaseTokens.solid.neutral['800'],
      baseHover: colorsBaseTokens.solid.neutral['700'],
      dark: colorsBaseTokens.solid.neutral['600'],
      light: colorsBaseTokens.solid.neutral['900'],
      lightHover: colorsBaseTokens.solid.neutral['800'],
      fade: colorsBaseTokens.solid.neutral['900'],
    },
    flat: {
      white: colorsBaseTokens.solid.neutral['10'],
      black: colorsBaseTokens.solid.neutral['900'],
      shade: colorsBaseTokens.solid.neutral['600'],
      inverse: colorsBaseTokens.solid.neutral['10'],
      transparentTint: colorsBaseTokens.alpha.neutral['10']['70'],
      transparentShade: colorsBaseTokens.alpha.neutral['900']['80'],
      transparentInverse: colorsBaseTokens.alpha.neutral['10']['50'],
    },
  },
  text: {
    primary: colorsBaseTokens.solid.neutral['50'],
    secondary: colorsBaseTokens.solid.neutral['300'],
    tertiary: colorsBaseTokens.solid.neutral['400'],
    white: colorsBaseTokens.solid.neutral['10'],
    tint: colorsBaseTokens.alpha.neutral['10']['70'],
    brand: colorsBaseTokens.solid.brand['400'],
    brandDark: colorsBaseTokens.solid.brand['300'],
    positive: colorsBaseTokens.solid.positive['400'],
    positiveDark: colorsBaseTokens.solid.positive['300'],
    attention: colorsBaseTokens.solid.attention['400'],
    attentionDark: colorsBaseTokens.solid.attention['300'],
    danger: colorsBaseTokens.solid.negative['400'],
    dangerDark: colorsBaseTokens.solid.negative['300'],
    inverse: colorsBaseTokens.solid.neutral['900'],
    hyperlink: colorsBaseTokens.solid.brand['100'],
  },
  icon: {
    primary: colorsBaseTokens.solid.neutral['50'],
    secondary: colorsBaseTokens.solid.neutral['300'],
    tertiary: colorsBaseTokens.solid.neutral['400'],
    white: colorsBaseTokens.solid.neutral['10'],
    tint: colorsBaseTokens.alpha.neutral['10']['70'],
    brand: colorsBaseTokens.solid.brand['400'],
    brandDark: colorsBaseTokens.solid.brand['200'],
    positive: colorsBaseTokens.solid.positive['400'],
    positiveDark: colorsBaseTokens.solid.positive['200'],
    attention: colorsBaseTokens.solid.attention['400'],
    attentionDark: colorsBaseTokens.solid.attention['200'],
    danger: colorsBaseTokens.solid.negative['400'],
    dangerDark: colorsBaseTokens.solid.negative['300'],
    info: colorsBaseTokens.solid.blue['400'],
    infoDark: colorsBaseTokens.solid.blue['700'],
  },
  outline: {
    light: colorsBaseTokens.solid.neutral['800'],
    medium: colorsBaseTokens.solid.neutral['700'],
    dark: colorsBaseTokens.solid.neutral['600'],
    darker: colorsBaseTokens.solid.neutral['500'],
    darkest: colorsBaseTokens.solid.neutral['200'],
    deepest: colorsBaseTokens.solid.neutral['50'],
    brandDark: colorsBaseTokens.solid.brand['200'],
    brandMedium: colorsBaseTokens.solid.brand['400'],
    brandLight: colorsBaseTokens.solid.brand['800'],
    dangerMedium: colorsBaseTokens.solid.negative['400'],
    bgCutoutLight: colorsBaseTokens.solid.neutral['800'],
    bgCutoutMedium: colorsBaseTokens.solid.neutral['900'],
  },
} satisfies ColorMode;

const colorsAliasTokens = {
  light,
  dark,
} as const satisfies ColorsAliasTokens;

export function getColors(themeScheme: ThemeScheme): ColorMode {
  return themeScheme === 'dark' ? colorsAliasTokens.dark : colorsAliasTokens.light;
}
