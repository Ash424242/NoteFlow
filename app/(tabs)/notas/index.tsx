import { AppFlashList } from '@/components/AppFlashList';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

import { AnimatedListItem } from '@/components/AnimatedListItem';
import { EmptyState } from '@/components/EmptyState';
import { ListSearchHeader } from '@/components/ListSearchHeader';
import { NoteCard } from '@/components/items/NoteCard';
import { spacing } from '@/constants/theme';
import { useNotesStore } from '@/store/notesStore';
import { filterActive, filterBySearch } from '@/utils/filter';

export default function NotasScreen() {
  const theme = useTheme();
  const notes = useNotesStore((s) => s.notes);
  const [query, setQuery] = useState('');

  const data = useMemo(
    () => filterBySearch(filterActive(notes), query),
    [notes, query],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppFlashList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <ListSearchHeader value={query} onChangeText={setQuery} placeholder="Buscar notas…" />
        }
        renderItem={({ item }) => (
          <AnimatedListItem>
            <NoteCard note={item} onPress={() => router.push(`/notas/${item.id}`)} />
          </AnimatedListItem>
        )}
        ListEmptyComponent={
          <EmptyState
            title={query ? 'Sin resultados' : 'Sin notas'}
            description={
              query
                ? 'Prueba con otro término de búsqueda.'
                : 'Pulsa + para crear tu primera nota de texto.'
            }
          />
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
