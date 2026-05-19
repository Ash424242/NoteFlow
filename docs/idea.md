# NoteFlow — Definición de la idea

## Problema que resuelve

Muchas personas reparten su productividad entre varias apps: una para notas largas, otra para listas de tareas y otra para ideas rápidas o inspiración. Eso genera fricción al cambiar de contexto, duplicar información y perder el hilo de lo importante.

**NoteFlow** centraliza tres formas de capturar y organizar información —notas de texto, listas de tareas e ideas con etiquetas— en una sola aplicación móvil, con acceso rápido desde pestañas dedicadas y persistencia local en el dispositivo. El usuario puede anotar, planificar y guardar ideas sin salir de la app ni depender de conexión constante.

## Usuario objetivo

**Perfil:** Personas que gestionan su día a día de forma personal o profesional ligera: estudiantes, freelancers, trabajadores del conocimiento y cualquier usuario que valore capturar información al momento sin una curva de aprendizaje alta.

**Uso en el día a día:**

- Por la mañana, revisar o crear listas de tareas (checklists) para el día.
- Durante reuniones o clases, abrir la pestaña de notas y escribir apuntes con título y contenido.
- En momentos espontáneos, registrar una idea en la pestaña de ideas, asignar etiquetas y un color para localizarla después.
- Al cerrar la app, los datos permanecen en el dispositivo gracias a la persistencia local.

La app prioriza velocidad de captura, claridad visual entre tipos de contenido y navegación simple por pestañas.

## Funcionalidades principales (primera versión)

1. **Tres tipos de contenido**
   - Notas de texto (título + contenido).
   - Listas de tareas con ítems marcables y progreso visual.
   - Ideas con etiquetas y color de fondo distintivo.

2. **Navegación por pestañas**
   - Secciones: Notas, Tareas (checklists) e Ideas.
   - Pantallas de detalle por elemento y ruta modal para crear contenido nuevo.

3. **Listados de alto rendimiento**
   - Tarjetas diferenciadas por tipo (NoteCard, ChecklistCard, IdeaCard) en listas con FlashList.

4. **Estado global y persistencia**
   - Zustand para notas, checklists e ideas.
   - AsyncStorage para conservar datos al cerrar y reabrir la app.

5. **Formularios y validación**
   - Formulario adaptable al tipo de contenido con validación Zod y manejo del teclado.

6. **Experiencia de uso**
   - Tema claro y oscuro según el sistema.
   - Feedback háptico en acciones clave, confirmación al eliminar y estados vacíos por pestaña.

7. **Documentación técnica**
   - Fundamentos de React Native, decisiones de diseño y arquitectura en `docs/`.

## Funcionalidades opcionales (futuras)

- Búsqueda global en tiempo real en la cabecera de cada pestaña.
- Animaciones de entrada y salida en tarjetas (Reanimated).
- Archivar notas en lugar de eliminarlas, con pestaña de archivados.
- Sincronización en la nube y copia de seguridad.
- Recordatorios y notificaciones push para tareas o ideas.
- Adjuntos (imágenes, enlaces) en notas.
- Carpetas o proyectos para agrupar contenido.
- Widgets de inicio rápido en el sistema operativo.
- Autenticación y multi-dispositivo.
- Exportación (PDF, Markdown) y compartir contenido.

## Stack previsto

React Native, Expo SDK, TypeScript, Expo Router, librería UI (Gluestack UI o React Native Paper), Shopify FlashList, Zustand y AsyncStorage.
