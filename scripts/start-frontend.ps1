$ErrorActionPreference = "Stop"
Push-Location "$PSScriptRoot\..\frontend"
if (-not (Test-Path "node_modules")) { npm install }
npm run dev
Pop-Location
