import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, List, Text, useTheme } from 'react-native-paper';

import { spacing } from '@/constants/theme';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { useNotesStore } from '@/store/notesStore';
import { formatNoteDate } from '@/utils/date';

export default function ChecklistDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const checklist = useNotesStore((s) => s.checklists.find((c) => c.id === id));
  const toggleChecklistItem = useNotesStore((s) => s.toggleChecklistItem);
  const deleteChecklist = useNotesStore((s) => s.deleteChecklist);
  const archiveChecklist = useNotesStore((s) => s.archiveChecklist);
  const unarchiveChecklist = useNotesStore((s) => s.unarchiveChecklist);

  const handleDelete = useConfirmDelete(() => {
    deleteChecklist(id!);
    router.back();
  });

  const handleToggle = (itemId: string) => {
    if (!checklist) return;
    toggleChecklistItem(checklist.id, itemId);
    const fresh = useNotesStore
      .getState()
      .checklists.find((c) => c.id === checklist.id);
    if (
      fresh &&
      fresh.items.length > 0 &&
      fresh.items.every((i) => i.isCompleted)
    ) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  if (!checklist) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Lista no encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text variant="headlineMedium" style={styles.title}>
        {checklist.title}
      </Text>
      <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
        Actualizada: {formatNoteDate(checklist.updatedAt)}
      </Text>
      {checklist.items.map((item) => (
        <List.Item
          key={item.id}
          title={item.text}
          left={() => (
            <Checkbox
              status={item.isCompleted ? 'checked' : 'unchecked'}
              onPress={() => handleToggle(item.id)}
            />
          )}
          onPress={() => handleToggle(item.id)}
        />
      ))}
      {checklist.archived ? (
        <>
          <Button mode="outlined" onPress={() => { unarchiveChecklist(id!); router.back(); }} style={styles.action}>
            Restaurar
          </Button>
          <Button mode="contained-tonal" buttonColor={theme.colors.errorContainer} onPress={handleDelete}>
            Eliminar definitivamente
          </Button>
        </>
      ) : (
        <>
          <Button mode="outlined" onPress={() => { archiveChecklist(id!); router.back(); }} style={styles.action}>
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
  action: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
});
