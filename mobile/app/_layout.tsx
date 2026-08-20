import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { colors } from '@/src/theme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.navy,
    card: colors.navy,
    primary: colors.gold,
    text: colors.text,
    border: colors.line,
    notification: colors.gold,
  },
};

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={navTheme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.navy },
          headerTintColor: colors.gold,
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          contentStyle: { backgroundColor: colors.navy },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="article/[slug]" options={{ title: 'Briefing' }} />
        <Stack.Screen name="section/[slug]" options={{ title: 'Section' }} />
        <Stack.Screen name="search" options={{ title: 'Search' }} />
        <Stack.Screen name="subscribe" options={{ title: 'Get the daily brief' }} />
        <Stack.Screen name="watch" options={{ title: 'Watch' }} />
        <Stack.Screen name="listen" options={{ title: 'Listen' }} />
        <Stack.Screen name="charts" options={{ title: 'Charts' }} />
        <Stack.Screen name="people" options={{ title: 'People & institutions' }} />
        <Stack.Screen name="about" options={{ title: 'About' }} />
        <Stack.Screen name="command-center" options={{ title: 'Command Center' }} />
        <Stack.Screen name="saved" options={{ title: 'Saved' }} />
      </Stack>
    </ThemeProvider>
  );
}
