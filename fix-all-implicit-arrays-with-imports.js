const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to find files with the error pattern
function findFilesWithImplicitArrays() {
  try {
    // Use grep to find all instances of empty arrays
    const grepCommand = "grep -r 'const .* = \\[\\]' --include='*.tsx' --include='*.ts' src/";
    const result = execSync(grepCommand, { encoding: 'utf-8' });
    
    // Process the output to get file paths and lines
    return result.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const [filePath, ...restParts] = line.split(':');
        const codeLine = restParts.join(':').trim();
        
        // Extract the variable name
        const match = codeLine.match(/const\s+(\w+)\s+=\s+\[\]/);
        if (match) {
          return {
            filePath,
            varName: match[1]
          };
        }
        return null;
      })
      .filter(item => item !== null);
  } catch (error) {
    console.error('Error finding files:', error.message);
    return [];
  }
}

// Function to fix a file by adding type annotation and import
function fixFile(fileInfo) {
  try {
    const { filePath, varName } = fileInfo;
    
    // Read the file
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Determine appropriate type for variable name
    let typeName;
    const lowerVarName = varName.toLowerCase();
    
    // Common naming patterns for types
    if (lowerVarName.includes('transaction')) typeName = 'Transaction';
    else if (lowerVarName.includes('order')) typeName = 'Order';
    else if (lowerVarName.includes('product')) typeName = 'Product';
    else if (lowerVarName.includes('customer')) typeName = 'Customer';
    else if (lowerVarName.includes('user')) typeName = 'User';
    else if (lowerVarName.includes('payment')) typeName = 'Payment';
    else if (lowerVarName.includes('delivery')) typeName = 'Delivery';
    else if (lowerVarName.includes('review')) typeName = 'Review';
    else if (lowerVarName.includes('bonus')) typeName = 'Bonus';
    else if (lowerVarName.includes('item')) typeName = 'Item';
    else typeName = ''; // Default fallback
    
    let fixedContent = content;
    
    if (typeName) {
      // Add import statement if not already there
      if (!content.includes(`import { ${typeName} }`)) {
        // Check where to add the import - at the top or after other imports
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
      }
      
      // Replace the pattern with typed array
      fixedContent = fixedContent.replace(
        new RegExp(`const\\s+${varName}\\s+=\\s+\\[\\]`, 'g'),
        `const ${varName}: ${typeName}[] = []`
      );
    } else {
      // Just use any[] for unknown types
      fixedContent = fixedContent.replace(
        new RegExp(`const\\s+${varName}\\s+=\\s+\\[\\]`, 'g'),
        `const ${varName}: any[] = []`
      );
    }
    
    // Write back to file
    fs.writeFileSync(filePath, fixedContent, 'utf-8');
    
    console.log(`Fixed: ${filePath} - Added type ${typeName || 'any'}[] to ${varName}`);
    return true;
  } catch (error) {
    console.error(`Error fixing ${fileInfo.filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('Searching for files with implicit array types...');
const files = findFilesWithImplicitArrays();

if (files.length === 0) {
  console.log('No files with implicit array types found.');
} else {
  console.log(`Found ${files.length} instances of implicit arrays.`);
  
  let fixedCount = 0;
  files.forEach(fileInfo => {
    if (fixFile(fileInfo)) {
      fixedCount++;
    }
  });
  
  console.log(`Fixed ${fixedCount} out of ${files.length} instances.`);
} 