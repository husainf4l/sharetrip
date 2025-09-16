const { PrismaClient } = require('@prisma/client');

async function checkCart() {
  const prisma = new PrismaClient();

  try {
    const carts = await prisma.cart.findMany({
      include: {
        items: {
          include: {
            tour: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    console.log('Carts in database:', JSON.stringify(carts, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCart();