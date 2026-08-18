@echo off
REM Quick start script for Windows to run both frontend and backend

echo 🚀 Starting Sandamali Sweet House Admin Panel...
echo.

echo 📦 Installing frontend dependencies...
call npm install

echo 📦 Installing backend dependencies...
cd server
call npm install
cd ..

echo.
echo ✅ Setup complete!
echo.
echo To start the application, open two separate terminals:
echo.
echo Terminal 1 (Frontend):
echo   npm run dev
echo.
echo Terminal 2 (Backend):
echo   cd server
echo   npm run dev
echo.
echo Then open in browser:
echo   http://localhost:5173 (Frontend)
echo   http://localhost:5173/admin (Admin Panel)
echo   http://localhost:5000/api/health (Backend Health Check)
echo.
pause
