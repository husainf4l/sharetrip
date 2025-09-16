const { exec } = require('child_process');

async function testCart() {
  try {
    console.log('Testing cart functionality...\n');

    // Test 1: Get empty cart
    console.log('1. Getting empty cart...');
    exec('curl -s http://localhost:3003/api/cart', (error, stdout, stderr) => {
      if (error) {
        console.error('Error getting cart:', error);
        return;
      }
      console.log('Empty cart response:', stdout);

      // Test 2: Add tour to cart
      console.log('\n2. Adding tour to cart...');
      exec(`curl -s -X POST http://localhost:3003/api/cart/add -H "Content-Type: application/json" -d "{\\"tourId\\":\\"f51fa672-ad05-47a0-9bd6-7669f404d305\\",\\"quantity\\":1,\\"headcount\\":2,\\"startTime\\":\\"2025-09-24T22:10:00.000Z\\"}"`, (error2, stdout2, stderr2) => {
        if (error2) {
          console.error('Error adding to cart:', error2);
          return;
        }
        console.log('Add to cart response:', stdout2);

        // Test 3: Get cart again
        console.log('\n3. Getting cart again...');
        exec('curl -s http://localhost:3003/api/cart', (error3, stdout3, stderr3) => {
          if (error3) {
            console.error('Error getting cart again:', error3);
            return;
          }
          console.log('Updated cart response:', stdout3);
        });
      });
    });

  } catch (error) {
    console.error('Error testing cart:', error);
  }
}

testCart();