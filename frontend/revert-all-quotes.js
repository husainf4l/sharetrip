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

// Function to revert all &quot; back to regular quotes for now
function revertAllQuotes(content) {
  // Revert all HTML entities back to normal characters
  content = content.replace(/&quot;/g, '"');
  content = content.replace(/&apos;/g, "'");
  content = content.replace(/&#34;/g, '"');
  content = content.replace(/&#39;/g, "'");
  
  return content;
}

// Main function to process files
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    const originalContent = content;
    
    // Apply fixes
    content = revertAllQuotes(content);
    
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

module.exports = { revertAllQuotes, processFile };
