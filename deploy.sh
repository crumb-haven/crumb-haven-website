#!/bin/bash

# Run the build command
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
  echo "Build succeeded, copying configuration files..."
  
  # Copy CNAME file to the dist folder
  cp CNAME dist/
  cp CNAME dist/public/
  
  # Copy _redirects file to the dist folder
  cp public/_redirects dist/
  cp public/_redirects dist/public/
  
  # Copy root index.html for domain configuration
  cp index.html dist/
  
  # Copy netlify.toml for configuration
  cp netlify.toml dist/
  cp netlify.toml dist/public/
  
  echo "Configuration files copied successfully!"
  echo "The website is now ready for deployment."
else
  echo "Build failed, aborting file copy."
fi