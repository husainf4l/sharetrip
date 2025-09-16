const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function createTestUser() {
  const prisma = new PrismaClient();

  try {
    const hashedPassword = await bcrypt.hash('password123', 12);

    const user = await prisma.user.create({
      data: {
        name: 'Cart Test User',
        email: 'carttest@example.com',
        passwordHash: hashedPassword,
        role: 'TRAVELER'
      }
    });

    console.log('Created test user:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();