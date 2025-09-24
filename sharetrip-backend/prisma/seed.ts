import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample users (guides)
  const hashedPassword = await bcrypt.hash('password123', 10);

  const guides = await Promise.all([
    prisma.user.upsert({
      where: { email: 'ahmed.jordan@example.com' },
      update: {},
      create: {
        name: 'Ahmed Al-Jordan',
        email: 'ahmed.jordan@example.com',
        passwordHash: hashedPassword,
        role: 'HOST',
        guideProfile: {
          create: {
            bio: 'Experienced guide specializing in Jordanian heritage and culture',
            ratingAvg: 4.8,
            toursCount: 0,
          },
        },
      },
      include: { guideProfile: true },
    }),
    prisma.user.upsert({
      where: { email: 'fatima.egypt@example.com' },
      update: {},
      create: {
        name: 'Fatima Al-Egypt',
        email: 'fatima.egypt@example.com',
        passwordHash: hashedPassword,
        role: 'HOST',
        guideProfile: {
          create: {
            bio: 'Passionate Egyptologist with 10+ years of experience',
            ratingAvg: 4.9,
            toursCount: 0,
          },
        },
      },
      include: { guideProfile: true },
    }),
    prisma.user.upsert({
      where: { email: 'omar.lebanon@example.com' },
      update: {},
      create: {
        name: 'Omar Al-Lebanon',
        email: 'omar.lebanon@example.com',
        passwordHash: hashedPassword,
        role: 'HOST',
        guideProfile: {
          create: {
            bio: 'Cultural guide sharing Lebanon\'s rich history and cuisine',
            ratingAvg: 4.7,
            toursCount: 0,
          },
        },
      },
      include: { guideProfile: true },
    }),
  ]);

  console.log('✅ Created sample guides');

  // Sample tour data
  const tourData = [
    // Jordan Tours
    {
      title: 'Petra Ancient City Tour',
      city: 'Petra',
      country: 'Jordan',
      category: 'SHARE_TRIP',
      description: 'Explore the magnificent ancient city of Petra, a UNESCO World Heritage site carved into rose-red cliffs over 2000 years ago.',
      basePrice: 4500, // $45.00 in cents
      minGroup: 8,
      maxGroup: 15,
      durationMins: 360,
      language: 'English',
      languages: ['English', 'Arabic'],
      isPublished: true,
      startTimes: ['2025-09-20T09:00:00Z', '2025-09-20T14:00:00Z'],
      whatsIncluded: ['Local guide', 'Entry tickets', 'Transport', 'Lunch'],
      difficulty: 'Moderate',
      tags: ['historical', 'unesco', 'ancient', 'walking'],
      travelStyles: ['culture', 'history'],
      accessibility: ['wheelchair-friendly'],
      guideId: guides[0].guideProfile!.id,
    },
    {
      title: 'Petra by Night Experience',
      city: 'Petra',
      country: 'Jordan',
      category: 'PRIVATE',
      description: 'Experience the magic of Petra illuminated by over 1500 candles in this intimate evening experience.',
      basePrice: 3500,
      minGroup: 10,
      maxGroup: 20,
      durationMins: 180,
      language: 'English',
      languages: ['English', 'Arabic'],
      isPublished: true,
      startTimes: ['2025-09-20T19:00:00Z'],
      whatsIncluded: ['Candlelight walk', 'Traditional music', 'Tea'],
      difficulty: 'Easy',
      tags: ['romantic', 'night', 'cultural', 'unique'],
      travelStyles: ['culture', 'romantic'],
      accessibility: ['wheelchair-friendly'],
      guideId: guides[0].guideProfile!.id,
    },
    {
      title: 'Dead Sea Relaxation Experience',
      city: 'Dead Sea',
      country: 'Jordan',
      category: 'GROUP',
      description: 'Float in the mineral-rich waters of the Dead Sea and enjoy spa treatments at this unique natural wonder.',
      basePrice: 3500,
      minGroup: 10,
      maxGroup: 20,
      durationMins: 240,
      language: 'English',
      languages: ['English', 'Arabic'],
      isPublished: true,
      startTimes: ['2025-09-21T10:00:00Z', '2025-09-21T14:00:00Z'],
      whatsIncluded: ['Spa access', 'Mud therapy', 'Transport', 'Towels'],
      difficulty: 'Easy',
      tags: ['spa', 'relaxation', 'nature', 'wellness'],
      travelStyles: ['relaxed', 'wellness'],
      accessibility: ['wheelchair-friendly', 'kid-friendly'],
      guideId: guides[0].guideProfile!.id,
    },
    {
      title: 'Amman Cultural Walking Tour',
      city: 'Amman',
      country: 'Jordan',
      category: 'SHARE_TRIP',
      description: 'Discover the ancient and modern sides of Jordan\'s capital city through its historic sites and vibrant souks.',
      basePrice: 2500,
      minGroup: 6,
      maxGroup: 12,
      durationMins: 180,
      language: 'English',
      languages: ['English', 'Arabic'],
      isPublished: true,
      startTimes: ['2025-09-22T09:00:00Z', '2025-09-22T14:00:00Z'],
      whatsIncluded: ['Local guide', 'Roman Theater', 'Souk visit'],
      difficulty: 'Easy',
      tags: ['cultural', 'historical', 'walking', 'city'],
      travelStyles: ['culture', 'history'],
      accessibility: ['wheelchair-friendly'],
      guideId: guides[0].guideProfile!.id,
    },
    {
      title: 'Wadi Rum Desert Safari',
      city: 'Wadi Rum',
      country: 'Jordan',
      category: 'PRIVATE',
      description: 'Experience the stunning desert landscapes of Wadi Rum with Bedouin guides in traditional 4x4 vehicles.',
      basePrice: 6500,
      minGroup: 6,
      maxGroup: 12,
      durationMins: 360,
      language: 'English',
      languages: ['English', 'Arabic'],
      isPublished: true,
      startTimes: ['2025-09-23T08:00:00Z'],
      whatsIncluded: ['Bedouin guide', '4x4 vehicle', 'Camp lunch', 'Stargazing'],
      difficulty: 'Moderate',
      tags: ['desert', 'adventure', 'bedouin', 'camping'],
      travelStyles: ['adventurous', 'nature'],
      accessibility: [],
      guideId: guides[0].guideProfile!.id,
    },

    // Egypt Tours
    {
      title: 'Pyramids of Giza & Sphinx',
      city: 'Giza',
      country: 'Egypt',
      category: 'GROUP',
      description: 'Visit the iconic Pyramids of Giza and the mysterious Sphinx in this comprehensive morning tour.',
      basePrice: 4000,
      minGroup: 10,
      maxGroup: 25,
      durationMins: 300,
      language: 'English',
      languages: ['English', 'Arabic'],
      isPublished: true,
      startTimes: ['2025-09-24T08:00:00Z', '2025-09-24T13:00:00Z'],
      whatsIncluded: ['Entry tickets', 'Guide', 'Transport', 'Water'],
      difficulty: 'Easy',
      tags: ['pyramids', 'ancient', 'unesco', 'iconic'],
      travelStyles: ['culture', 'history'],
      accessibility: ['wheelchair-friendly'],
      guideId: guides[1].guideProfile!.id,
    },
    {
      title: 'Khan el-Khalili Bazaar Tour',
      city: 'Cairo',
      country: 'Egypt',
      category: 'SHARE_TRIP',
      description: 'Explore Cairo\'s famous bazaar and experience authentic Egyptian shopping and culture.',
      basePrice: 2000,
      minGroup: 6,
      maxGroup: 12,
      durationMins: 180,
      language: 'English',
      languages: ['English', 'Arabic'],
      isPublished: true,
      startTimes: ['2025-09-25T10:00:00Z', '2025-09-25T15:00:00Z'],
      whatsIncluded: ['Local guide', 'Shopping tips', 'Traditional sweets'],
      difficulty: 'Easy',
      tags: ['bazaar', 'shopping', 'cultural', 'market'],
      travelStyles: ['culture', 'foodie'],
      accessibility: ['wheelchair-friendly'],
      guideId: guides[1].guideProfile!.id,
    },
    {
      title: 'Luxor Temple & Valley of Kings',
      city: 'Luxor',
      country: 'Egypt',
      category: 'PRIVATE',
      description: 'Discover the treasures of ancient Egypt at Luxor Temple and explore the Valley of the Kings.',
      basePrice: 6000,
      minGroup: 8,
      maxGroup: 15,
      durationMins: 420,
      language: 'English',
      languages: ['English', 'Arabic'],
      isPublished: true,
      startTimes: ['2025-09-26T07:00:00Z'],
      whatsIncluded: ['Expert guide', 'All entry tickets', 'Transport', 'Lunch'],
      difficulty: 'Moderate',
      tags: ['temples', 'pharaohs', 'ancient', 'luxor'],
      travelStyles: ['culture', 'history'],
      accessibility: ['wheelchair-friendly'],
      guideId: guides[1].guideProfile!.id,
    },

    // Lebanon Tours
    {
      title: 'Beirut Corniche Walk',
      city: 'Beirut',
      country: 'Lebanon',
      category: 'SHARE_TRIP',
      description: 'Stroll along Beirut\'s beautiful seaside promenade and discover the city\'s vibrant atmosphere.',
      basePrice: 2500,
      minGroup: 8,
      maxGroup: 16,
      durationMins: 150,
      language: 'English',
      languages: ['English', 'Arabic'],
      isPublished: true,
      startTimes: ['2025-09-27T16:00:00Z', '2025-09-27T18:00:00Z'],
      whatsIncluded: ['Local guide', 'Sea views', 'Coffee break'],
      difficulty: 'Easy',
      tags: ['seaside', 'walking', 'city', 'views'],
      travelStyles: ['relaxed', 'culture'],
      accessibility: ['wheelchair-friendly'],
      guideId: guides[2].guideProfile!.id,
    },
    {
      title: 'Baalbek Roman Temples',
      city: 'Baalbek',
      country: 'Lebanon',
      category: 'GROUP',
      description: 'Visit the magnificent Roman temples of Baalbek, one of the most impressive archaeological sites in the world.',
      basePrice: 5000,
      minGroup: 10,
      maxGroup: 20,
      durationMins: 240,
      language: 'English',
      languages: ['English', 'Arabic'],
      isPublished: true,
      startTimes: ['2025-09-28T09:00:00Z'],
      whatsIncluded: ['Entry tickets', 'Guide', 'Transport', 'Audio guide'],
      difficulty: 'Easy',
      tags: ['roman', 'temples', 'ancient', 'unesco'],
      travelStyles: ['culture', 'history'],
      accessibility: ['wheelchair-friendly'],
      guideId: guides[2].guideProfile!.id,
    },
  ];

  // Create tours
  for (const tour of tourData) {
    await prisma.tour.create({
      data: tour,
    });
  }

  console.log(`✅ Created ${tourData.length} sample tours`);

  // Update guide tour counts
  for (const guide of guides) {
    const tourCount = await prisma.tour.count({
      where: { guideId: guide.guideProfile!.id },
    });

    await prisma.guideProfile.update({
      where: { id: guide.guideProfile!.id },
      data: { toursCount: tourCount },
    });
  }

  console.log('✅ Updated guide tour counts');

  // Seed Categories
  console.log('📝 Seeding categories...');
  const categories = [
    {
      type: 'hotel',
      title: 'Find Your Perfect Hotel',
      subtitle: 'Luxury and budget hotels worldwide',
      image: '/hero/hotel.webp',
      sectionTitle: 'Hotels',
      message: 'Showing hotels...',
    },
    {
      type: 'apartment',
      title: 'Find Your Perfect Apartment',
      subtitle: 'Self-catering apartments and studios',
      image: '/hero/apartment.webp',
      sectionTitle: 'Apartments',
      message: 'Showing apartments...',
    },
    {
      type: 'resorts',
      title: 'Luxury Resorts & Spas',
      subtitle: 'All-inclusive resorts and spas',
      image: '/hero/resort.webp',
      sectionTitle: 'Resorts',
      message: 'Showing resorts...',
    },
    {
      type: 'hostels',
      title: 'Budget-Friendly Hostels',
      subtitle: 'Budget-friendly shared accommodations',
      image: '/hero/hostels.webp',
      sectionTitle: 'Hostels',
      message: 'Showing hostels...',
    },
    {
      type: 'motel',
      title: 'Convenient Motels for Your Stay',
      subtitle: 'Convenient roadside accommodations',
      image: '/hero/motels.webp',
      sectionTitle: 'Motels',
      message: 'Showing motels...',
    },
    {
      type: 'villas',
      title: 'Private Villas & Vacation Homes',
      subtitle: 'Private villas and vacation homes',
      image: '/hero/villa.webp',
      sectionTitle: 'Villas',
      message: 'Showing villas...',
    },
    {
      type: 'chalets',
      title: 'Mountain Chalets & Cabins',
      subtitle: 'Mountain chalets and cabins',
      image: '/hero/chalets.webp',
      sectionTitle: 'Chalets',
      message: 'Showing chalets...',
    },
    {
      type: 'treehouses',
      title: 'Unique Treehouse Accommodations',
      subtitle: 'Unique treehouse accommodations',
      image: '/hero/treehouses.webp',
      sectionTitle: 'Treehouses',
      message: 'Showing treehouses...',
    },
    {
      type: 'guest-houses',
      title: 'Homely Guest Houses & B&Bs',
      subtitle: 'Homely guest houses and B&Bs',
      image: '/hero/villa.jpg',
      sectionTitle: 'Guest Houses',
      message: 'Showing guest houses...',
    },
    {
      type: 'vacation-homes',
      title: 'Entire Vacation Homes',
      subtitle: 'Entire homes for your vacation',
      image: '/hero/villa.jpg',
      sectionTitle: 'Vacation Homes',
      message: 'Showing vacation homes...',
    },
    {
      type: 'caravans',
      title: 'Mobile Caravans & RVs',
      subtitle: 'Mobile caravans and RVs',
      image: '/hero/caravan.webp',
      sectionTitle: 'Caravans',
      message: 'Showing caravans...',
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { type: category.type },
      update: category,
      create: category,
    });
  }
  console.log('✅ Categories seeded successfully!');

  // Seed sample accommodations
  console.log('🏨 Seeding accommodations...');
  const sampleAccommodations = [
    {
      title: 'Luxury Beachfront Hotel Room',
      description: 'Stunning ocean view with private balcony, king bed, and modern amenities.',
      city: 'Dubai',
      country: 'UAE',
      address: 'Jumeirah Beach Road, Dubai',
      latitude: 25.2048,
      longitude: 55.2708,
      basePrice: 25000, // $250.00 in cents
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Room Service'],
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      ],
      categoryType: 'hotel',
    },
    {
      title: 'Cozy Downtown Apartment',
      description: 'Modern 2-bedroom apartment in the heart of the city with city views.',
      city: 'New York',
      country: 'USA',
      address: 'Manhattan, New York',
      latitude: 40.7128,
      longitude: -74.0060,
      basePrice: 15000, // $150.00 in cents
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air Conditioning'],
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      ],
      categoryType: 'apartment',
    },
    {
      title: 'Mountain Chalet Retreat',
      description: 'Rustic mountain chalet with fireplace, perfect for a romantic getaway.',
      city: 'Zermatt',
      country: 'Switzerland',
      address: 'Alps, Switzerland',
      latitude: 46.0207,
      longitude: 7.7491,
      basePrice: 35000, // $350.00 in cents
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      amenities: ['Fireplace', 'Mountain View', 'Ski Access', 'Hot Tub', 'WiFi'],
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
      ],
      categoryType: 'chalets',
    },
    {
      title: 'Luxury Resort Villa',
      description: 'Private villa with infinity pool and stunning tropical views.',
      city: 'Bali',
      country: 'Indonesia',
      address: 'Ubud, Bali',
      latitude: -8.3405,
      longitude: 115.0920,
      basePrice: 45000, // $450.00 in cents
      maxGuests: 8,
      bedrooms: 4,
      bathrooms: 4,
      amenities: ['Private Pool', 'Spa', 'Butler Service', 'Ocean View', 'WiFi'],
      images: [
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      ],
      categoryType: 'villas',
    },
    {
      title: 'Budget Hostel Dorm',
      description: 'Clean and social hostel dorm with shared facilities.',
      city: 'Amsterdam',
      country: 'Netherlands',
      address: 'Central Amsterdam',
      latitude: 52.3676,
      longitude: 4.9041,
      basePrice: 2500, // $25.00 in cents
      maxGuests: 1,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ['WiFi', 'Shared Kitchen', 'Lockers', 'Luggage Storage'],
      images: [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      ],
      categoryType: 'hostels',
    },
  ];

  // Get the first host user for accommodations
  const hostUser = guides.find(guide => guide.role === 'HOST');

  if (hostUser) {
    for (const accommodation of sampleAccommodations) {
      const category = await prisma.category.findUnique({
        where: { type: accommodation.categoryType },
      });

      if (category) {
        await prisma.accommodation.create({
          data: {
            title: accommodation.title,
            description: accommodation.description,
            city: accommodation.city,
            country: accommodation.country,
            address: accommodation.address,
            latitude: accommodation.latitude,
            longitude: accommodation.longitude,
            basePrice: accommodation.basePrice,
            maxGuests: accommodation.maxGuests,
            bedrooms: accommodation.bedrooms,
            bathrooms: accommodation.bathrooms,
            amenities: accommodation.amenities,
            images: accommodation.images,
            isPublished: true,
            categoryId: category.id,
            hostId: hostUser.id,
          },
        });
      }
    }
    console.log('✅ Accommodations seeded successfully!');
  } else {
    console.log('⚠️ No host user found for accommodations');
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
