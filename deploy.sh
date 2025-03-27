#!/bin/bash

# Run the build command
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
  echo "Build succeeded, running file copy script..."
  
  # Run the copy-cname.js script to copy all needed files
  node copy-cname.js
  
  echo "The website is now ready for deployment."
else
  echo "Build failed, aborting deployment preparation."
fi