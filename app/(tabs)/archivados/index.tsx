import { AppFlashList } from '@/components/AppFlashList';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { AnimatedListItem } from '@/components/AnimatedListItem';
import { EmptyState } from '@/components/EmptyState';
import { ListSearchHeader } from '@/components/ListSearchHeader';
import { ChecklistCard } from '@/components/items/ChecklistCard';
import { IdeaCard } from '@/components/items/IdeaCard';
import { NoteCard } from '@/components/items/NoteCard';
import { spacing } from '@/constants/theme';
import { useNotesStore } from '@/store/notesStore';
import type { ChecklistNote, IdeaNote, Note } from '@/types';
import { filterArchived, filterBySearch } from '@/utils/filter';

type ArchivedRow =
  | { kind: 'note'; item: Note; title: string }
  | { kind: 'checklist'; item: ChecklistNote; title: string }
  | { kind: 'idea'; item: IdeaNote; title: string };

export default function ArchivadosScreen() {
  const theme = useTheme();
  const notes = useNotesStore((s) => s.notes);
  const checklists = useNotesStore((s) => s.checklists);
  const ideas = useNotesStore((s) => s.ideas);
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const merged: ArchivedRow[] = [
      ...filterArchived(notes).map((item) => ({
        kind: 'note' as const,
        item,
        title: item.title,
      })),
      ...filterArchived(checklists).map((item) => ({
        kind: 'checklist' as const,
        item,
        title: item.title,
      })),
      ...filterArchived(ideas).map((item) => ({
        kind: 'idea' as const,
        item,
        title: item.title,
      })),
    ];
    return filterBySearch(merged, query);
  }, [notes, checklists, ideas, query]);

  const openItem = (row: ArchivedRow) => {
    if (row.kind === 'note') router.push(`/notas/${row.item.id}`);
    else if (row.kind === 'checklist') router.push(`/checklists/${row.item.id}`);
    else router.push(`/ideas/${row.item.id}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppFlashList
        data={rows}
        keyExtractor={(row) => `${row.kind}-${row.item.id}`}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <ListSearchHeader
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar archivados…"
          />
        }
        renderItem={({ item: row }) => (
          <AnimatedListItem>
            {row.kind === 'note' ? (
              <NoteCard note={row.item} onPress={() => openItem(row)} />
            ) : row.kind === 'checklist' ? (
              <ChecklistCard checklist={row.item} onPress={() => openItem(row)} />
            ) : (
              <IdeaCard idea={row.item} onPress={() => openItem(row)} />
            )}
          </AnimatedListItem>
        )}
        ListEmptyComponent={
          <EmptyState
            title="Sin archivados"
            description="Los elementos archivados desde el detalle aparecerán aquí."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
});
