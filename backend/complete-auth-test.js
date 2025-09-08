const fetch = require('node-fetch');

async function testCompleteAuth() {
  try {
    console.log('🔍 Testing server health...');
    const healthResponse = await fetch('http://localhost:3003/api/health');
    console.log('Health status:', healthResponse.status);
    
    if (healthResponse.status !== 200) {
      console.log('❌ Server not responding correctly');
      return;
    }
    
    console.log('✅ Server is running!');
    
    // Create a test user
    console.log('\n👤 Creating test user...');
    const signupResponse = await fetch('http://localhost:3003/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User Fixed',
        email: 'testfixed@example.com',
        password: 'password123'
      }),
    });

    console.log('Signup status:', signupResponse.status);
    const signupText = await signupResponse.text();
    console.log('Signup response:', signupText);
    
    if (signupResponse.status === 400 && signupText.includes('Email already in use')) {
      console.log('User already exists, proceeding to login...');
    } else if (signupResponse.status !== 201 && signupResponse.status !== 200) {
      console.log('❌ Failed to create user');
      return;
    }

    // Test login
    console.log('\n🔑 Testing login...');
    console.log('Login URL: http://localhost:3003/api/auth/login');
    
    const loginResponse = await fetch('http://localhost:3003/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'testfixed@example.com',
        password: 'password123'
      }),
    });

    console.log('Login status:', loginResponse.status);
    const loginText = await loginResponse.text();
    console.log('Login response:', loginText);

    if (loginResponse.status !== 200 && loginResponse.status !== 201) {
      console.log('❌ Login failed');
      return;
    }

    const loginData = JSON.parse(loginText);
    console.log('✅ Login successful!');
    console.log('Access token received:', loginData.accessToken ? 'Yes' : 'No');

    // Test authenticated booking
    console.log('\n📚 Testing authenticated booking...');
    console.log('Booking URL: http://localhost:3003/api/bookings/1');
    
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
    const unauthText = await unauthResponse.text();
    console.log('Unauth response:', unauthText);

    // Summary
    console.log('\n📋 SUMMARY:');
    console.log('===================');
    console.log('Server Health:', healthResponse.status === 200 ? '✅ Working' : '❌ Failed');
    console.log('User Creation/Login:', loginResponse.status === 200 || loginResponse.status === 201 ? '✅ Working' : '❌ Failed');
    console.log('Authentication Guard:', unauthResponse.status === 401 ? '✅ Working' : '❌ Failed');
    console.log('Booking Endpoint:', bookingResponse.status !== 404 ? '✅ Accessible' : '❌ Not Found');

  } catch (error) {
    console.error('❌ Test error:', error.message);
    console.log('\n🔧 Debug Info:');
    console.log('Error type:', error.constructor.name);
    console.log('Error code:', error.code);
  }
}

testCompleteAuth();
