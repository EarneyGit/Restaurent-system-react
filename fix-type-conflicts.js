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

// Function to find files that have both imports and local definitions
function findFilesWithTypeConflicts() {
  const results = [];

  for (const typeName of customTypes) {
    try {
      // Find files that import the type AND define it locally
      const grepCommand = `grep -l "import.*${typeName}" --include='*.tsx' --include='*.ts' src/ | xargs grep -l "interface ${typeName}"`;
      const result = execSync(grepCommand, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
      
      const fileMatches = result.split('\n')
        .filter(line => line.trim() !== '')
        .map(filePath => {
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

// Function to fix a file by removing local type definition
function fixFile(fileInfo) {
  try {
    const { filePath, typeName } = fileInfo;
    
    // Read the file
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract and remove the local interface definition
    const interfaceRegex = new RegExp(`(//[^\\n]*\\n)?[\\s\\n]*interface\\s+${typeName}\\s+\\{[^}]*\\}`, 'g');
    const fixedContent = content.replace(interfaceRegex, '');
    
    // Write back to file
    fs.writeFileSync(filePath, fixedContent, 'utf-8');
    
    console.log(`Fixed: ${filePath} - Removed local interface definition for ${typeName}`);
    return true;
  } catch (error) {
    console.error(`Error fixing ${fileInfo.filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('Searching for files with type conflicts...');
const files = findFilesWithTypeConflicts();

if (files.length === 0) {
  console.log('No files with type conflicts found.');
} else {
  console.log(`Found ${files.length} instances of type conflicts.`);
  
  let fixedCount = 0;
  files.forEach(fileInfo => {
    if (fixFile(fileInfo)) {
      fixedCount++;
    }
  });
  
  console.log(`Fixed ${fixedCount} out of ${files.length} instances.`);
} 