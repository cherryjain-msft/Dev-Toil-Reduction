#!/usr/bin/env pwsh
# PowerShell script to start the OctoCAT Supply Chain application

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Starting OctoCAT Supply Chain App" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Set location to script directory
Set-Location $PSScriptRoot

# Check if Make is available
$makeExists = Get-Command make -ErrorAction SilentlyContinue

if ($makeExists) {
    Write-Host "Using Make..." -ForegroundColor Green
    make dev
    exit $LASTEXITCODE
}

Write-Host "Make not found. Starting manually..." -ForegroundColor Yellow
Write-Host ""

# Install dependencies if needed
if (-not (Test-Path "api\node_modules")) {
    Write-Host "Installing API dependencies..." -ForegroundColor Yellow
    Set-Location api
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install API dependencies" -ForegroundColor Red
        exit 1
    }
    Set-Location ..
}

if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Installing Frontend dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install Frontend dependencies" -ForegroundColor Red
        exit 1
    }
    Set-Location ..
}

Write-Host ""
Write-Host "Starting servers..." -ForegroundColor Green

# Start API server in new window (includes db:seed:dev)
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\api'; npm run dev"

Start-Sleep -Seconds 2

# Start Frontend server in new window
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\frontend'; npm run dev"

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Servers starting!" -ForegroundColor Green
Write-Host "API: http://localhost:3000" -ForegroundColor White
Write-Host "Frontend: http://localhost:5137" -ForegroundColor White
Write-Host "Swagger Docs: http://localhost:3000/api-docs" -ForegroundColor White
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Close the server windows to stop them." -ForegroundColor Yellow
