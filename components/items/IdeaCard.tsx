import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';

import { spacing, typography } from '@/constants/theme';
import type { IdeaNote } from '@/types';
import { formatNoteDate } from '@/utils/date';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
}

export function IdeaCard({ idea, onPress }: IdeaCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Card style={[styles.card, { backgroundColor: idea.color }]} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            {idea.title}
          </Text>
          {idea.tags.length > 0 && (
            <View style={styles.tags}>
              {idea.tags.map((tag) => (
                <Chip key={tag} compact style={styles.chip}>
                  {tag}
                </Chip>
              ))}
            </View>
          )}
          <Text variant="labelSmall" style={styles.date}>
            {formatNoteDate(idea.updatedAt)}
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  chip: {
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  date: {
    marginTop: spacing.sm,
    opacity: 0.7,
  },
});
