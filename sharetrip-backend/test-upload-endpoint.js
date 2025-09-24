const fs = require('fs');
const path = require('path');

async function testUploadEndpoint() {
  try {
    // Wait for server to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create a simple test file
    const testFilePath = path.join(__dirname, 'test-image.txt');
    fs.writeFileSync(testFilePath, 'This is a test image file content');

    // Test the upload endpoint
    const FormData = require('form-data');
    const form = new FormData();
    form.append('files', fs.createReadStream(testFilePath), 'test-image.jpg');
    form.append('folder', 'test-uploads');

    const fetch = require('node-fetch');
    const response = await fetch('http://localhost:3333/api/upload', {
      method: 'POST',
      body: form
    });

    const result = await response.json();
    console.log('Upload response status:', response.status);
    console.log('Upload response:', JSON.stringify(result, null, 2));

    // Clean up test file
    fs.unlinkSync(testFilePath);

  } catch (error) {
    console.error('Test error:', error.message);
  }
}

testUploadEndpoint();