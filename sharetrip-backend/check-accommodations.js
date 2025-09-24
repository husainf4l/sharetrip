const { PrismaClient } = require('@prisma/client');

async function checkAccommodations() {
  const prisma = new PrismaClient();

  try {
    const count = await prisma.accommodation.count();
    console.log('Total accommodations in database:', count);

    if (count > 0) {
      const accommodations = await prisma.accommodation.findMany({
        select: {
          id: true,
          title: true,
          isPublished: true,
          status: true,
          images: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      console.log('All accommodations:', JSON.stringify(accommodations, null, 2));

      // Also check for draft accommodations
      const draftAccommodations = await prisma.accommodation.findMany({
        where: { isPublished: false },
        select: {
          id: true,
          title: true,
          isPublished: true,
          status: true,
          images: true,
          createdAt: true,
        }
      });
      console.log('Draft accommodations:', JSON.stringify(draftAccommodations, null, 2));
    }
  } catch (error) {
    console.error('Error checking accommodations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAccommodations();