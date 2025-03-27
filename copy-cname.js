// Script to copy necessary files for Netlify deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define file paths
const files = [
  {
    name: 'CNAME',
    source: path.join(__dirname, 'CNAME'),
    destinations: [
      path.join(__dirname, 'dist', 'CNAME'),
      path.join(__dirname, 'dist', 'public', 'CNAME')
    ]
  },
  {
    name: '_redirects',
    source: path.join(__dirname, 'public', '_redirects'),
    destinations: [
      path.join(__dirname, 'dist', '_redirects'),
      path.join(__dirname, 'dist', 'public', '_redirects')
    ]
  },
  {
    name: 'netlify.toml',
    source: path.join(__dirname, 'netlify.toml'),
    destinations: [
      path.join(__dirname, 'dist', 'netlify.toml'),
      path.join(__dirname, 'dist', 'public', 'netlify.toml')
    ]
  },
  {
    name: 'netlify.json',
    source: path.join(__dirname, 'netlify.json'),
    destinations: [
      path.join(__dirname, 'dist', 'netlify.json'),
      path.join(__dirname, 'dist', 'public', 'netlify.json')
    ]
  }
];

// Make sure dist directories exist
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}

if (!fs.existsSync(path.join(__dirname, 'dist', 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'dist', 'public'));
}

// Copy each file
files.forEach(file => {
  if (fs.existsSync(file.source)) {
    try {
      file.destinations.forEach(destination => {
        fs.copyFileSync(file.source, destination);
        console.log(`Successfully copied ${file.name} to ${destination}`);
      });
    } catch (err) {
      console.error(`Error copying ${file.name} file:`, err);
    }
  } else {
    console.log(`${file.name} file not found at ${file.source}`);
  }
});

// Create a special _redirects file with SPA redirect rule
const redirectsContent = '/* /index.html 200';
const redirectsPath = path.join(__dirname, 'dist', 'public', '_redirects');

try {
  fs.writeFileSync(redirectsPath, redirectsContent);
  console.log('Created _redirects file with SPA redirect rule in dist/public');
} catch (err) {
  console.error('Error creating _redirects file:', err);
}