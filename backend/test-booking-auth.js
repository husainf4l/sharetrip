const fetch = require('node-fetch');

async function testBookingAuth() {
  try {
    // Use the access token from the login response
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MWE0Y2JhNy02NDQ3LTRhOGQtOWEwZS05MGZhMzMxMjA3ZDciLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3NTczNTk2NjAsImV4cCI6MTc1NzM2MDU2MH0.M3_Q1TOI6YeIu0qF_klcgtP-qpyiImT_ubUfj8ZelWk";

    console.log('📚 Testing booking with authentication...');
    const bookingResponse = await fetch('http://localhost:3003/api/bookings/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
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
    } else if (bookingResponse.status === 400) {
      console.log('\n⚠️  Booking failed due to validation or business logic (not authentication)');
    } else {
      console.log('\n⚠️  Booking failed for other reasons');
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

    if (unauthResponse.status === 401) {
      console.log('\n✅ Properly rejecting unauthenticated requests');
    }

  } catch (error) {
    console.error('Test error:', error.message);
  }
}

testBookingAuth();
