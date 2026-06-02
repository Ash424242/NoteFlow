# Ejecutar en dispositivo Android con Android Studio + Gradle

Guía para compilar y ejecutar NoteFlow como app nativa Android (debug) en un teléfono físico.

## 1) Requisitos

- Android Studio (con Android SDK instalado)
- Java/JDK (el que gestiona Android Studio suele ser suficiente)
- Node.js LTS + npm
- Cable USB para conectar el dispositivo

## 2) Preparar el proyecto

Desde la raíz del repo:

```bash
npm install
```

El proyecto ya incluye carpeta nativa `android/` generada con Expo Prebuild.

## 3) Configurar SDK para Gradle

Gradle necesita saber dónde está tu Android SDK. Crea este archivo:

`android/local.properties`

Con contenido similar (ajusta la ruta):

```properties
sdk.dir=C:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk
```

> Nota: `local.properties` no se versiona.

## 4) Activar depuración USB en el teléfono

1. Activa opciones de desarrollador.
2. Activa **Depuración USB**.
3. Conecta el teléfono por USB y acepta la huella RSA.
4. Verifica conexión:

```bash
adb devices
```

Debe aparecer tu dispositivo como `device`.

## 5) Ejecutar desde Android Studio

1. Abre Android Studio.
2. Selecciona **Open** y elige la carpeta `android/`.
3. Espera a que sincronice Gradle.
4. Selecciona tu teléfono como dispositivo de ejecución.
5. Ejecuta la app (`Run app`).

## 6) Ejecutar por terminal con Gradle + Expo run

Desde la raíz del repo:

```bash
npm run android:device
```

Esto compila e instala en el dispositivo conectado.

Si quieres construir APK debug directamente con Gradle:

```bash
cd android
gradlew.bat :app:assembleDebug
```

## 7) Problemas comunes

- **SDK location not found**
  - Revisa `android/local.properties` o variable `ANDROID_HOME`.
- **No devices/emulators found**
  - Revisa `adb devices`, cable/driver USB y permisos.
- **Build cache corrupta**
  - En `android/`: `gradlew.bat clean` y vuelve a ejecutar.
