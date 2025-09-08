import React from 'react';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
