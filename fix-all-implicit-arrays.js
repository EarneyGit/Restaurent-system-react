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

// Function to fix a file by adding type annotation
function fixFile(fileInfo) {
  try {
    const { filePath, varName } = fileInfo;
    
    // Read the file
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Determine appropriate type for variable name
    let typeName;
    const lowerVarName = varName.toLowerCase();
    
    // Common naming patterns for types
    if (lowerVarName.includes('transaction')) typeName = 'Transaction[]';
    else if (lowerVarName.includes('order')) typeName = 'Order[]';
    else if (lowerVarName.includes('product')) typeName = 'Product[]';
    else if (lowerVarName.includes('customer')) typeName = 'Customer[]';
    else if (lowerVarName.includes('user')) typeName = 'User[]';
    else if (lowerVarName.includes('payment')) typeName = 'Payment[]';
    else if (lowerVarName.includes('delivery')) typeName = 'Delivery[]';
    else if (lowerVarName.includes('review')) typeName = 'Review[]';
    else if (lowerVarName.includes('bonus')) typeName = 'Bonus[]';
    else if (lowerVarName.includes('item')) typeName = 'Item[]';
    else typeName = 'any[]'; // Default fallback
    
    // Replace the pattern with typed array
    const fixedContent = content.replace(
      new RegExp(`const\\s+${varName}\\s+=\\s+\\[\\]`, 'g'),
      `const ${varName}: ${typeName} = []`
    );
    
    // Write back to file
    fs.writeFileSync(filePath, fixedContent, 'utf-8');
    
    console.log(`Fixed: ${filePath} - Added type ${typeName} to ${varName}`);
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