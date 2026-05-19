import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Chip,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { palette, spacing } from '@/constants/theme';
import {
  checklistSchema,
  ideaSchema,
  noteSchema,
} from '@/schemas/noteSchemas';
import { useNotesStore } from '@/store/notesStore';
import type { NoteType } from '@/types';
import { createId } from '@/utils/id';

function parseTags(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function NuevaNotaScreen() {
  const { type: typeParam } = useLocalSearchParams<{ type?: string }>();
  const type = (typeParam ?? 'note') as NoteType;
  const theme = useTheme();

  const addNote = useNotesStore((s) => s.addNote);
  const addChecklist = useNotesStore((s) => s.addChecklist);
  const addIdea = useNotesStore((s) => s.addIdea);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [items, setItems] = useState<string[]>(['']);
  const [newItem, setNewItem] = useState('');
  const [tags, setTags] = useState('');
  const [color, setColor] = useState<string>(palette.ideaColors[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const now = new Date();
    setErrors({});

    if (type === 'note') {
      const result = noteSchema.safeParse({ title, content });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const key = String(issue.path[0]);
          fieldErrors[key] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }
      addNote({
        id: createId(),
        title: result.data.title,
        content: result.data.content,
        createdAt: now,
        updatedAt: now,
      });
    }

    if (type === 'checklist') {
      const filledItems = items.filter((i) => i.trim().length > 0);
      const result = checklistSchema.safeParse({
        title,
        items: filledItems,
      });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const key = issue.path[0] === 'items' ? 'items' : String(issue.path[0]);
          fieldErrors[key] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }
      addChecklist({
        id: createId(),
        title: result.data.title,
        items: result.data.items.map((text) => ({
          id: createId(),
          text,
          isCompleted: false,
        })),
        createdAt: now,
        updatedAt: now,
      });
    }

    if (type === 'idea') {
      const result = ideaSchema.safeParse({ title, tags, color });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          fieldErrors[String(issue.path[0])] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }
      addIdea({
        id: createId(),
        title: result.data.title,
        tags: parseTags(result.data.tags),
        color: result.data.color,
        createdAt: now,
        updatedAt: now,
      });
    }

    router.back();
  };

  const addChecklistItem = () => {
    if (!newItem.trim()) return;
    setItems((prev) => [...prev.filter((i) => i.trim()), newItem.trim()]);
    setNewItem('');
  };

  const titles: Record<NoteType, string> = {
    note: 'Nueva nota',
    checklist: 'Nueva lista',
    idea: 'Nueva idea',
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text variant="titleLarge" style={styles.heading}>
          {titles[type]}
        </Text>

        <TextInput
          label="Título"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          error={!!errors.title}
          style={styles.input}
        />
        {errors.title ? <HelperText type="error">{errors.title}</HelperText> : null}

        {type === 'note' && (
          <>
            <TextInput
              label="Contenido"
              value={content}
              onChangeText={setContent}
              mode="outlined"
              multiline
              numberOfLines={6}
              error={!!errors.content}
              style={styles.input}
            />
            {errors.content ? (
              <HelperText type="error">{errors.content}</HelperText>
            ) : null}
          </>
        )}

        {type === 'checklist' && (
          <>
            {items.filter(Boolean).map((item, index) => (
              <Text key={`${item}-${index}`} variant="bodyMedium" style={styles.itemRow}>
                • {item}
              </Text>
            ))}
            <TextInput
              label="Nuevo ítem"
              value={newItem}
              onChangeText={setNewItem}
              mode="outlined"
              style={styles.input}
              onSubmitEditing={addChecklistItem}
            />
            <Button mode="outlined" onPress={addChecklistItem} style={styles.input}>
              Añadir ítem
            </Button>
            {errors.items ? <HelperText type="error">{errors.items}</HelperText> : null}
          </>
        )}

        {type === 'idea' && (
          <>
            <TextInput
              label="Etiquetas (separadas por coma)"
              value={tags}
              onChangeText={setTags}
              mode="outlined"
              style={styles.input}
            />
            <Text variant="labelLarge" style={styles.colorLabel}>
              Color
            </Text>
            <View style={styles.colors}>
              {palette.ideaColors.map((c) => (
                <Pressable
                  key={c}
                  onPress={() => setColor(c)}
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: c },
                    color === c && styles.colorSelected,
                  ]}
                />
              ))}
            </View>
            {errors.color ? <HelperText type="error">{errors.color}</HelperText> : null}
            {tags.trim() ? (
              <View style={styles.tagPreview}>
                {parseTags(tags).map((tag) => (
                  <Chip key={tag} compact>
                    {tag}
                  </Chip>
                ))}
              </View>
            ) : null}
          </>
        )}

        <Button mode="contained" onPress={handleSave} style={styles.save}>
          Guardar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  heading: {
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  input: {
    marginBottom: spacing.sm,
  },
  itemRow: {
    marginBottom: spacing.xs,
  },
  colorLabel: {
    marginBottom: spacing.sm,
  },
  colors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: '#4F46E5',
  },
  tagPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  save: {
    marginTop: spacing.md,
  },
});
