const fetch = require('node-fetch');

async function quickTest() {
  try {
    console.log('🔍 Testing server health...');
    const healthResponse = await fetch('http://localhost:3003/api/health');
    console.log('Health status:', healthResponse.status);
    
    if (healthResponse.status === 200) {
      console.log('✅ Server is running!');
      
      console.log('\n🔑 Creating test user...');
      const signupResponse = await fetch('http://localhost:3003/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Auth Test User',
          email: 'authtest@example.com',
          password: 'password123'
        }),
      });

      console.log('Signup status:', signupResponse.status);
      
      if (signupResponse.status === 201 || signupResponse.status === 200) {
        console.log('✅ User created');
        
        console.log('\n🔐 Testing login...');
        const loginResponse = await fetch('http://localhost:3003/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'authtest@example.com',
            password: 'password123'
          }),
        });

        console.log('Login status:', loginResponse.status);
        
        if (loginResponse.status === 201 || loginResponse.status === 200) {
          const loginData = await loginResponse.json();
          console.log('✅ Login successful');
          
          // Test authenticated booking
          console.log('\n📚 Testing authenticated booking...');
          const bookingResponse = await fetch('http://localhost:3003/api/bookings/1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${loginData.accessToken}`,
            },
            body: JSON.stringify({
              tourDate: '2024-12-25',
              numberOfPeople: 2,
              totalAmount: 200.00,
              currency: 'USD'
            }),
          });

          console.log('Booking status:', bookingResponse.status);
          const bookingResult = await bookingResponse.text();
          console.log('Booking response:', bookingResult);

          // Test unauthenticated booking
          console.log('\n🚫 Testing unauthenticated booking...');
          const unauthResponse = await fetch('http://localhost:3003/api/bookings/1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tourDate: '2024-12-25',
              numberOfPeople: 2,
              totalAmount: 200.00,
              currency: 'USD'
            }),
          });

          console.log('Unauth status:', unauthResponse.status);
          const unauthResult = await unauthResponse.text();
          console.log('Unauth response:', unauthResult);
          
          // Summary
          console.log('\n📋 AUTHENTICATION TEST SUMMARY:');
          if (unauthResponse.status === 401) {
            console.log('✅ Authentication is working - properly rejects unauthenticated requests');
          }
          
          if (bookingResponse.status === 401) {
            console.log('❌ Authentication failed for authenticated requests');
          } else if (bookingResponse.status !== 401) {
            console.log('✅ Authentication allows authenticated requests');
          }
          
        } else {
          console.log('❌ Login failed');
        }
      } else {
        console.log('❌ User creation failed');
      }
    } else {
      console.log('❌ Server not responding');
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

quickTest();
