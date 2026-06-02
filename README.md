![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![React Native](https://img.shields.io/badge/-React_Native-05122A?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=zustand&logoColor=white)
![React Native Paper](https://img.shields.io/badge/React_Native_Paper-6750A4?style=for-the-badge&logo=material-design&logoColor=white)

# 📝 NoteFlow

> Una sola app para notas, tareas e ideas — sin cambiar de contexto.

Aplicación móvil de productividad con **React Native** y **Expo**. Centraliza notas de texto, listas de tareas e ideas con etiquetas, con navegación por pestañas, persistencia local y tema claro/oscuro.

| Recurso | URL |
|---------|-----|
| Repositorio | [github.com/Ash424242/NoteFlow](https://github.com/Ash424242/NoteFlow) |
| Tablero Trello | [NoteFlow](https://trello.com/b/pEB0Awkj/noteflow) |

---

## Características

- Tres tipos de contenido: notas, listas de tareas (checklists) e ideas con etiquetas y color.
- Navegación por pestañas (Notas, Tareas, Ideas) con detalle `[id]` y modal de creación.
- Listas optimizadas con FlashList y tarjetas visualmente distintas.
- Estado global con Zustand y datos persistentes en AsyncStorage.
- Formularios validados con Zod y soporte de teclado en iOS/Android.
- UI con React Native Paper y tokens de diseño propios.
- Búsqueda por título, animaciones de tarjetas, archivado y pestaña Archivo.
- Feedback háptico, confirmación al eliminar y estados vacíos por sección.

---

## Tecnologías

| App móvil | Uso |
|-----------|-----|
| Expo SDK 54 | Framework, tooling y ejecución |
| React Native | Interfaz nativa multiplataforma |
| TypeScript | Tipado estático del proyecto |
| Expo Router | Rutas basadas en archivos (`app/`) |

| Estado y datos | Uso |
|----------------|-----|
| Zustand | Estado global (notas, checklists, ideas) |
| AsyncStorage | Persistencia local del store |
| Zod | Validación de formularios en `nueva-nota` |

| UI y experiencia | Uso |
|------------------|-----|
| React Native Paper | Componentes Material Design 3 |
| Shopify FlashList | Listas de alto rendimiento |
| Reanimated | Animaciones de entrada/salida en tarjetas |
| expo-haptics | Vibración al eliminar y al completar tareas |

---

## Estructura del proyecto

```
NoteFlow/
├── app/                      # Rutas Expo Router
│   ├── (tabs)/               # Notas, Tareas, Ideas, Archivo
│   │   ├── notas/            # index + [id]
│   │   ├── checklists/
│   │   └── ideas/
│   ├── nueva-nota.tsx        # Modal de creación
│   └── _layout.tsx           # Stack raíz + PaperProvider
├── components/               # Tarjetas, búsqueda, HydrationGate
├── constants/                # theme.ts, listSizes.ts
├── store/                    # notesStore.ts (Zustand + persist)
├── types/                    # Interfaces y type guards
├── schemas/                  # Schemas Zod
├── hooks/                    # useAppTheme, useConfirmDelete
├── utils/                    # id, fechas, filtros, seedBenchmarkData
├── docs/                     # Documentación del proyecto
│   ├── idea.md
│   ├── project-management.md
│   ├── ai-setup.md
│   └── react-native-teoria.md
└── README.md
```

---

## Descargar y ejecutar

```bash
git clone https://github.com/Ash424242/NoteFlow.git
cd NoteFlow
npm install
npx expo start
```

**Requisitos:** Node.js LTS y npm.

---

## Ejecutar con Expo

### Expo Go (desarrollo rápido)

1. Instala [Expo Go](https://expo.dev/go) en tu dispositivo.
2. Ejecuta `npx expo start` en el proyecto.
3. Escanea el código QR que aparece en la terminal.

### Emulador

1. Ejecuta `npx expo start`.
2. Pulsa `a` para Android o `i` para iOS (iOS requiere macOS).
3. Alternativa: `npm run android` / `npm run ios`.

### Debug en dispositivo físico (Android Studio)

1. Ejecuta `npm run android:debug:prepare`.
2. Levanta Metro con `npm run start:dev-client`.
3. Lanza la app desde Android Studio en tu dispositivo físico.

### Deep linking

Esquema de la app: `noteflow://`

### Datos de prueba (auditoría)

Para validar scroll con 50+ ítems por pestaña, en desarrollo llama a `seedBenchmarkData()` desde `utils/seedBenchmarkData.ts`. Pasos detallados en [docs/react-native-teoria.md](docs/react-native-teoria.md) (sección «Auditoría de rendimiento»).

---

## Documentación

| Documento | Contenido |
|-----------|-----------|
| [docs/idea.md](docs/idea.md) | Problema, usuario objetivo, alcance v1 y futuro |
| [docs/project-management.md](docs/project-management.md) | Flujo Trello y estado del proyecto |
| [docs/ai-setup.md](docs/ai-setup.md) | Configuración de Cursor (`.cursorrules`) |
| [docs/react-native-teoria.md](docs/react-native-teoria.md) | RN, Metro, Expo Go, diseño, navegación, estado, FlashList |
| [docs/android-studio-device-setup.md](docs/android-studio-device-setup.md) | Ejecución nativa Android con Gradle en dispositivo físico |

---

*Proyecto educativo — Fase 6 (React Native, Expo y estado local)*
