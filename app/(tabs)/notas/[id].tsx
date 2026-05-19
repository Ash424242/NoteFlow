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
  const archiveNote = useNotesStore((s) => s.archiveNote);
  const unarchiveNote = useNotesStore((s) => s.unarchiveNote);

  const handleDelete = useConfirmDelete(() => {
    deleteNote(id!);
    router.back();
  });

  const handleArchive = () => {
    archiveNote(id!);
    router.back();
  };

  const handleUnarchive = () => {
    unarchiveNote(id!);
    router.back();
  };

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
      {note.archived ? (
        <>
          <Button mode="outlined" onPress={handleUnarchive} style={styles.action}>
            Restaurar
          </Button>
          <Button mode="contained-tonal" buttonColor={theme.colors.errorContainer} onPress={handleDelete}>
            Eliminar definitivamente
          </Button>
        </>
      ) : (
        <>
          <Button mode="outlined" onPress={handleArchive} style={styles.action}>
            Archivar
          </Button>
          <Button mode="contained-tonal" buttonColor={theme.colors.errorContainer} onPress={handleDelete}>
            Eliminar
          </Button>
        </>
      )}
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
  action: {
    marginBottom: spacing.sm,
  },
});
