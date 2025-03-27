// Simple script to copy CNAME file to dist folder
const fs = require('fs');
const path = require('path');

// Define paths
const sourcePath = path.join(__dirname, 'CNAME');
const destPath = path.join(__dirname, 'dist', 'CNAME');
const destPublicPath = path.join(__dirname, 'dist', 'public', 'CNAME');

// Check if CNAME file exists
if (fs.existsSync(sourcePath)) {
  try {
    // Create dist directory if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, 'dist'))) {
      fs.mkdirSync(path.join(__dirname, 'dist'));
    }
    
    // Copy CNAME to dist folder
    fs.copyFileSync(sourcePath, destPath);
    console.log('Successfully copied CNAME to dist folder');
    
    // Copy CNAME to dist/public folder too to be safe
    fs.copyFileSync(sourcePath, destPublicPath);
    console.log('Successfully copied CNAME to dist/public folder');
  } catch (err) {
    console.error('Error copying CNAME file:', err);
  }
} else {
  console.log('CNAME file not found');
}