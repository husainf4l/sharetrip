#!/usr/bin/env node

const fs = require('fs');

// Function to fix TypeScript unknown errors in tour.service.ts
function fixTourServiceTypes() {
  const filePath = './src/services/tour.service.ts';
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add a helper function at the top of the class
  const helperFunction = `
  private getErrorMessage(errorData: unknown): string {
    if (errorData && typeof errorData === 'object') {
      if ('error' in errorData) {
        return (errorData as any).error;
      }
      if ('message' in errorData) {
        return (errorData as any).message;
      }
    }
    return 'Unknown error';
  }
`;

  // Insert the helper function after the class declaration
  content = content.replace(
    /class TourService \{/,
    `class TourService {${helperFunction}`
  );

  // Replace all instances of errorData.error || errorData.message with helper function call
  content = content.replace(
    /errorData\.error \|\| errorData\.message/g,
    'this.getErrorMessage(errorData)'
  );
  
  fs.writeFileSync(filePath, content);
  console.log('Fixed TypeScript errors in tour.service.ts');
}

fixTourServiceTypes();
