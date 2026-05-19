import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

import { AnimatedListItem } from '@/components/AnimatedListItem';
import { EmptyState } from '@/components/EmptyState';
import { ListSearchHeader } from '@/components/ListSearchHeader';
import { ChecklistCard } from '@/components/items/ChecklistCard';
import { spacing } from '@/constants/theme';
import { useNotesStore } from '@/store/notesStore';
import { filterActive, filterBySearch } from '@/utils/filter';

export default function ChecklistsScreen() {
  const theme = useTheme();
  const checklists = useNotesStore((s) => s.checklists);
  const [query, setQuery] = useState('');

  const data = useMemo(
    () => filterBySearch(filterActive(checklists), query),
    [checklists, query],
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlashList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <ListSearchHeader
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar listas…"
          />
        }
        renderItem={({ item }) => (
          <AnimatedListItem>
            <ChecklistCard
              checklist={item}
              onPress={() => router.push(`/checklists/${item.id}`)}
            />
          </AnimatedListItem>
        )}
        ListEmptyComponent={
          <EmptyState
            title={query ? 'Sin resultados' : 'Sin listas'}
            description={
              query
                ? 'Prueba con otro término de búsqueda.'
                : 'Pulsa + para crear tu primera lista de tareas.'
            }
          />
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
