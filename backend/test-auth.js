const fetch = require('node-fetch');

async function testAuth() {
  try {
    // Test login first
    console.log('🔑 Testing login...');
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
    
    if (loginResponse.status !== 200) {
      const errorText = await loginResponse.text();
      console.log('Login failed:', errorText);
      console.log('\n❌ Cannot test booking without successful login');
      return;
    }

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

    // Test without authentication
    console.log('\n🚫 Testing booking without authentication...');
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

    console.log('Unauth booking status:', unauthResponse.status);
    const unauthText = await unauthResponse.text();
    console.log('Unauth response:', unauthText);

  } catch (error) {
    console.error('Test error:', error.message);
  }
}

testAuth();
