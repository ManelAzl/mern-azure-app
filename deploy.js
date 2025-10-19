const fs = require('fs-extra');
const { execSync } = require('child_process');
const path = require('path');

console.log('Starting deployment preparation...');

try {
  // Build React app directly without npm scripts
  console.log('Building React app...');
  const reactBuildCommand = process.platform === 'win32' 
    ? 'npm.cmd run build' 
    : 'npm run build';
  
  execSync(reactBuildCommand, { 
    cwd: path.join(__dirname, 'client'), 
    stdio: 'inherit' 
  });

  // Copy build to server public directory
  console.log('Copying build files...');
  fs.ensureDirSync('./server/public');
  fs.copySync('./client/build', './server/public');

  console.log('✅ Deployment preparation completed!');
  console.log('📁 React build copied to server/public/');
} catch (error) {
  console.error('❌ Deployment preparation failed:', error);
  process.exit(1);
}