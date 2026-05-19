import { Pressable, StyleSheet, View } from 'react-native';
import { Card, ProgressBar, Text, useTheme } from 'react-native-paper';

import { spacing, typography } from '@/constants/theme';
import type { ChecklistNote } from '@/types';
import { formatNoteDate } from '@/utils/date';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
}

export function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const theme = useTheme();
  const total = checklist.items.length;
  const completed = checklist.items.filter((i) => i.isCompleted).length;
  const progress = total > 0 ? completed / total : 0;

  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            {checklist.title}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: spacing.xs }}
          >
            {completed} de {total} tareas completadas
          </Text>
          <ProgressBar
            progress={progress}
            style={styles.progress}
            color={theme.colors.primary}
          />
          <Text variant="labelSmall" style={styles.date}>
            {formatNoteDate(checklist.updatedAt)}
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
  progress: {
    marginTop: spacing.sm,
    height: 6,
    borderRadius: 3,
  },
  date: {
    marginTop: spacing.sm,
    opacity: 0.7,
  },
});
