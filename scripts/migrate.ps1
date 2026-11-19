$ErrorActionPreference = "Stop"
Push-Location "$PSScriptRoot\..\backend"
.\.venv\Scripts\python.exe -m alembic upgrade head
Pop-Location
