@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Instale o Node.js 22.13 ou posterior para abrir o painel.
  pause
  exit /b 1
)
echo Abra http://localhost:3017 no navegador e mantenha este terminal aberto.
node local.mjs
pause
