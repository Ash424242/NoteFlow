import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ChecklistNote, IdeaNote, Note } from '@/types';
import {
  rehydrateChecklists,
  rehydrateIdeas,
  rehydrateNotes,
} from '@/utils/rehydrateDates';

interface NotesStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addNote: (note: Note) => void;
  addChecklist: (checklist: ChecklistNote) => void;
  addIdea: (idea: IdeaNote) => void;
  deleteNote: (id: string) => void;
  deleteChecklist: (id: string) => void;
  deleteIdea: (id: string) => void;
  archiveNote: (id: string) => void;
  archiveChecklist: (id: string) => void;
  archiveIdea: (id: string) => void;
  unarchiveNote: (id: string) => void;
  unarchiveChecklist: (id: string) => void;
  unarchiveIdea: (id: string) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: [],
      checklists: [],
      ideas: [],
      _hasHydrated: false,
      setHasHydrated: (value) => set({ _hasHydrated: value }),
      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      addChecklist: (checklist) =>
        set((state) => ({ checklists: [...state.checklists, checklist] })),
      addIdea: (idea) => set((state) => ({ ideas: [...state.ideas, idea] })),
      deleteNote: (id) =>
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
      deleteChecklist: (id) =>
        set((state) => ({
          checklists: state.checklists.filter((c) => c.id !== id),
        })),
      deleteIdea: (id) =>
        set((state) => ({ ideas: state.ideas.filter((i) => i.id !== id) })),
      archiveNote: (id) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, archived: true, updatedAt: new Date() } : n,
          ),
        })),
      archiveChecklist: (id) =>
        set((state) => ({
          checklists: state.checklists.map((c) =>
            c.id === id ? { ...c, archived: true, updatedAt: new Date() } : c,
          ),
        })),
      archiveIdea: (id) =>
        set((state) => ({
          ideas: state.ideas.map((i) =>
            i.id === id ? { ...i, archived: true, updatedAt: new Date() } : i,
          ),
        })),
      unarchiveNote: (id) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, archived: false, updatedAt: new Date() } : n,
          ),
        })),
      unarchiveChecklist: (id) =>
        set((state) => ({
          checklists: state.checklists.map((c) =>
            c.id === id ? { ...c, archived: false, updatedAt: new Date() } : c,
          ),
        })),
      unarchiveIdea: (id) =>
        set((state) => ({
          ideas: state.ideas.map((i) =>
            i.id === id ? { ...i, archived: false, updatedAt: new Date() } : i,
          ),
        })),
      toggleChecklistItem: (checklistId, itemId) =>
        set((state) => ({
          checklists: state.checklists.map((c) =>
            c.id !== checklistId
              ? c
              : {
                  ...c,
                  updatedAt: new Date(),
                  items: c.items.map((i) =>
                    i.id === itemId ? { ...i, isCompleted: !i.isCompleted } : i,
                  ),
                },
          ),
        })),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        notes: state.notes,
        checklists: state.checklists,
        ideas: state.ideas,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.notes = rehydrateNotes(state.notes);
          state.checklists = rehydrateChecklists(state.checklists);
          state.ideas = rehydrateIdeas(state.ideas);
        }
        state?.setHasHydrated(true);
      },
    },
  ),
);
