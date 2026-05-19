import type { ChecklistNote, IdeaNote, Note } from '@/types';

function toDate(value: Date | string): Date {
  return value instanceof Date ? value : new Date(value);
}

export function rehydrateNotes(notes: Note[]): Note[] {
  return notes.map((n) => ({
    ...n,
    createdAt: toDate(n.createdAt),
    updatedAt: toDate(n.updatedAt),
  }));
}

export function rehydrateChecklists(checklists: ChecklistNote[]): ChecklistNote[] {
  return checklists.map((c) => ({
    ...c,
    createdAt: toDate(c.createdAt),
    updatedAt: toDate(c.updatedAt),
  }));
}

export function rehydrateIdeas(ideas: IdeaNote[]): IdeaNote[] {
  return ideas.map((i) => ({
    ...i,
    createdAt: toDate(i.createdAt),
    updatedAt: toDate(i.updatedAt),
  }));
}
