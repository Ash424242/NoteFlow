# NoteFlow

Aplicación móvil de productividad construida con **React Native** y **Expo**. Centraliza notas de texto, listas de tareas e ideas con etiquetas en una sola app, con navegación por pestañas, persistencia local y tema claro/oscuro.

Repositorio: [github.com/Ash424242/NoteFlow](https://github.com/Ash424242/NoteFlow)

## Características

- **Tres tipos de contenido:** notas (`Note`), listas de tareas (`ChecklistNote`) e ideas con etiquetas y color (`IdeaNote`).
- **Navegación:** pestañas Notas, Tareas e Ideas; pantallas de detalle `[id]`; modal para crear contenido (`/nueva-nota`).
- **Listas de alto rendimiento:** [FlashList](https://shopify.github.io/flash-list/) con tarjetas diferenciadas (`NoteCard`, `ChecklistCard`, `IdeaCard`).
- **Estado global:** [Zustand](https://zustand.docs.pmnd.dev/) con persistencia en [AsyncStorage](https://react-native-async-storage.github.io/async-storage/).
- **Formularios:** validación con [Zod](https://zod.dev/); teclado gestionado con `KeyboardAvoidingView`.
- **UI:** [React Native Paper](https://callstack.github.io/react-native-paper/) (Material Design 3) y tokens en `constants/theme.ts`.
- **UX:** feedback háptico al eliminar y al completar checklists; confirmación con `Alert`; estados vacíos.
- **Extensión de la fase:** búsqueda por título en cada pestaña, animaciones con Reanimated, archivado y pestaña **Archivo**.

## Stack técnico

| Tecnología | Uso |
|------------|-----|
| Expo SDK 54 | Framework y tooling |
| TypeScript | Tipado estático |
| Expo Router | Rutas basadas en archivos |
| React Native Paper | Componentes UI |
| Shopify FlashList | Listas optimizadas |
| Zustand | Estado global |
| AsyncStorage | Persistencia local |
| Zod | Validación de formularios |
| Reanimated | Animaciones de tarjetas |
| expo-haptics | Vibración táctil |

## Estructura del proyecto

```
app/                 # Rutas (Expo Router): tabs, detalle, modal nueva-nota
components/          # UI reutilizable (tarjetas, búsqueda, HydrationGate)
constants/           # theme.ts, listSizes.ts
store/               # notesStore.ts (Zustand + persist)
types/               # Interfaces y type guards
schemas/             # Schemas Zod
hooks/               # useAppTheme, useConfirmDelete
utils/               # id, fechas, filtros, seed de benchmark
docs/                # Documentación del proyecto
```

## Desarrollo

**Requisitos:** Node.js LTS, npm.

```bash
npm install
npx expo start
```

- **Expo Go:** escanea el QR para desarrollo rápido.
- **Emulador:** `npm run android` o `npm run ios` (iOS requiere macOS).
- **Deep linking:** esquema `noteflow://`.

### Datos de prueba (auditoría de rendimiento)

Para probar scroll con 50+ ítems por pestaña, en desarrollo puedes llamar a `seedBenchmarkData()` desde `utils/seedBenchmarkData.ts`. Ver pasos en [docs/react-native-teoria.md](docs/react-native-teoria.md) (sección «Auditoría de rendimiento»).

## Gestión del proyecto

Tablero Trello: **[NoteFlow](https://trello.com/b/pEB0Awkj/noteflow)**

Columnas: Backlog → Todo → In Progress → Review → Done.

Detalle del flujo y estado de las tarjetas: [docs/project-management.md](docs/project-management.md).

## Documentación

| Documento | Contenido |
|-----------|-----------|
| [docs/idea.md](docs/idea.md) | Problema, usuario objetivo, funcionalidades v1 y futuras |
| [docs/project-management.md](docs/project-management.md) | Trello y gestión del trabajo |
| [docs/ai-setup.md](docs/ai-setup.md) | Configuración de Cursor (`.cursorrules`) |
| [docs/react-native-teoria.md](docs/react-native-teoria.md) | RN, Metro, Expo Go, diseño, navegación, estado, FlashList, persistencia |

## Licencia

Proyecto educativo — Fase 6 (React Native, Expo y estado local).
