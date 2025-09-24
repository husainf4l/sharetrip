const { PrismaClient } = require('@prisma/client');

async function checkTours() {
  const prisma = new PrismaClient();

  try {
    const count = await prisma.tour.count();
    console.log('Total tours in database:', count);

    if (count > 0) {
      const tours = await prisma.tour.findMany({
        select: {
          id: true,
          title: true,
          isPublished: true,
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      console.log('All tours:', JSON.stringify(tours, null, 2));

      // Also check for draft tours
      const draftTours = await prisma.tour.findMany({
        where: { isPublished: false },
        select: {
          id: true,
          title: true,
          isPublished: true,
          status: true,
          createdAt: true,
        }
      });
      console.log('Draft tours:', JSON.stringify(draftTours, null, 2));
    }
  } catch (error) {
    console.error('Error checking tours:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTours();