import 'react-native-get-random-values';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import { useFonts } from '@/src/common/theme/fonts';

export default function RootLayout(): JSX.Element {
  const [fontsLoaded] = useFonts();

  if (!fontsLoaded) {
    // You can show a splash screen or a loading indicator here
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
