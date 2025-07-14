import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, Pressable, StyleSheet, View } from 'react-native';
import { ReactNode } from 'react';
import { useThemeTokens } from '../theme/useThemeTokens';

const { height: screenHeight } = Dimensions.get('window');

export interface BottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

interface BottomSheetProps {
  children: ReactNode;
  height?: number;
}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(function BottomSheet(
  { children, height = screenHeight * 0.6 },
  ref,
) {
  const [isVisible, setIsVisible] = useState(false);
  const slideAnimRef = useRef(new Animated.Value(screenHeight));
  const { colors } = useThemeTokens();

  const present = useCallback(() => {
    setIsVisible(true);
    // Reset animation value
    slideAnimRef.current.setValue(screenHeight);
    // Start animation
    Animated.timing(slideAnimRef.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const dismiss = useCallback(() => {
    Animated.timing(slideAnimRef.current, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      present,
      dismiss,
    }),
    [present, dismiss],
  );

  const handleBackdropPress = (): void => {
    dismiss();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal visible={isVisible} transparent animationType="none" onRequestClose={dismiss}>
      <View style={[styles.overlay]}>
        <Pressable style={styles.backdrop} onPress={handleBackdropPress} />
        <Animated.View
          style={[
            styles.bottomSheet,
            { backgroundColor: colors.layer.solid.light },
            { height },
            {
              transform: [{ translateY: slideAnimRef.current }],
            },
          ]}
        >
          <View style={styles.handle} />
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
