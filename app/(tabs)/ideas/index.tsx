import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';

import { EmptyState } from '@/components/EmptyState';
import { IdeaCard } from '@/components/items/IdeaCard';
import { spacing } from '@/constants/theme';
import { useNotesStore } from '@/store/notesStore';

export default function IdeasScreen() {
  const theme = useTheme();
  const ideas = useNotesStore((s) => s.ideas);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlashList
        data={ideas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <IdeaCard
            idea={item}
            onPress={() => router.push(`/ideas/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="Sin ideas"
            description="Pulsa + para capturar tu primera idea."
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
