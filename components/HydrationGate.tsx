import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { spacing } from '@/constants/theme';
import { useNotesStore } from '@/store/notesStore';

interface HydrationGateProps {
  children: ReactNode;
}

export function HydrationGate({ children }: HydrationGateProps) {
  const theme = useTheme();
  const hasHydrated = useNotesStore((s) => s._hasHydrated);

  if (!hasHydrated) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text variant="bodyMedium" style={{ marginTop: spacing.md }}>
          Cargando tus notas…
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
