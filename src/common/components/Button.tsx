import React, { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { forwardRef, PropsWithChildren, useState } from 'react';
import { useThemeTokens } from '../theme/useThemeTokens';
import { numbersAliasTokens } from '../theme/tokens/alias/numbers';

interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary';
}

export const Button = forwardRef<View, PropsWithChildren<ButtonProps>>(function Button(
  { variant = 'primary', style, disabled, children, ...props },
  ref,
) {
  const [hovered, setHovered] = useState(false);
  const { colors, fonts, components } = useThemeTokens();

  const variants = {
    primary: {
      backgroundColor: components.button.background.primary.idle,
      borderRadius: components.button.borderRadius,
    },
    secondary: {
      backgroundColor: components.button.background.primary.idle,
      borderRadius: components.button.borderRadius,
    },
  };

  const textVariants = {
    primary: {
      color: colors.text.white,
      ...fonts.regular.text.md,
    },
    secondary: {
      color: colors.text.white,
      ...fonts.regular.text.md,
    },
  };

  return (
    <Pressable
      ref={ref}
      style={[
        styles.button,
        variants[variant],
        disabled && styles.disabled,
        hovered && styles.hovered,
        style,
      ]}
      disabled={disabled}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      {...props}
    >
      <Text style={textVariants[variant]}>{children}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: numbersAliasTokens.spacing.xs,
  },
  disabled: {},
  text: {},
  hovered: {},
});
