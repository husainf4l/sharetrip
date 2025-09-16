const { PrismaClient } = require('@prisma/client');

async function checkToursWithGuides() {
  const prisma = new PrismaClient();

  try {
    const tours = await prisma.tour.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        guideId: true,
        guide: {
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    console.log('=== TOURS WITH GUIDE INFO ===');
    tours.forEach((tour, index) => {
      console.log(`${index + 1}. ${tour.title}`);
      console.log(`   Status: ${tour.status}`);
      console.log(`   Guide ID: ${tour.guideId}`);
      console.log(`   Guide exists: ${!!tour.guide}`);
      if (tour.guide) {
        console.log(`   Guide User: ${tour.guide.user?.name || 'No user'}`);
      }
      console.log('---');
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkToursWithGuides();