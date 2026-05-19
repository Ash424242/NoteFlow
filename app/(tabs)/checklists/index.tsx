import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';

import { ChecklistCard } from '@/components/items/ChecklistCard';
import { spacing } from '@/constants/theme';
import { useNotesStore } from '@/store/notesStore';

export default function ChecklistsScreen() {
  const theme = useTheme();
  const checklists = useNotesStore((s) => s.checklists);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlashList
        data={checklists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ChecklistCard
            checklist={item}
            onPress={() => router.push(`/checklists/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
            No hay listas de tareas. Pulsa + para crear una.
          </Text>
        }
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          router.push({ pathname: '/nueva-nota', params: { type: 'checklist' } })
        }
        label="Nueva"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl * 2,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
  },
});
