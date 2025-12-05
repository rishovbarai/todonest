#!/bin/bash

# Deploy Backend to Render
# This script helps deploy your NestJS backend to Render without requiring a Git repository

echo "🚀 Deploying Backend to Render..."

# Check if Render CLI is installed
if ! command -v render &> /dev/null; then
    echo "📦 Installing Render CLI..."
    npm install -g render-cli
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Render CLI. Please install manually:"
        echo "   npm install -g render-cli"
        echo "   or"
        echo "   brew install render"
        exit 1
    fi
fi

# Navigate to backend directory
cd "$(dirname "$0")"

# Check if user is logged in
echo "🔐 Checking Render authentication..."
render whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "🔑 Please login to Render..."
    render login
fi

# Deploy
echo "📤 Deploying to Render..."
render deploy

if [ $? -eq 0 ]; then
    echo "✅ Deployment initiated successfully!"
    echo "📊 Check your Render dashboard for deployment status:"
    echo "   https://dashboard.render.com"
    echo ""
    echo "⚠️  Don't forget to set environment variables in Render dashboard:"
    echo "   - SUPABASE_URL"
    echo "   - SUPABASE_ANON_KEY"
    echo "   - NODE_ENV=production"
else
    echo "❌ Deployment failed. Check the error messages above."
    exit 1
fi

