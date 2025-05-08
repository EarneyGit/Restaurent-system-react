const fs = require('fs');
const path = require('path');

const orderComponents = [
  'src/components/order/dine-in-orders.tsx',
  'src/components/order/pickup-orders.tsx',
  'src/components/order/scheduled-orders.tsx',
  'src/components/order/delivery-orders.tsx'
];

function fixOrderComponent(filePath) {
  console.log(`Fixing ${filePath}...`);
  
  // Read the file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add BoardViewProps interface if not present
  if (!content.includes('BoardViewProps')) {
    // Find the BoardView function definition
    const boardViewRegex = /function BoardView\(\{[^}]*\}\)/;
    const match = content.match(boardViewRegex);
    
    if (match) {
      // Replace the BoardView function with typed version
      content = content.replace(
        boardViewRegex,
        `function BoardView({ orders, getStatusBadge, getStatusColor }: { orders: any[], getStatusBadge: (status: string) => JSX.Element, getStatusColor: (status: string) => string })`
      );
      
      // Fix the reduce function to use proper typing
      content = content.replace(
        /\}, \{\}\);/,
        '}, {} as Record<string, any[]>);'
      );
      
      // Fix map function to type order parameter
      content = content.replace(
        /(\{groupedOrders\[[^\]]+\]\?\.map\()\(order\)(\s*=>)/g,
        '$1(order: any)$2'
      );
      
      // Fix other map function to type order parameter
      content = content.replace(
        /(\{orders\.map\()\(order\)(\s*=>)/g,
        '$1(order: any)$2'
      );
      
      // Fix getColumnColor function if it exists
      content = content.replace(
        /const getColumnColor = \(status\) =>/g,
        'const getColumnColor = (status: string) =>'
      );
    }
  }
  
  // Write the modified content back to file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${filePath}`);
}

// Process each file
orderComponents.forEach(fixOrderComponent);

console.log('All order components fixed!'); 