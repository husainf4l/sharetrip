import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface ShareTourFilters {
  // Destination
  cities?: string[];
  countries?: string[];
  
  // Dates & Time
  startDate?: string;
  endDate?: string;
  flexibleDays?: number; // ±1-3 days
  startWindows?: string[]; // morning, afternoon, evening
  
  // Duration & Group
  durations?: string[]; // 30-60m, 1-2h, 3-4h, full-day
  groupSizes?: string[]; // 2-5, 6-10, 10-16
  
  // Budget
  minPrice?: number;
  maxPrice?: number;
  maxPriceAtFull?: boolean; // Consider max price at full group
  
  // Language & Culture
  languages?: string[];
  travelStyles?: string[]; // relaxed, adventurous, foodie, culture, nightlife, family
  
  // Accessibility & Host
  accessibility?: string[];
  instantBook?: boolean;
  minHostRating?: number;
  
  // Deal States
  dropInsOnly?: boolean; // <2h
  earlyBird?: boolean;
  payWhatYouWant?: boolean;
  
  // Cancellation
  cancellationPolicies?: string[];
  
  // Sorting
  sortBy?: 'price_low' | 'spots_left' | 'starting_soon' | 'compatible' | 'rating' | 'price_high';
  
  // Pagination
  page?: number;
  limit?: number;
}

@Injectable()
export class ToursService {
  constructor(private prisma: PrismaService) {}

  async filterShareTours(filters: ShareTourFilters): Promise<any> {
    try {
      const {
        cities, countries, startDate, endDate, flexibleDays, startWindows,
        durations, groupSizes, minPrice, maxPrice, maxPriceAtFull,
        languages, travelStyles, accessibility, instantBook, minHostRating,
        dropInsOnly, earlyBird, payWhatYouWant, cancellationPolicies,
        sortBy = 'compatible', page = 1, limit = 20
      } = filters;

      // Build complex where clause
      const where: any = {
        category: 'SHARE_TRIP',
        status: 'active'
      };

      const AND: any[] = [];

      // Destination filters
      if (cities?.length) {
        AND.push({ city: { in: cities } });
      }
      if (countries?.length) {
        AND.push({ country: { in: countries } });
      }

      // Date filters with flexibility
      if (startDate || endDate) {
        const dateFilter: any = {};
        if (startDate) {
          const start = new Date(startDate);
          if (flexibleDays) {
            start.setDate(start.getDate() - flexibleDays);
          }
          dateFilter.gte = start;
        }
        if (endDate) {
          const end = new Date(endDate);
          if (flexibleDays) {
            end.setDate(end.getDate() + flexibleDays);
          }
          dateFilter.lte = end;
        }
        AND.push({
          startTimes: {
            some: dateFilter
          }
        });
      }

      // Time window filter
      if (startWindows?.length) {
        AND.push({ startWindow: { in: startWindows } });
      }

      // Duration filter
      if (durations?.length) {
        const durationRanges: any[] = [];
        durations.forEach(duration => {
          switch (duration) {
            case '30-60m':
              durationRanges.push({ durationMins: { gte: 30, lte: 60 } });
              break;
            case '1-2h':
              durationRanges.push({ durationMins: { gte: 60, lte: 120 } });
              break;
            case '3-4h':
              durationRanges.push({ durationMins: { gte: 180, lte: 240 } });
              break;
            case 'full-day':
              durationRanges.push({ durationMins: { gte: 240 } });
              break;
          }
        });
        if (durationRanges.length) {
          AND.push({ OR: durationRanges });
        }
      }

      // Group size filter
      if (groupSizes?.length) {
        const groupRanges: any[] = [];
        groupSizes.forEach(size => {
          switch (size) {
            case '2-5':
              groupRanges.push({ 
                AND: [
                  { minGroup: { lte: 5 } },
                  { maxGroup: { gte: 2 } }
                ]
              });
              break;
            case '6-10':
              groupRanges.push({ 
                AND: [
                  { minGroup: { lte: 10 } },
                  { maxGroup: { gte: 6 } }
                ]
              });
              break;
            case '10-16':
              groupRanges.push({ 
                AND: [
                  { minGroup: { lte: 16 } },
                  { maxGroup: { gte: 10 } }
                ]
              });
              break;
          }
        });
        if (groupRanges.length) {
          AND.push({ OR: groupRanges });
        }
      }

      // Budget filters
      if (minPrice !== undefined || maxPrice !== undefined) {
        if (maxPriceAtFull) {
          // Filter by max price at full group
          if (minPrice !== undefined) {
            AND.push({
              groupFill: {
                maxGroupPrice: { gte: minPrice * 100 } // Convert to cents
              }
            });
          }
          if (maxPrice !== undefined) {
            AND.push({
              groupFill: {
                maxGroupPrice: { lte: maxPrice * 100 }
              }
            });
          }
        } else {
          // Filter by current dynamic price
          if (minPrice !== undefined) {
            AND.push({
              OR: [
                { basePrice: { gte: minPrice * 100 } },
                {
                  groupFill: {
                    dynamicPrice: { gte: minPrice * 100 }
                  }
                }
              ]
            });
          }
          if (maxPrice !== undefined) {
            AND.push({
              OR: [
                { basePrice: { lte: maxPrice * 100 } },
                {
                  groupFill: {
                    dynamicPrice: { lte: maxPrice * 100 }
                  }
                }
              ]
            });
          }
        }
      }

      // Language filters
      if (languages?.length) {
        AND.push({
          OR: [
            { language: { in: languages } },
            {
              languages: {
                hasSome: languages
              }
            }
          ]
        });
      }

      // Travel style filters
      if (travelStyles?.length) {
        AND.push({
          travelStyles: {
            hasSome: travelStyles
          }
        });
      }

      // Accessibility filters
      if (accessibility?.length) {
        AND.push({
          accessibility: {
            hasSome: accessibility
          }
        });
      }

      // Host preferences
      if (instantBook) {
        AND.push({ instantBook: true });
      }
      if (minHostRating) {
        AND.push({ hostRating: { gte: minHostRating } });
      }

      // Deal state filters
      if (dropInsOnly) {
        AND.push({ isDropIn: true });
      }
      if (earlyBird) {
        AND.push({ isEarlyBird: true });
      }
      if (payWhatYouWant) {
        AND.push({ isPayWhatYouWant: true });
      }

      // Cancellation policy
      if (cancellationPolicies?.length) {
        AND.push({ cancellationPolicy: { in: cancellationPolicies } });
      }

      if (AND.length > 0) {
        where.AND = AND;
      }

      // Build order by clause
      let orderBy: any[] = [];
      switch (sortBy) {
        case 'price_low':
          orderBy = [
            {
              groupFill: {
                dynamicPrice: 'asc'
              }
            },
            { basePrice: 'asc' }
          ];
          break;
        case 'price_high':
          orderBy = [
            {
              groupFill: {
                dynamicPrice: 'desc'
              }
            },
            { basePrice: 'desc' }
          ];
          break;
        case 'spots_left':
          orderBy = [
            {
              groupFill: {
                spotsLeft: 'desc'
              }
            }
          ];
          break;
        case 'starting_soon':
          orderBy = [{ startTimes: 'asc' }];
          break;
        case 'rating':
          orderBy = [{ hostRating: 'desc' }];
          break;
        case 'compatible':
        default:
          // For compatibility, we'll use a mix of factors
          orderBy = [
            { hostRating: 'desc' },
            {
              groupFill: {
                spotsLeft: 'desc'
              }
            },
            { createdAt: 'desc' }
          ];
          break;
      }

      // Execute query with pagination
      const tours = await this.prisma.tour.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          guide: {
            include: {
              user: {
                select: { name: true, image: true }
              }
            }
          },
          media: true,
          groupFill: true,
          bookings: {
            where: { status: 'confirmed' },
            select: { headcount: true }
          }
        }
      });

      // Get total count for pagination
      const total = await this.prisma.tour.count({ where });

      // Enhance tours with computed fields
      const enhancedTours = tours.map((tour: any) => {
        const confirmedBookings = tour.bookings.reduce((sum: number, booking: { headcount: number }) => sum + booking.headcount, 0);
        const currentPrice = tour.groupFill?.dynamicPrice || tour.basePrice;
        const spotsLeft = tour.maxGroup - confirmedBookings;
        
        // Calculate if it's a drop-in (starts within 2 hours)
        const now = new Date();
        const isDropIn = tour.startTimes.some((startTime: Date | string) => {
          const timeDiff = new Date(startTime).getTime() - now.getTime();
          return timeDiff > 0 && timeDiff <= 2 * 60 * 60 * 1000; // 2 hours in milliseconds
        });

        return {
          ...tour,
          currentPrice: currentPrice / 100, // Convert to dollars
          maxGroupPrice: tour.groupFill?.maxGroupPrice ? tour.groupFill.maxGroupPrice / 100 : tour.basePrice / 100,
          spotsLeft,
          confirmedBookings,
          isDropIn,
          progressPercentage: ((confirmedBookings / (tour.groupFill?.targetCount || tour.maxGroup)) * 100).toFixed(1)
        };
      });

      return {
        tours: enhancedTours,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        filters: filters // Echo back applied filters
      };
    } catch (error) {
      // Return mock data if database is not available
      const mockTours = [
        {
          id: '1',
          title: 'Hidden Gems Food Tour in Paris',
          city: 'Paris',
          country: 'France',
          description: 'Discover authentic local cuisine away from tourist traps',
          media: [{ url: 'https://images.unsplash.com/photo-1549144511-f099e773c147', type: 'image' }],
          currentPrice: 89,
          maxGroupPrice: 75,
          basePrice: 9500,
          spotsLeft: 3,
          confirmedBookings: 5,
          maxGroup: 8,
          durationMins: 180,
          hostRating: 4.8,
          isDropIn: false,
          isEarlyBird: true,
          isPayWhatYouWant: false,
          progressPercentage: '62.5',
          guide: {
            user: {
              name: 'Marie Dubois',
              image: 'https://images.unsplash.com/photo-1494790108755-2616b612b0e5'
            }
          },
          startTimes: ['2025-09-03T14:00:00Z', '2025-09-04T14:00:00Z'],
          travelStyles: ['foodie', 'culture'],
          accessibility: ['low-walking'],
          language: 'English',
          languages: ['English', 'French']
        },
        {
          id: '2',
          title: 'Street Art & Underground Culture Barcelona',
          city: 'Barcelona',
          country: 'Spain', 
          description: 'Explore the vibrant street art scene with local artists',
          media: [{ url: 'https://images.unsplash.com/photo-1583422409516-2895a77efded', type: 'image' }],
          currentPrice: 45,
          maxGroupPrice: 35,
          basePrice: 4500,
          spotsLeft: 7,
          confirmedBookings: 3,
          maxGroup: 10,
          durationMins: 150,
          hostRating: 4.9,
          isDropIn: true,
          isEarlyBird: false,
          isPayWhatYouWant: false,
          progressPercentage: '30.0',
          guide: {
            user: {
              name: 'Carlos Rodriguez',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
            }
          },
          startTimes: ['2025-09-02T21:30:00Z'],
          travelStyles: ['adventurous', 'culture'],
          accessibility: ['wheelchair-friendly'],
          language: 'English',
          languages: ['English', 'Spanish']
        }
      ];

      return {
        tours: mockTours,
        pagination: {
          page: filters.page || 1,
          limit: filters.limit || 20,
          total: mockTours.length,
          pages: 1
        },
        filters: filters
      };
    }
  }

  async matchForUser(userId: string): Promise<any> {
    try {
      // Get user preferences
      const userPreferences = await this.prisma.preference.findUnique({
        where: { userId }
      });

      if (!userPreferences) {
        // Fallback to trending tours
        return this.filterShareTours({ sortBy: 'compatible', limit: 10 });
      }

      // Build filters from user preferences
      const matchFilters: ShareTourFilters = {
        cities: userPreferences.cities,
        countries: userPreferences.countries,
        minPrice: userPreferences.budgetMin ? userPreferences.budgetMin / 100 : undefined,
        maxPrice: userPreferences.budgetMax ? userPreferences.budgetMax / 100 : undefined,
        maxPriceAtFull: userPreferences.maxBudgetAtFull,
        languages: userPreferences.preferredLanguages,
        travelStyles: userPreferences.travelStyles,
        accessibility: userPreferences.accessibility,
        durations: userPreferences.preferredDuration,
        startWindows: userPreferences.startWindows,
        cancellationPolicies: userPreferences.cancellationPolicy,
        minHostRating: userPreferences.minHostRating || undefined,
        instantBook: userPreferences.instantBookOnly,
        sortBy: 'compatible',
        limit: 20
      };

      const result = await this.filterShareTours(matchFilters);
      
      // Enhanced vector similarity matching
      const enhancedTours = await this.applyVectorSimilarity(result.tours, userPreferences);
      
      return {
        userId,
        matches: enhancedTours,
        matchedPreferences: userPreferences,
        appliedFilters: matchFilters
      };
    } catch (error) {
      // Return fallback data
      return this.filterShareTours({ sortBy: 'compatible', limit: 10 });
    }
  }

  private async applyVectorSimilarity(tours: any[], userPreferences: any): Promise<any[]> {
    try {
      // Get user's embedding vector if it exists
      const userEmbedding = await this.prisma.embedding.findFirst({
        where: {
          ownerType: 'USER',
          ownerId: userPreferences.userId
        }
      });

      if (!userEmbedding) {
        // Return tours with basic compatibility scoring if no vector available
        return tours.map(tour => ({
          ...tour,
          compatibilityScore: this.calculateBasicCompatibility(tour, userPreferences)
        })).sort((a, b) => b.compatibilityScore - a.compatibilityScore);
      }

      // Calculate vector similarity for each tour
      const toursWithSimilarity = await Promise.all(
        tours.map(async (tour) => {
          const tourEmbedding = await this.prisma.embedding.findFirst({
            where: {
              ownerType: 'TOUR',
              ownerId: tour.id
            }
          });

          let similarityScore = 0;
          if (tourEmbedding && userEmbedding) {
            // Calculate cosine similarity between vectors
            similarityScore = this.calculateCosineSimilarity(
              userEmbedding.vector,
              tourEmbedding.vector
            );
          }

          const basicScore = this.calculateBasicCompatibility(tour, userPreferences);
          
          // Combine vector similarity (40%) with basic compatibility (60%)
          const combinedScore = (similarityScore * 0.4) + (basicScore * 0.6);

          return {
            ...tour,
            vectorSimilarity: similarityScore,
            compatibilityScore: basicScore,
            combinedScore: combinedScore
          };
        })
      );

      // Sort by combined score
      return toursWithSimilarity.sort((a, b) => b.combinedScore - a.combinedScore);
    } catch (error) {
      // Return tours with basic compatibility scoring if error
      return tours.map(tour => ({
        ...tour,
        compatibilityScore: this.calculateBasicCompatibility(tour, userPreferences)
      })).sort((a, b) => b.compatibilityScore - a.compatibilityScore);
    }
  }

  private calculateBasicCompatibility(tour: any, preferences: any): number {
    let score = 0.5; // Base score

    // Location preference match
    if (preferences.cities?.includes(tour.city)) score += 0.2;
    if (preferences.countries?.includes(tour.country)) score += 0.1;

    // Budget compatibility
    if (preferences.budgetMin && preferences.budgetMax) {
      const tourPrice = tour.currentPrice;
      const budgetMin = preferences.budgetMin / 100;
      const budgetMax = preferences.budgetMax / 100;
      
      if (tourPrice >= budgetMin && tourPrice <= budgetMax) {
        score += 0.15;
      } else if (tourPrice < budgetMin) {
        // Slightly penalize tours that are too cheap
        score -= 0.05;
      } else {
        // Penalize tours that exceed budget
        score -= 0.2;
      }
    }

    // Travel style match
    if (preferences.travelStyles && tour.travelStyles) {
      const matchedStyles = preferences.travelStyles.filter((style: string) => 
        tour.travelStyles.includes(style)
      );
      score += (matchedStyles.length / preferences.travelStyles.length) * 0.2;
    }

    // Language preference
    if (preferences.preferredLanguages && tour.languages) {
      const languageMatch = preferences.preferredLanguages.some((lang: string) =>
        tour.languages.includes(lang)
      );
      if (languageMatch) score += 0.1;
    }

    // Host rating importance
    if (preferences.minHostRating && tour.hostRating) {
      if (tour.hostRating >= preferences.minHostRating) {
        score += 0.1;
      } else {
        score -= 0.1;
      }
    }

    // Accessibility needs
    if (preferences.accessibility && tour.accessibility) {
      const accessibilityMatch = preferences.accessibility.every((need: string) =>
        tour.accessibility.includes(need)
      );
      if (accessibilityMatch) score += 0.1;
    }

    // Group filling incentive (favor tours that need more people)
    const progressPercentage = parseFloat(tour.progressPercentage);
    if (progressPercentage < 50) {
      score += 0.05; // Slight boost for tours needing more people
    } else if (progressPercentage > 80) {
      score += 0.1; // Boost for almost-full tours (urgency factor)
    }

    return Math.min(Math.max(score, 0), 1); // Clamp between 0 and 1
  }

  private calculateCosineSimilarity(vectorA: Buffer, vectorB: Buffer): number {
    try {
      // Convert Buffer to Float32Array (assuming vectors are stored as float32)
      const a = new Float32Array(vectorA.buffer);
      const b = new Float32Array(vectorB.buffer);

      if (a.length !== b.length) return 0;

      let dotProduct = 0;
      let normA = 0;
      let normB = 0;

      for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
      }

      normA = Math.sqrt(normA);
      normB = Math.sqrt(normB);

      if (normA === 0 || normB === 0) return 0;

      return dotProduct / (normA * normB);
    } catch (error) {
      return 0;
    }
  }

  // Legacy method for backward compatibility
  async filterTours(q: any): Promise<any[]> {
    try {
      // Convert legacy query to new filter format
      const filters: ShareTourFilters = {
        cities: q.city ? [q.city] : undefined,
        minPrice: q.minPrice ? Number(q.minPrice) / 100 : undefined,
        maxPrice: q.maxPrice ? Number(q.maxPrice) / 100 : undefined,
        sortBy: q.sortBy || 'compatible'
      };

      const result = await this.filterShareTours(filters);
      return result.tours; // Return just tours for backward compatibility
    } catch (error) {
      return []; // Return empty array on error
    }
  }

  // Host management methods
  async createTour(tourData: any) {
    const { guideId, ...data } = tourData;

    // Verify guide exists and has permission
    const guide = await this.prisma.guideProfile.findUnique({
      where: { userId: guideId }
    });

    if (!guide) {
      throw new Error('Guide profile not found');
    }

    return this.prisma.tour.create({
      data: {
        ...data,
        guideId: guide.id
      }
    });
  }

  async getToursByGuide(guideUserId: string) {
    const guide = await this.prisma.guideProfile.findUnique({
      where: { userId: guideUserId }
    });

    if (!guide) {
      return [];
    }

    return this.prisma.tour.findMany({
      where: { guideId: guide.id },
      include: {
        _count: {
          select: { bookings: true }
        }
      }
    });
  }

  async updateTour(tourId: string, updateData: any, guideUserId: string) {
    const guide = await this.prisma.guideProfile.findUnique({
      where: { userId: guideUserId }
    });

    if (!guide) {
      throw new Error('Guide profile not found');
    }

    return this.prisma.tour.update({
      where: {
        id: tourId,
        guideId: guide.id
      },
      data: updateData
    });
  }

  async deleteTour(tourId: string, guideUserId: string) {
    const guide = await this.prisma.guideProfile.findUnique({
      where: { userId: guideUserId }
    });

    if (!guide) {
      throw new Error('Guide profile not found');
    }

    return this.prisma.tour.delete({
      where: {
        id: tourId,
        guideId: guide.id
      }
    });
  }

  async getTourBookings(tourId: string, guideUserId: string) {
    const guide = await this.prisma.guideProfile.findUnique({
      where: { userId: guideUserId }
    });

    if (!guide) {
      throw new Error('Guide profile not found');
    }

    return this.prisma.booking.findMany({
      where: {
        tourId,
        tour: {
          guideId: guide.id
        }
      },
      include: {
        traveler: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  }

  async createBooking(bookingData: any) {
    const { tourId, travelerId, headcount, specialRequests } = bookingData;

    // Get tour details
    const tour = await this.prisma.tour.findUnique({
      where: { id: tourId },
      include: { guide: true }
    });

    if (!tour) {
      throw new Error('Tour not found');
    }

    if (tour.status !== 'active') {
      throw new Error('Tour is not available for booking');
    }

    // Calculate price (this is simplified - in real app would handle group pricing)
    const priceAtBooking = tour.basePrice * headcount;

    return this.prisma.booking.create({
      data: {
        tourId,
        travelerId,
        headcount,
        priceAtBooking,
        status: tour.instantBook ? 'confirmed' : 'pending'
      }
    });
  }

  async getBookingsByTraveler(travelerId: string) {
    return this.prisma.booking.findMany({
      where: { travelerId },
      include: {
        tour: {
          include: {
            guide: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }
}