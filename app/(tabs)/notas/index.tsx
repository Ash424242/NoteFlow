import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';

import { NoteCard } from '@/components/items/NoteCard';
import { spacing } from '@/constants/theme';
import { useNotesStore } from '@/store/notesStore';

export default function NotasScreen() {
  const theme = useTheme();
  const notes = useNotesStore((s) => s.notes);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlashList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => router.push(`/notas/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
            No hay notas. Pulsa + para crear una.
          </Text>
        }
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push({ pathname: '/nueva-nota', params: { type: 'note' } })}
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
