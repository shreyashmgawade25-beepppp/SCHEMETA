$ErrorActionPreference = "Stop"
Push-Location "$PSScriptRoot\..\backend"
.\.venv\Scripts\python.exe -m app.seed
Pop-Location
