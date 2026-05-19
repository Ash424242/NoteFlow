import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

import { spacing, typography } from '@/constants/theme';
import type { Note } from '@/types';
import { formatNoteDate } from '@/utils/date';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export function NoteCard({ note, onPress }: NoteCardProps) {
  const theme = useTheme();
  const preview =
    note.content.length > 120 ? `${note.content.slice(0, 120)}…` : note.content;

  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            {note.title}
          </Text>
          <Text
            variant="bodyMedium"
            numberOfLines={2}
            style={{ color: theme.colors.onSurfaceVariant, marginTop: spacing.xs }}
          >
            {preview}
          </Text>
          <Text variant="labelSmall" style={styles.date}>
            {formatNoteDate(note.updatedAt)}
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.headline,
    fontWeight: '600',
  },
  date: {
    marginTop: spacing.sm,
    opacity: 0.7,
  },
});
