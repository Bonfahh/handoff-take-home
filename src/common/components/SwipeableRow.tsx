import React, { useRef } from 'react';
import { LayoutChangeEvent, Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useThemeTokens } from '../theme/useThemeTokens';

interface SwipeableRowProps {
  children: React.ReactNode;
  onDelete: () => void;
  deleteThreshold?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function SwipeableRow({
  children,
  onDelete,
  deleteThreshold = 60, // % threshold
  style = {},
  onPress,
}: SwipeableRowProps): JSX.Element {
  const { colors } = useThemeTokens();
  const translateX = useSharedValue(0);
  const containerWidth = useSharedValue(0);
  const panRef = useRef<PanGestureHandler>(null);
  const tapRef = useRef<TapGestureHandler>(null);

  const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      // Only allow left swipe (negative values)
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    },
    onEnd: (event) => {
      const swipePercentage = Math.abs(event.translationX) / containerWidth.value;
      const shouldDelete = swipePercentage >= deleteThreshold / 100;

      if (shouldDelete) {
        // Animate to full width then delete
        translateX.value = withTiming(-containerWidth.value, { duration: 150 }, () => {
          runOnJS(onDelete)();
        });
      } else {
        // Snap back to original position
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 300,
        });
      }
    },
  });

  const tapGestureHandler = (): void => {
    if (onPress) {
      runOnJS(onPress)();
    }
  };

  const animatedRowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedDeleteStyle = useAnimatedStyle(() => ({
    width: Math.abs(translateX.value),
    opacity: Math.abs(translateX.value) > 20 ? 1 : 0,
  }));

  const handleLayout = (event: LayoutChangeEvent): void => {
    containerWidth.value = event.nativeEvent.layout.width;
  };

  // Don't wrap with gesture handler on web
  if (Platform.OS === 'web') {
    return (
      <View style={style} onTouchEnd={onPress}>
        {children}
      </View>
    );
  }

  return (
    <TapGestureHandler ref={tapRef} onActivated={tapGestureHandler} maxDurationMs={200}>
      <Animated.View style={[styles.container, style]} onLayout={handleLayout}>
        {/* Red delete background - fills entire row */}
        <Animated.View style={[styles.deleteBackground, animatedDeleteStyle]}>
          <View style={[styles.deleteContent, { backgroundColor: colors.core.red.base }]}>
            <Feather name="trash-2" size={24} color={colors.text.white} />
          </View>
        </Animated.View>

        {/* Main row content */}
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={panGestureHandler}
          activeOffsetX={[-10, 10]}
          failOffsetY={[-20, 20]}
        >
          <Animated.View style={[styles.rowContent, animatedRowStyle]}>{children}</Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    flex: 1, // Ensure it takes full width
  },
  deleteBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContent: {
    backgroundColor: 'transparent',
    zIndex: 1,
    flex: 1, // Ensure content takes full space
  },
});
