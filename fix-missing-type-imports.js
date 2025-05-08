const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// List of our custom types
const customTypes = [
  'Transaction',
  'Payment',
  'Order',
  'Product',
  'User',
  'Customer',
  'Delivery',
  'Review',
  'Bonus',
  'Item'
];

// Function to find files that use types without imports
function findFilesWithMissingImports() {
  const results = [];

  // Check for each type
  for (const typeName of customTypes) {
    try {
      // Find files that use the type but don't import it
      const grepCommand = `grep -r '${typeName}\\[\\]' --include='*.tsx' --include='*.ts' src/ | grep -v "import.*${typeName}"`;
      const result = execSync(grepCommand, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
      
      const fileMatches = result.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
          const [filePath] = line.split(':');
          return {
            filePath,
            typeName
          };
        });
      
      results.push(...fileMatches);
    } catch (error) {
      // Grep returns error code if no matches found, which is fine
      continue;
    }
  }

  return results;
}

// Function to fix a file by adding missing import
function fixFile(fileInfo) {
  try {
    const { filePath, typeName } = fileInfo;
    
    // Read the file
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Skip if import already exists
    if (content.includes(`import { ${typeName} }`)) {
      return true;
    }
    
    let fixedContent = content;
    
    // Add import statement
    if (content.includes('import ')) {
      // Find the last import statement
      const importLines = content.split('\n').filter(line => line.trim().startsWith('import '));
      const lastImportLine = importLines[importLines.length - 1];
      const lastImportIndex = content.indexOf(lastImportLine) + lastImportLine.length;
      
      // Insert after the last import
      fixedContent = 
        content.substring(0, lastImportIndex) + 
        `\nimport { ${typeName} } from '@/types';` + 
        content.substring(lastImportIndex);
    } else {
      // No imports yet, add at the top
      fixedContent = `import { ${typeName} } from '@/types';\n\n${content}`;
    }
    
    // Write back to file
    fs.writeFileSync(filePath, fixedContent, 'utf-8');
    
    console.log(`Fixed: ${filePath} - Added import for ${typeName}`);
    return true;
  } catch (error) {
    console.error(`Error fixing ${fileInfo.filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('Searching for files with missing type imports...');
const files = findFilesWithMissingImports();

if (files.length === 0) {
  console.log('No files with missing type imports found.');
} else {
  console.log(`Found ${files.length} instances of missing type imports.`);
  
  let fixedCount = 0;
  files.forEach(fileInfo => {
    if (fixFile(fileInfo)) {
      fixedCount++;
    }
  });
  
  console.log(`Fixed ${fixedCount} out of ${files.length} instances.`);
} 