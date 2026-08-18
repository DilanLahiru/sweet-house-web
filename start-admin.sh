#!/bin/bash
# Quick start script to run both frontend and backend

echo "🚀 Starting Sandamali Sweet House Admin Panel..."
echo ""

# Check if running on Windows (Git Bash, WSL, etc.)
if [[ "$OSTYPE" == "win32" || "$OSTYPE" == "msys" ]]; then
    echo "📦 Installing dependencies..."
    npm install
    cd server && npm install && cd ..
    
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "To start the application:"
    echo ""
    echo "Terminal 1 (Frontend):"
    echo "  npm run dev"
    echo ""
    echo "Terminal 2 (Backend):"
    echo "  cd server && npm run dev"
    echo ""
    echo "Then open: http://localhost:5173 (Frontend)"
    echo "          http://localhost:3000/admin (Admin Panel)"
else
    # Unix-like systems (Linux, macOS)
    echo "📦 Installing frontend dependencies..."
    npm install
    
    echo "📦 Installing backend dependencies..."
    cd server && npm install && cd ..
    
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "Starting servers..."
    echo ""
    
    # Start backend in background
    cd server && npm run dev &
    BACKEND_PID=$!
    cd ..
    
    # Start frontend
    npm run dev &
    FRONTEND_PID=$!
    
    echo ""
    echo "✅ Both servers are running!"
    echo "   Frontend: http://localhost:5173"
    echo "   Admin Panel: http://localhost:5173/admin"
    echo "   Backend: http://localhost:5000"
    echo ""
    echo "Press Ctrl+C to stop both servers"
    echo ""
    
    # Wait for interruption
    wait
    
    # Cleanup
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
fi
