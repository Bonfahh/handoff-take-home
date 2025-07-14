import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useThemeTokens } from '../theme/useThemeTokens';
import { useCurrentThemeScheme } from '../hooks/useCurrentThemeScheme';

export const AnimatedThemeSwitch = (): JSX.Element => {
  const { colors, numbers, components } = useThemeTokens();
  const { value: theme, setValue } = useCurrentThemeScheme();

  const anim = useRef(new Animated.Value(theme === 'dark' ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: theme === 'dark' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [theme, anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 44],
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: components.button.background.secondary.idle,
          borderRadius: numbers.borderRadius.sm,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.slider,
          {
            backgroundColor: colors.layer.solid.light,
            borderRadius: numbers.borderRadius.sm,
            transform: [{ translateX }],
          },
        ]}
      />
      <Pressable
        style={styles.iconBtn}
        onPress={() => setValue('light')}
        accessibilityLabel="Switch to light mode"
      >
        <Feather
          name="sun"
          size={20}
          color={theme === 'light' ? colors.icon.primary : colors.icon.secondary}
        />
      </Pressable>
      <Pressable
        style={styles.iconBtn}
        onPress={() => setValue('dark')}
        accessibilityLabel="Switch to dark mode"
      >
        <Feather
          name="moon"
          size={20}
          color={theme === 'dark' ? colors.icon.primary : colors.icon.secondary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 36,
    width: 90,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
  },
  slider: {
    position: 'absolute',
    width: 44,
    height: 32,
    zIndex: 1,
  },
  iconBtn: {
    width: 44,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});
