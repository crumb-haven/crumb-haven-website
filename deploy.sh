#!/bin/bash
set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Starting deployment preparation for Crumb Haven website"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Function for error handling
handle_error() {
  echo "❌ Error: Deployment preparation failed at step: $1"
  exit 1
}

# Step 1: Build the project
echo "📦 Building the project..."
npm run build || handle_error "Building the project"

# Step 2: Run the file copy script
echo "📄 Copying configuration files..."
node copy-cname.js || handle_error "Copying configuration files"

# Step 3: Verify deployment files exist
echo "✅ Verifying deployment files..."
if [ -f "dist/public/_redirects" ] && [ -f "dist/public/CNAME" ] && [ -f "dist/public/netlify.toml" ]; then
  echo "   All required files are in place."
else
  handle_error "Verifying required files"
fi

# Success message
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Deployment preparation completed successfully!"
echo "📂 The website is now ready in the 'dist/public' directory."
echo ""
echo "🌎 To deploy to Netlify, you can:"
echo "   1. Push to your GitHub repository (if using GitHub Actions)"
echo "   2. Run: netlify deploy --prod (if using Netlify CLI)"
echo "   3. Upload the 'dist/public' directory via the Netlify UI"
echo ""
echo "📘 For detailed instructions, see NETLIFY_DEPLOYMENT.md"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"