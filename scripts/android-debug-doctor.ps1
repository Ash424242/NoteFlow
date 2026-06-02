param(
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

  throw "No se encontró adb.exe. Configura ANDROID_HOME/ANDROID_SDK_ROOT."
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$adb = Resolve-AdbPath

Write-Host "== Android Debug Doctor =="
Write-Host "adb: $adb"
Write-Host ""

& $adb start-server | Out-Null
$devices = & $adb devices -l
Write-Host "Dispositivos:"
Write-Host $devices
Write-Host ""

$metroRunning = $false
try {
  $conn = Get-NetTCPConnection -State Listen -LocalPort 8081 -ErrorAction Stop
  if ($conn) { $metroRunning = $true }
}
catch {}

if ($metroRunning) {
  Write-Host "✅ Metro detectado escuchando en puerto 8081."
} else {
  Write-Warning "❌ Metro no está levantado en puerto 8081."
  Write-Host "Ejecuta: npm run start:dev-client"
}

if ($DeviceSerial) {
  Write-Host ""
  Write-Host "Aplicando adb reverse en dispositivo: $DeviceSerial"
  & $adb -s $DeviceSerial reverse tcp:8081 tcp:8081
  & $adb -s $DeviceSerial reverse --list
} else {
  Write-Host ""
  Write-Host "Tip: ejecuta"
  Write-Host "  npm run android:debug:prepare"
  Write-Host "para reiniciar ADB y aplicar adb reverse a todos los dispositivos online."
}
