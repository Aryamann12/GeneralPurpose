# ConnectNest Environment Setup Script
# This script creates the necessary .env files for your application

Write-Host "🔧 Setting up ConnectNest environment files..." -ForegroundColor Cyan
Write-Host ""

# Create server .env file
$serverEnvContent = @"
PORT=4000
MONGODB_URI=mongodb+srv://aryamatomar:iSo9H2oZrdn6WlVV@jstraining.buufn0n.mongodb.net/?retryWrites=true&w=majority&appName=JSTraining
MONGODB_USERNAME=aryamatomar
MONGODB_PASSWORD=iSo9H2oZrdn6WlVV
MONGODB_HOST=jstraining.buufn0n.mongodb.net
"@

# Create client .env file
$clientEnvContent = @"
VITE_API_BASE_URL=http://localhost:4000
"@

# Write server .env
try {
    Set-Content -Path "server\.env" -Value $serverEnvContent -NoNewline
    Write-Host "✅ Created server\.env" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to create server\.env: $_" -ForegroundColor Red
}

# Write client .env
try {
    Set-Content -Path "client\.env" -Value $clientEnvContent -NoNewline
    Write-Host "✅ Created client\.env" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to create client\.env: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "⚠️  SECURITY WARNING!" -ForegroundColor Yellow
Write-Host "Your MongoDB credentials are currently exposed in configuration.txt" -ForegroundColor Yellow
Write-Host "Please delete this file immediately:" -ForegroundColor Yellow
Write-Host "  Remove-Item configuration.txt" -ForegroundColor White
Write-Host ""
Write-Host "🔒 Consider rotating your MongoDB credentials since they were in plaintext" -ForegroundColor Yellow
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Delete configuration.txt" -ForegroundColor White
Write-Host "  2. Open Terminal 1 and run:" -ForegroundColor White
Write-Host "     cd server" -ForegroundColor Gray
Write-Host "     npm install" -ForegroundColor Gray
Write-Host "     npm run start:dev" -ForegroundColor Gray
Write-Host ""
Write-Host "  3. Open Terminal 2 and run:" -ForegroundColor White
Write-Host "     cd client" -ForegroundColor Gray
Write-Host "     npm install" -ForegroundColor Gray
Write-Host "     npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "  4. Open browser to http://localhost:5173" -ForegroundColor White
Write-Host ""

