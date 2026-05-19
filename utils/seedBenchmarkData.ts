import { palette } from '@/constants/theme';
import { useNotesStore } from '@/store/notesStore';
import { createId } from '@/utils/id';

/**
 * Genera 55 ítems por tipo para auditar scroll y FPS (Instrucciones.md § pulido UX).
 * Uso en desarrollo: importar y llamar una vez desde consola o un botón temporal.
 */
export function seedBenchmarkData(): void {
  const { addNote, addChecklist, addIdea } = useNotesStore.getState();
  const now = new Date();

  for (let i = 0; i < 55; i++) {
    addNote({
      id: createId(),
      title: `Nota de prueba ${i + 1}`,
      content: `Contenido de benchmark para validar FlashList con muchos elementos. Ítem ${i + 1}.`,
      createdAt: now,
      updatedAt: now,
    });
  }

  for (let i = 0; i < 55; i++) {
    addChecklist({
      id: createId(),
      title: `Lista de prueba ${i + 1}`,
      items: [
        { id: createId(), text: 'Tarea A', isCompleted: i % 2 === 0 },
        { id: createId(), text: 'Tarea B', isCompleted: false },
      ],
      createdAt: now,
      updatedAt: now,
    });
  }

  for (let i = 0; i < 55; i++) {
    addIdea({
      id: createId(),
      title: `Idea de prueba ${i + 1}`,
      tags: ['benchmark', `tag-${i}`],
      color: palette.ideaColors[i % palette.ideaColors.length],
      createdAt: now,
      updatedAt: now,
    });
  }
}
