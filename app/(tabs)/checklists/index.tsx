import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';

import { spacing } from '@/constants/theme';

export default function ChecklistsScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
        Tus listas de tareas aparecerán aquí.
      </Text>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push({ pathname: '/nueva-nota', params: { type: 'checklist' } })}
        label="Nueva"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
  },
});
