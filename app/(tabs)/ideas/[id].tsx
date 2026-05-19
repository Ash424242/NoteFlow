import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Text, useTheme } from 'react-native-paper';

import { spacing } from '@/constants/theme';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { useNotesStore } from '@/store/notesStore';
import { formatNoteDate } from '@/utils/date';

export default function IdeaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const idea = useNotesStore((s) => s.ideas.find((i) => i.id === id));
  const deleteIdea = useNotesStore((s) => s.deleteIdea);

  const handleDelete = useConfirmDelete(() => {
    deleteIdea(id!);
    router.back();
  });

  if (!idea) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Idea no encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: idea.color }}
      contentContainerStyle={styles.container}
    >
      <Text variant="headlineMedium" style={styles.title}>
        {idea.title}
      </Text>
      <Text variant="labelMedium" style={styles.meta}>
        Actualizada: {formatNoteDate(idea.updatedAt)}
      </Text>
      <View style={styles.tags}>
        {idea.tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </View>
      <Button mode="contained-tonal" onPress={handleDelete}>
        Eliminar idea
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  title: {
    fontWeight: '700',
  },
  meta: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    opacity: 0.8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
});
