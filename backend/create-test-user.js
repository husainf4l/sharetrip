const fetch = require('node-fetch');

async function createTestUser() {
  try {
    console.log('👤 Creating test user...');
    const signupResponse = await fetch('http://localhost:3003/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }),
    });

    console.log('Signup status:', signupResponse.status);
    
    if (signupResponse.status === 201 || signupResponse.status === 200) {
      const userData = await signupResponse.json();
      console.log('✅ Test user created successfully');
      console.log('User ID:', userData.user?.id);
      
      // Now test login
      console.log('\n🔑 Testing login with new user...');
      const loginResponse = await fetch('http://localhost:3003/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        }),
      });

      console.log('Login status:', loginResponse.status);
      
      if (loginResponse.status === 200) {
        const loginData = await loginResponse.json();
        console.log('✅ Login successful');
        console.log('Access token received:', loginData.accessToken ? 'Yes' : 'No');

        // Test booking with authentication
        console.log('\n📚 Testing booking with authentication...');
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
        const bookingText = await bookingResponse.text();
        console.log('Booking response:', bookingText);

        if (bookingResponse.status === 401) {
          console.log('\n❌ Authentication failed for booking');
        } else if (bookingResponse.status === 201) {
          console.log('\n✅ Booking successful - authentication working!');
        } else {
          console.log('\n⚠️  Booking failed for other reasons (not authentication)');
        }

      } else {
        const loginError = await loginResponse.text();
        console.log('❌ Login failed:', loginError);
      }

    } else {
      const signupError = await signupResponse.text();
      console.log('❌ Signup failed:', signupError);
    }

  } catch (error) {
    console.error('Test error:', error.message);
  }
}

createTestUser();
