$ErrorActionPreference = "Stop"
Write-Host "SCHEMETA setup helper"
if (-not (Get-Command py -ErrorAction SilentlyContinue)) { throw "Python launcher (py) not found. Install Python 3.11+." }
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw "Node.js not found. Install Node.js LTS." }
Push-Location "$PSScriptRoot\..\backend"
if (-not (Test-Path ".venv")) { py -m venv .venv }
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
if (-not (Test-Path ".env")) { Copy-Item .env.example .env; Write-Warning "Edit backend\.env before starting the API." }
Pop-Location
Push-Location "$PSScriptRoot\..\frontend"
npm install
if (-not (Test-Path ".env")) { Copy-Item .env.example .env }
Pop-Location
Write-Host "Dependencies installed. Configure backend\.env, then run migrations and seed data."
