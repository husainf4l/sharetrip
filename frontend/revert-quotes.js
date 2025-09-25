#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript/JSX files
function findFiles(dir, extensions = ['.ts', '.tsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (!['node_modules', '.next', '.git'].includes(file)) {
        results = results.concat(findFiles(filePath, extensions));
      }
    } else {
      if (extensions.some(ext => file.endsWith(ext))) {
        results.push(filePath);
      }
    }
  });
  
  return results;
}

// Function to revert the over-aggressive quote replacement
function revertCodeQuotes(content) {
  // Revert quotes in JavaScript/TypeScript code contexts
  content = content.replace(/case &quot;([^&]+)&quot;:/g, 'case "$1":');
  content = content.replace(/: &quot;([^&]*)&quot;,/g, ': "$1",');
  content = content.replace(/= &quot;([^&]*)&quot;/g, '= "$1"');
  content = content.replace(/&quot;([^&]+)&quot;:/g, '"$1":');
  content = content.replace(/href=&quot;([^&]+)&quot;/g, 'href="$1"');
  content = content.replace(/className=&quot;([^&]+)&quot;/g, 'className="$1"');
  content = content.replace(/id=&quot;([^&]+)&quot;/g, 'id="$1"');
  content = content.replace(/key=&quot;([^&]+)&quot;/g, 'key="$1"');
  content = content.replace(/type=&quot;([^&]+)&quot;/g, 'type="$1"');
  content = content.replace(/placeholder=&quot;([^&]+)&quot;/g, 'placeholder="$1"');
  content = content.replace(/value=&quot;([^&]+)&quot;/g, 'value="$1"');
  content = content.replace(/name=&quot;([^&]+)&quot;/g, 'name="$1"');
  content = content.replace(/src=&quot;([^&]+)&quot;/g, 'src="$1"');
  content = content.replace(/alt=&quot;([^&]+)&quot;/g, 'alt="$1"');
  
  // Revert in object properties and strings
  content = content.replace(/&quot;([a-zA-Z_$][a-zA-Z0-9_$]*)&quot;:/g, '"$1":');
  content = content.replace(/import.*&quot;([^&]+)&quot;/g, (match) => match.replace(/&quot;/g, '"'));
  content = content.replace(/from &quot;([^&]+)&quot;/g, 'from "$1"');
  
  return content;
}

// Main function to process files
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    const originalContent = content;
    
    // Apply fixes
    content = revertCodeQuotes(content);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      changed = true;
    }
    
    return changed;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Run the script
function main() {
  const srcDir = path.join(__dirname, 'src');
  const files = findFiles(srcDir);
  
  console.log(`Found ${files.length} TypeScript/JSX files to revert...`);
  
  let processedCount = 0;
  let changedCount = 0;
  
  files.forEach(file => {
    const changed = processFile(file);
    processedCount++;
    if (changed) {
      changedCount++;
      console.log(`Reverted: ${path.relative(__dirname, file)}`);
    }
  });
  
  console.log(`\nProcessed ${processedCount} files, modified ${changedCount} files.`);
}

if (require.main === module) {
  main();
}

module.exports = { revertCodeQuotes, processFile };
