import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import { spacing } from '@/constants/theme';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { useNotesStore } from '@/store/notesStore';
import { formatNoteDate } from '@/utils/date';

export default function NotaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const note = useNotesStore((s) => s.notes.find((n) => n.id === id));
  const deleteNote = useNotesStore((s) => s.deleteNote);

  const handleDelete = useConfirmDelete(() => {
    deleteNote(id!);
    router.back();
  });

  if (!note) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Nota no encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text variant="headlineMedium" style={styles.title}>
        {note.title}
      </Text>
      <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
        Actualizada: {formatNoteDate(note.updatedAt)}
      </Text>
      <Text variant="bodyLarge" style={styles.content}>
        {note.content}
      </Text>
      <Button mode="contained-tonal" buttonColor={theme.colors.errorContainer} onPress={handleDelete}>
        Eliminar nota
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
    marginBottom: spacing.xs,
  },
  content: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
});
