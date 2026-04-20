#!/bin/bash

# Post-create script for dev container
# Installs dependencies and builds the project

set -e

echo "🚀 Starting post-create setup..."

# Install dependencies and build
echo "📦 Installing dependencies and building project..."
make install && make build

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Authenticate with GitHub: gh auth login"
echo "  2. Authenticate with Copilot: copilot login"
echo "  3. Start development: npm run dev (in api and frontend terminals)"
echo "  4. Open http://localhost:5137 in your browser"
