import { AppFlashList } from '@/components/AppFlashList';
import { listEstimatedSizes } from '@/constants/listSizes';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

import { AnimatedListItem } from '@/components/AnimatedListItem';
import { EmptyState } from '@/components/EmptyState';
import { ListSearchHeader } from '@/components/ListSearchHeader';
import { IdeaCard } from '@/components/items/IdeaCard';
import { spacing } from '@/constants/theme';
import { useNotesStore } from '@/store/notesStore';
import { filterActive, filterBySearch } from '@/utils/filter';

export default function IdeasScreen() {
  const theme = useTheme();
  const ideas = useNotesStore((s) => s.ideas);
  const [query, setQuery] = useState('');

  const data = useMemo(
    () => filterBySearch(filterActive(ideas), query),
    [ideas, query],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppFlashList
        data={data}
        estimatedItemSize={listEstimatedSizes.idea}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <ListSearchHeader value={query} onChangeText={setQuery} placeholder="Buscar ideas…" />
        }
        renderItem={({ item }) => (
          <AnimatedListItem>
            <IdeaCard idea={item} onPress={() => router.push(`/ideas/${item.id}`)} />
          </AnimatedListItem>
        )}
        ListEmptyComponent={
          <EmptyState
            title={query ? 'Sin resultados' : 'Sin ideas'}
            description={
              query
                ? 'Prueba con otro término de búsqueda.'
                : 'Pulsa + para capturar tu primera idea.'
            }
          />
        }
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push({ pathname: '/nueva-nota', params: { type: 'idea' } })}
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
