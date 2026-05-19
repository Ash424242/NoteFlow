# Configuración de herramientas de IA

Este documento describe la configuración aplicada para que el asistente de IA conozca NoteFlow desde el inicio y genere código alineado con las decisiones del proyecto.

## Cursor

### Qué se ha configurado

Archivo **`.cursorrules`** en la raíz del repositorio. Cursor lo incluye como contexto persistente en las conversaciones del proyecto.

### Por qué `.cursorrules`

Las instrucciones de la fase piden un único archivo en la raíz con el contexto del proyecto. Es el mecanismo clásico de Cursor para reglas globales: simple de versionar en Git y compartir con cualquier clon del repo.

Cursor también admite reglas en `.cursor/rules/*.mdc` (con `alwaysApply` o `globs` por tipo de archivo). Para NoteFlow se ha optado por **un solo `.cursorrules`** para evitar duplicar contexto y mantener una única fuente de verdad hasta que el código crezca y merezca reglas por carpeta.

### Contenido y criterios

Las reglas siguen buenas prácticas para **React Native + TypeScript + Expo**:

| Área | Qué se fija en las reglas | Motivo |
|------|---------------------------|--------|
| Contexto | Qué es NoteFlow y enlaces a `docs/` | Evita propuestas genéricas o fuera de alcance |
| Idioma | Español en docs/UI; inglés en código | Coherencia con el resto del proyecto |
| Stack | Expo Router, Zustand, FlashList, Zod, AsyncStorage | Evita librerías alternativas no previstas |
| Carpetas | `app/`, `components/`, `store/`, `types/`, `constants/` | Respeta la arquitectura de la fase |
| Tipos | `AnyNote` y type guards | Reduce errores al mezclar los tres tipos de nota |
| Rendimiento | FlashList, `estimatedItemSize`, hilo JS | Alineado con requisitos de listas largas |
| Navegación | Tabs, `[id]`, modal de creación | Coincide con Expo Router del enunciado |
| Alcance | Cambios mínimos, sin bajar SDK | Menos refactors innecesarios y menos riesgo |

### Cómo mantenerlo

- Al tomar una decisión importante (p. ej. elegir Gluestack UI vs Paper), **actualizar `.cursorrules`** en la misma PR o commit.
- Si el proyecto crece, valorar extraer reglas file-specific a `.cursor/rules/` (p. ej. solo `**/*.tsx` en `app/`) y dejar en `.cursorrules` solo el contexto global.

### Verificación

Abre el proyecto en Cursor y comprueba que existe `.cursorrules` en la raíz. En un chat nuevo, pide por ejemplo «¿qué stack usa NoteFlow?»; la respuesta debería mencionar Expo, Zustand y FlashList sin contradecir `docs/idea.md`.

## Otras herramientas

Gemini, Claude y otras no se han configurado en esta fase; solo **Cursor** según el alcance acordado.
