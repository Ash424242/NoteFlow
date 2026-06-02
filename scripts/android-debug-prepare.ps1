param(
  [switch]$InstallApp,
  [string]$DeviceSerial
)

$ErrorActionPreference = "Stop"

function Resolve-AdbPath {
  if ($env:ANDROID_HOME) {
    $candidate = Join-Path $env:ANDROID_HOME "platform-tools\adb.exe"
    if (Test-Path $candidate) { return $candidate }
  }

  if ($env:ANDROID_SDK_ROOT) {
    $candidate = Join-Path $env:ANDROID_SDK_ROOT "platform-tools\adb.exe"
    if (Test-Path $candidate) { return $candidate }
  }

  $defaultSdk = Join-Path $env:LOCALAPPDATA "Android\Sdk\platform-tools\adb.exe"
  if (Test-Path $defaultSdk) { return $defaultSdk }

  throw "No se encontró adb.exe. Configura ANDROID_HOME/ANDROID_SDK_ROOT o instala Android SDK Platform-Tools."
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$androidDir = Join-Path $repoRoot "android"
$adb = Resolve-AdbPath

Write-Host "Usando adb en: $adb"

& $adb kill-server | Out-Null
& $adb start-server | Out-Null

function Get-DevicesByState {
  $deviceOutput = & $adb devices
  $lines = @($deviceOutput | Select-Object -Skip 1 | Where-Object { $_.Trim() -ne "" })
  $online = @()
  $offline = @()
  $unauthorized = @()

  foreach ($line in $lines) {
    $parts = $line -split "`t"
    if ($parts.Length -lt 2) { continue }
    $serial = $parts[0].Trim()
    $state = $parts[1].Trim()
    switch ($state) {
      "device" { $online += $serial }
      "offline" { $offline += $serial }
      "unauthorized" { $unauthorized += $serial }
    }
  }

  return @{
    Output = $deviceOutput
    Online = $online
    Offline = $offline
    Unauthorized = $unauthorized
  }
}

 $snapshot = $null
 for ($i = 0; $i -lt 6; $i++) {
   $snapshot = Get-DevicesByState
   if ($snapshot.Online.Count -gt 0) { break }
   Start-Sleep -Seconds 2
 }

$deviceOutput = $snapshot.Output
$onlineDevices = $snapshot.Online
$offlineDevices = $snapshot.Offline
$unauthorizedDevices = $snapshot.Unauthorized

if ($offlineDevices.Count -gt 0) {
  Write-Warning "Dispositivos offline detectados: $($offlineDevices -join ', ')"
  Write-Host "Tip: cierra emuladores muertos o reinicia ADB y reconecta el USB."
}

if ($unauthorizedDevices.Count -gt 0) {
  Write-Warning "Dispositivos unauthorized: $($unauthorizedDevices -join ', ')"
  Write-Host "Tip: acepta el diálogo RSA en el teléfono y vuelve a ejecutar el script."
}

if ($onlineDevices.Count -eq 0) {
  Write-Warning "No hay dispositivos en estado 'device'. Conecta el móvil y acepta la huella RSA."
  Write-Host ""
  Write-Host $deviceOutput
  exit 1
}

if ($DeviceSerial) {
  if ($onlineDevices -notcontains $DeviceSerial) {
    throw "El dispositivo '$DeviceSerial' no está online. Disponibles: $($onlineDevices -join ', ')"
  }
  Write-Host "Dispositivo objetivo: $DeviceSerial"
  & $adb -s $DeviceSerial reverse tcp:8081 tcp:8081
  Write-Host "✅ adb reverse configurado en $DeviceSerial"
} else {
  if ($onlineDevices.Count -gt 1) {
    Write-Warning "Hay varios dispositivos online: $($onlineDevices -join ', ')"
    Write-Host "Se aplicará adb reverse en TODOS los dispositivos online."
  }
  foreach ($serial in $onlineDevices) {
    & $adb -s $serial reverse tcp:8081 tcp:8081
    Write-Host "✅ adb reverse configurado en $serial"
  }
}

if ($InstallApp) {
  if (-not (Test-Path $androidDir)) {
    throw "No existe carpeta android/. Ejecuta 'npx expo prebuild --platform android' primero."
  }

  Write-Host "Instalando app debug en el dispositivo..."
  Push-Location $androidDir
  try {
    & ".\gradlew.bat" :app:installDebug
  }
  finally {
    Pop-Location
  }
}

Write-Host ""
Write-Host "Siguiente paso recomendado:"
Write-Host "1) npx expo start --dev-client"
Write-Host "2) Ejecutar la app desde Android Studio (Run/Debug) en el dispositivo físico"
