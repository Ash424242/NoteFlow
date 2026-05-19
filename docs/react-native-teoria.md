# Fundamentos de React Native y setup de NoteFlow

Documentación técnica de la Fase 6: arquitectura de React Native, herramientas de Expo y decisiones del setup inicial de NoteFlow.

## Fundamentos de React Native

### Componentes y vistas nativas

En React Native, un componente como `<View>` o `<Text>` **no genera HTML dentro de un WebView**. El código JavaScript describe la interfaz; el framework se comunica con **UIKit** (iOS) o las vistas de **Android** para crear controles nativos reales. Por eso la app se siente nativa en gestos, scroll y rendimiento, a diferencia de una web embebida.

### Dos hilos: JavaScript y UI

La arquitectura clásica de React Native separa:

| Hilo | Responsabilidad |
|------|-----------------|
| **JavaScript** | Lógica de React, estado, llamadas a APIs, Zustand, validación Zod, etc. |
| **UI nativo** | Pintar pantallas, animaciones gestionadas por el SO, entrada táctil |

Ambos se comunican por un **bridge** (o por la nueva arquitectura con JSI, más directa). Si el hilo de JavaScript hace trabajo pesado de forma síncrona (bucles largos, JSON enormes sin trocear, etc.), **la interfaz se congela** porque la UI no recibe actualizaciones a tiempo.

**Implicación para NoteFlow:** listas largas con FlashList, evitar cálculos costosos en cada render y delegar persistencia de forma asíncrona son prácticas obligatorias, no opcionales.

## React Native frente a una app 100 % nativa

| Aspecto | App nativa (Swift/Kotlin) | React Native + Expo |
|---------|---------------------------|---------------------|
| Lenguaje UI | Swift, SwiftUI, Kotlin, Jetpack Compose | TypeScript/JavaScript + componentes RN |
| Rendimiento máximo | Control total del runtime y memoria | Muy bueno; el puente/JSI añade un coste teórico |
| Tiempo de desarrollo | Mayor por plataforma | Un código base para iOS y Android |
| Ecosistema | SDKs oficiales de cada plataforma | Módulos Expo y librerías de la comunidad |
| Actualizaciones OTA | Más complejas (stores) | Posibles con EAS Update en builds propios |

NoteFlow no necesita módulos nativos custom en la v1; Expo cubre router, almacenamiento, hápticos y UI. Para este producto, **React Native es el equilibrio adecuado** entre velocidad de entrega y experiencia nativa.

## Metro bundler

**Metro** es el empaquetador de JavaScript de React Native (equivalente conceptual a Webpack o Vite en web). En desarrollo:

1. Arranca un servidor local (`npx expo start`).
2. Resuelve imports y dependencias del proyecto.
3. Sirve el bundle al dispositivo o emulador (Expo Go o Development Build).
4. Aplica **Fast Refresh** para recargar cambios sin perder todo el estado.

Sin Metro, el dispositivo no ejecutaría el código TypeScript/React. Por eso, al añadir dependencias nativas o cambiar configuración de Babel, a veces hay que **reiniciar Metro con caché limpia** (`npx expo start -c`).

## Expo Go frente a Development Build

### Expo Go

- App genérica de Expo en la tienda.
- Escaneas un QR y tu proyecto corre **sin compilar** un binario propio.
- Ideal para aprender y prototipar rápido.
- **Limitación:** solo incluye un conjunto fijo de módulos nativos; no puedes añadir librerías con código nativo arbitrario.

### Development Build

- Binario **de tu app** generado con **EAS Build** (o compilación local).
- Incluye exactamente los módulos nativos que declares (cámara, push, biometría, etc.).
- Es el estándar en **proyectos reales** y en producción.

### Por qué Expo Go no basta en proyectos reales

En NoteFlow la v1 puede probarse en Expo Go porque el stack previsto (Router, AsyncStorage, FlashList, Zustand, haptics) está soportado. Aun así, el enunciado exige entender que:

- En cuanto necesites un módulo nativo no incluido en Expo Go, **debes pasar a Development Build**.
- Los builds propios reproducen el entorno de producción (iconos, permisos, esquema `noteflow://`, etc.).
- Las pruebas finales y la entrega deben validarse en build de desarrollo o release, no solo en Go.

## Setup realizado en NoteFlow

### Comandos ejecutados

```bash
npx create-expo-app@latest noteflow --template blank-typescript
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

El scaffold se integró en la raíz del repositorio (documentación y reglas de Cursor ya existentes).

### Configuración de Expo Router

- `package.json` → `"main": "expo-router/entry"`
- `app.json` → `"scheme": "noteflow"` y plugin `expo-router`
- Rutas iniciales en `app/_layout.tsx` y `app/index.tsx`

### Estructura de carpetas

```
app/           # Rutas (Expo Router)
components/    # Componentes reutilizables
store/         # Stores Zustand
types/         # Tipos TypeScript
constants/     # Tokens de tema y constantes
docs/          # Documentación del proyecto
assets/        # Iconos e imágenes de Expo
```

### Cómo ejecutar el proyecto

```bash
npm install
npx expo start
```

Luego abrir en Expo Go (desarrollo rápido) o en un Development Build cuando se genere con EAS.

## Sistemas de diseño

### Comparativa: Gluestack UI vs React Native Paper

| Criterio | Gluestack UI | React Native Paper |
|----------|--------------|-------------------|
| Enfoque | Utility-first, muy personalizable (estilo Tailwind) | Material Design 3, componentes listos |
| Curva de aprendizaje | Mayor (tokens, proveedores, a veces NativeWind) | Menor; API estable y documentada |
| Identidad visual | Ideal para marcas muy custom | Coherente Material; personalizable vía tema |
| Android | Buena | Integración Material nativa en Android |
| Productividad en MVP | Más configuración inicial | Pantallas funcionales más rápido |

### Elección en NoteFlow: React Native Paper

Se eligió **React Native Paper** porque NoteFlow es una app de productividad donde la prioridad es claridad, accesibilidad y componentes probados (botones, inputs, chips, barras de progreso) sin montar un sistema de estilos desde cero. La paleta y tipografía propias viven en `constants/theme.ts` y se inyectan en los temas MD3 claro/oscuro, manteniendo identidad sin renunciar a la velocidad de desarrollo.

Gluestack UI sigue siendo una opción válida si en el futuro se requiere un diseño altamente distinto al Material; para la v1, Paper equilibra mejor tiempo y mantenibilidad.

### Tokens y modo claro/oscuro

- **`constants/theme.ts`**: paleta (`palette`), escala tipográfica (`typography`), espaciados (`spacing`) y temas `lightTheme` / `darkTheme` para Paper.
- **`hooks/useAppTheme.ts`**: lee `useColorScheme()` del sistema y devuelve el tema activo.
- **`app/_layout.tsx`**: envuelve la app con `PaperProvider` y ajusta `StatusBar` según el tema.

`app.json` usa `"userInterfaceStyle": "automatic"` para seguir la preferencia del dispositivo.

## Navegación en NoteFlow

### Tabs, Stack y modales

| Patrón | Qué es | Uso en NoteFlow |
|--------|--------|-----------------|
| **Tabs** | Barra inferior; cambia sección sin perder el estado de cada pestaña | Navegación principal: Notas, Tareas, Ideas |
| **Stack** | Pila de pantallas con botón atrás | Dentro de cada pestaña: listado → detalle `[id]` |
| **Modal** | Pantalla superpuesta, suele cerrarse sin consumir la pila del tab | Crear contenido en `nueva-nota.tsx` |

### Rutas implementadas

- `/notas`, `/checklists`, `/ideas` — listados (tabs).
- `/notas/[id]`, `/checklists/[id]`, `/ideas/[id]` — detalle en stack por sección.
- `/nueva-nota` — modal con parámetro `type` (`note` | `checklist` | `idea`).

El layout raíz (`app/_layout.tsx`) es un **Stack** que contiene el grupo `(tabs)` y el modal. Cada tab tiene su propio **Stack** (`notas/_layout.tsx`, etc.) para que el detalle no reemplace las otras pestañas.

`app/index.tsx` redirige a `/notas` como pantalla inicial.

## Referencias

- [Documentación de React Native](https://reactnative.dev/docs/getting-started)
- [Documentación de Expo](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
