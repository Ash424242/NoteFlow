param(
  [switch]$SkipMetro,
  [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$prepareScript = Join-Path $PSScriptRoot "android-debug-prepare.ps1"

if (-not (Test-Path $prepareScript)) {
  throw "No se encontró el script android-debug-prepare.ps1"
}

if (-not $SkipMetro) {
  Write-Host "Iniciando Metro (dev-client) en una nueva ventana..."
  $metroCommand = "cd `"$repoRoot`"; npm run start:dev-client"
  Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-ExecutionPolicy", "Bypass",
    "-Command", $metroCommand
  ) | Out-Null
  Start-Sleep -Seconds 3
}

if ($SkipInstall) {
  Write-Host "Preparando ADB/reverse sin instalación..."
  & powershell -ExecutionPolicy Bypass -File $prepareScript
} else {
  Write-Host "Preparando ADB/reverse e instalando app debug..."
  & powershell -ExecutionPolicy Bypass -File $prepareScript -InstallApp
}

Write-Host ""
Write-Host "✅ Entorno listo."
Write-Host "Ahora solo abre Android Studio y pulsa Run/Debug en tu dispositivo físico."
