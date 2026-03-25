import { Stack } from 'expo-router';
import React from 'react';
import { PostsProvider } from '../context/PostsContext';

export default function RootLayout() {
  return (
    <PostsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="post-details" />
      </Stack>
    </PostsProvider>
  );
}