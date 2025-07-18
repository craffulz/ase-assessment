@echo off
REM -----------------------------------------------------
REM Inicia Cloud SQL Proxy para PostgreSQL en Google Cloud
REM -----------------------------------------------------

set INSTANCE_NAME=stellar-verve-465415-d0:europe-southwest1:gc-1st
set PROXY_PATH=proxy\cloud-sql-proxy.exe

echo.
echo [1/2] Verificando proxy...
if not exist "%PROXY_PATH%" (
    echo ❌ ERROR: No se encontró cloud-sql-proxy.exe en la carpeta proxy
    pause
    exit /b 1
)

echo [2/2] Iniciando proxy para PostgreSQL...
echo Instancia: %INSTANCE_NAME%
echo.

start "Cloud SQL Proxy" cmd /c "%PROXY_PATH%" %INSTANCE_NAME% --port 5434