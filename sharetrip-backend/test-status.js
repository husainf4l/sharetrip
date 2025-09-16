const { PrismaClient } = require('@prisma/client');

async function testStatusFilter() {
  const prisma = new PrismaClient();

  try {
    // Test the exact filter used in the API
    const publishedApproved = await prisma.tour.findMany({
      where: {
        status: { in: ['published', 'approved'] }
      },
      select: {
        id: true,
        title: true,
        status: true
      }
    });

    console.log('=== PUBLISHED/APPROVED FILTER ===');
    console.log(`Found ${publishedApproved.length} tours`);
    publishedApproved.forEach((tour, index) => {
      console.log(`${index + 1}. ${tour.title} - Status: "${tour.status}"`);
    });

    // Test with trimmed status
    const allTours = await prisma.tour.findMany({
      select: {
        id: true,
        title: true,
        status: true
      }
    });

    console.log('\n=== ALL TOURS WITH TRIMMED STATUS ===');
    allTours.forEach((tour, index) => {
      const trimmedStatus = tour.status.trim();
      console.log(`${index + 1}. ${tour.title} - Status: "${tour.status}" -> "${trimmedStatus}"`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testStatusFilter();