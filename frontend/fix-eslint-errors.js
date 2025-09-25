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

// Function to fix unescaped entities
function fixUnescapedEntities(content) {
  // Fix unescaped single quotes in JSX text content
  // This regex looks for single quotes that are not inside HTML attributes
  content = content.replace(
    />([\s\S]*?)</g,
    (match, textContent) => {
      const fixed = textContent.replace(/'/g, '&apos;').replace(/"/g, '&quot;');
      return `>${fixed}<`;
    }
  );
  
  // Fix common cases in JSX attributes and text
  content = content.replace(/don't/g, 'don&apos;t');
  content = content.replace(/won't/g, 'won&apos;t');
  content = content.replace(/can't/g, 'can&apos;t');
  content = content.replace(/isn't/g, 'isn&apos;t');
  content = content.replace(/doesn't/g, 'doesn&apos;t');
  content = content.replace(/you're/g, 'you&apos;re');
  content = content.replace(/we're/g, 'we&apos;re');
  content = content.replace(/they're/g, 'they&apos;re');
  content = content.replace(/I've/g, 'I&apos;ve');
  content = content.replace(/What's/g, 'What&apos;s');
  content = content.replace(/That's/g, 'That&apos;s');
  content = content.replace(/It's/g, 'It&apos;s');
  
  return content;
}

// Function to remove unused imports
function removeUnusedImports(content) {
  // This is a simple approach - in a real scenario, you'd want more sophisticated AST parsing
  const lines = content.split('\n');
  const usedImports = new Set();
  
  // Find all used identifiers in the code
  lines.forEach(line => {
    if (!line.trim().startsWith('import ') && !line.trim().startsWith('//')) {
      // Extract identifiers that might be React components or functions
      const matches = line.match(/\b[A-Z][a-zA-Z0-9]*\b/g);
      if (matches) {
        matches.forEach(match => usedImports.add(match));
      }
    }
  });
  
  // Remove unused imports (basic approach)
  return lines.filter(line => {
    if (line.trim().startsWith('import ')) {
      // Check if any of the imported items are used
      const importMatch = line.match(/import\s+{([^}]+)}/);
      if (importMatch) {
        const imports = importMatch[1].split(',').map(s => s.trim());
        const usedInThisImport = imports.some(imp => usedImports.has(imp));
        return usedInThisImport;
      }
      return true; // Keep default imports and other import types
    }
    return true;
  }).join('\n');
}

// Function to fix TypeScript any types
function fixAnyTypes(content) {
  // Replace explicit any with unknown (safer) or appropriate types
  content = content.replace(/:\s*any\b/g, ': unknown');
  content = content.replace(/:\s*any\[\]/g, ': unknown[]');
  
  return content;
}

// Main function to process files
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    const originalContent = content;
    
    // Apply fixes
    content = fixUnescapedEntities(content);
    content = fixAnyTypes(content);
    
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
  
  console.log(`Found ${files.length} TypeScript/JSX files to process...`);
  
  let processedCount = 0;
  let changedCount = 0;
  
  files.forEach(file => {
    const changed = processFile(file);
    processedCount++;
    if (changed) {
      changedCount++;
      console.log(`Fixed: ${path.relative(__dirname, file)}`);
    }
  });
  
  console.log(`\nProcessed ${processedCount} files, modified ${changedCount} files.`);
}

if (require.main === module) {
  main();
}

module.exports = { fixUnescapedEntities, fixAnyTypes, processFile };
