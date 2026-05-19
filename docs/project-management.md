# Gestión del proyecto NoteFlow

## Tablero Trello

El seguimiento del desarrollo se realiza en Trello:

**[NoteFlow — Tablero del proyecto](https://trello.com/b/pEB0Awkj/noteflow)**

## Columnas del flujo de trabajo

| Columna       | Uso |
|---------------|-----|
| **Backlog**   | Funcionalidades y tareas planificadas que aún no están listas para empezar. |
| **Todo**      | Tareas priorizadas para el sprint o iteración actual. |
| **In Progress** | Trabajo en curso (una tarjeta por desarrollador cuando sea posible). |
| **Review**    | Implementación terminada; pendiente de revisión o prueba manual. |
| **Done**      | Completada y verificada. |

Las tarjetas se mueven de izquierda a derecha conforme avanza el trabajo. No se considera terminada una funcionalidad hasta que pasa por **Review** y llega a **Done**.

## Tarjetas por funcionalidad principal

Cada tarjeta del tablero corresponde a una funcionalidad de la primera versión (véase [idea.md](idea.md)). Debajo de cada tarjeta hay **checklists** con subtareas técnicas concretas.

### 1. Setup del proyecto Expo

- [ ] Crear app con `create-expo-app` (plantilla TypeScript).
- [ ] Instalar y configurar Expo Router (`main`, `scheme`, carpetas `app/`, `components/`, `store/`, `types/`, `constants/`).
- [ ] Documentar en `docs/react-native-teoria.md` (RN vs nativo, Metro, Expo Go vs Development Build).

### 2. Sistema de diseño y UI

- [ ] Comparar Gluestack UI y React Native Paper; documentar elección.
- [ ] Instalar librería elegida y configurar provider en `app/_layout.tsx`.
- [ ] Crear `constants/theme.ts` (colores, tipografía, espaciado).
- [ ] Implementar tema claro/oscuro con `useColorScheme`.

### 3. Navegación (Expo Router)

- [ ] Configurar `app/(tabs)/_layout.tsx` (Notas, Tareas, Ideas + iconos).
- [ ] Rutas dinámicas de detalle: `notas/[id]`, `checklists/[id]`, `ideas/[id]`.
- [ ] Ruta modal `app/nueva-nota.tsx` para creación.
- [ ] Documentar Tabs vs Stack vs modales en la documentación técnica.

### 4. Modelado de datos (TypeScript)

- [ ] Definir interfaces en `types/index.ts` (`Note`, `ChecklistNote`, `IdeaNote`, `AnyNote`).
- [ ] Implementar type guards (`'items' in note`, etc.).
- [ ] Documentar uniones discriminadas y type guards.

### 5. Estado global (Zustand)

- [ ] Crear `store/notesStore.ts` con acciones CRUD básicas.
- [ ] Implementar `toggleChecklistItem`.
- [ ] Documentar comparación useState / Context / Zustand.

### 6. Listas y tarjetas (FlashList)

- [ ] Instalar `@shopify/flash-list`.
- [ ] Crear `NoteCard`, `ChecklistCard`, `IdeaCard`.
- [ ] Integrar FlashList en las tres pestañas con `estimatedItemSize` adecuado.
- [ ] Documentar reciclaje de componentes y rendimiento.

### 7. Formularios y validación (Zod)

- [ ] Instalar `zod` y definir schemas por tipo de nota.
- [ ] Formulario adaptable en `nueva-nota.tsx`.
- [ ] `KeyboardAvoidingView` y mensajes de error bajo los campos.

### 8. Persistencia (AsyncStorage)

- [ ] Integrar middleware `persist` de Zustand con AsyncStorage.
- [ ] Probar rehidratación (cerrar app y reabrir).
- [ ] Documentar rehidratación e indicador de carga opcional.

### 9. Pulido de UX

- [ ] Feedback háptico (eliminar, completar checklist).
- [ ] Pantallas de detalle con navegación por `id`.
- [ ] Eliminar con `Alert.alert` de confirmación.
- [ ] Estados vacíos en cada pestaña.
- [ ] Auditoría: 50+ ítems por lista, tema claro/oscuro.

### 10. Documentación y entregables

- [ ] Completar `docs/react-native-teoria.md`.
- [ ] Mantener README y enlaces actualizados.
- [ ] Verificar criterios del entregable de la fase.

## Cómo gestionamos el trabajo

1. **Planificación:** Las funcionalidades de `idea.md` se descomponen en tarjetas en **Backlog** con checklists de subtareas técnicas.
2. **Priorización:** Al iniciar una iteración, las tarjetas más urgentes pasan a **Todo**.
3. **Desarrollo:** Al empezar una tarea, la tarjeta va a **In Progress**; las subtareas del checklist se marcan según se completan.
4. **Revisión:** Al terminar la implementación, la tarjeta pasa a **Review** para comprobar criterios de aceptación y pruebas en dispositivo o simulador.
5. **Cierre:** Tras validar, la tarjeta se mueve a **Done** y se enlaza el commit o PR relevante en la descripción de la tarjeta cuando aplique.

Las funcionalidades **opcionales** (búsqueda global, animaciones, archivado, etc.) permanecen en **Backlog** hasta que la v1 esté estable; no bloquean el entregable principal.

## Estado actual

| Área                         | Estado en Trello |
|-----------------------------|------------------|
| Definición de la idea       | Done             |
| Organización del proyecto   | Done             |
| Setup Expo y dependencias   | Backlog          |
| Resto de funcionalidades v1 | Backlog          |

*Actualizar esta tabla al mover tarjetas en el [tablero](https://trello.com/b/pEB0Awkj/noteflow).*
