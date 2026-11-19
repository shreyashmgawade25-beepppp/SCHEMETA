$ErrorActionPreference = "Stop"
Push-Location "$PSScriptRoot\..\backend"
if (-not (Test-Path ".venv\Scripts\python.exe")) { throw "Run scripts\setup.ps1 first." }
if (-not (Test-Path ".env")) { throw "Copy .env.example to .env and configure it first." }
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
Pop-Location
