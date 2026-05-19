import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import { HydrationGate } from '@/components/HydrationGate';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function RootLayout() {
  const theme = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      <HydrationGate>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.onSurface,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="nueva-nota"
          options={{
            presentation: 'modal',
            title: 'Nuevo contenido',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="nueva-note"
          options={{
            presentation: 'modal',
            title: 'Nuevo contenido',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      </HydrationGate>
    </PaperProvider>
  );
}
