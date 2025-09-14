import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../common/s3';
import { CreateTourDto, UpdateTourDto, TourQueryDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TourService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async create(createTourDto: CreateTourDto, userId: string, photos?: Express.Multer.File[]) {
    try {
      // Find the user's guide profile
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          guideProfile: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!user.guideProfile) {
        throw new BadRequestException('User must have a guide profile to create tours. Please complete your host application first.');
      }

      if (user.role !== 'HOST') {
        throw new BadRequestException('Only users with HOST role can create tours');
      }

      const tour = await this.prisma.tour.create({
        data: {
          ...createTourDto,
          guideId: user.guideProfile.id,
          startTimes: createTourDto.startTimes.map(time => new Date(time)),
        },
        include: {
          guide: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
          media: true,
          _count: {
            select: {
              bookings: true,
            },
          },
        },
      });

      // Handle photo uploads if provided
      if (photos && photos.length > 0) {
        try {
          // Upload photos to S3
          const fileUrls = await this.s3Service.uploadMultipleFiles(photos, `tours/${tour.id}`);

          // Save media records to database
          const mediaRecords = fileUrls.map((url, index) => ({
            tourId: tour.id,
            url,
            type: photos[index].mimetype.startsWith('image/') ? 'image' : 'video',
          }));

          await this.prisma.tourMedia.createMany({
            data: mediaRecords,
          });

          // Refresh tour data to include the newly uploaded media
          const updatedTour = await this.prisma.tour.findUnique({
            where: { id: tour.id },
            include: {
              guide: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      image: true,
                    },
                  },
                },
              },
              media: true,
              _count: {
                select: {
                  bookings: true,
                },
              },
            },
          });

          return updatedTour;
        } catch (uploadError) {
          console.error('Failed to upload photos for tour:', uploadError);
          // Return tour without photos rather than failing completely
          return tour;
        }
      }

      return tour;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Tour with this data already exists');
        }
      }
      throw error;
    }
  }

  async findAll(query: TourQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      city,
      country,
      category,
      minPrice,
      maxPrice,
      minGroup,
      maxGroup,
      minDuration,
      maxDuration,
      language,
      languages,
      travelStyles,
      accessibility,
      startWindow,
      instantBook,
      minHostRating,
      isDropIn,
      isEarlyBird,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      startDate,
      endDate,
      tags,
    } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.TourWhereInput = {};

    // Status filter
    if (status) {
      where.status = status;
    } else {
      where.status = { in: ['published', 'approved'] };
    }

    // Search functionality
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } },
        { searchKeywords: { hasSome: [search] } },
      ];
    }

    // Location filters
    if (city) {
      where.city = { equals: city, mode: 'insensitive' };
    }
    if (country) {
      where.country = { equals: country, mode: 'insensitive' };
    }

    // Category filter
    if (category) {
      where.category = category;
    }

    // Price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.basePrice = {};
      if (minPrice !== undefined) where.basePrice.gte = minPrice;
      if (maxPrice !== undefined) where.basePrice.lte = maxPrice;
    }

    // Group size
    if (minGroup !== undefined || maxGroup !== undefined) {
      where.minGroup = {};
      where.maxGroup = {};
      if (minGroup !== undefined) {
        where.minGroup.gte = minGroup;
        where.maxGroup.gte = minGroup;
      }
      if (maxGroup !== undefined) {
        where.minGroup.lte = maxGroup;
        where.maxGroup.lte = maxGroup;
      }
    }

    // Duration
    if (minDuration !== undefined || maxDuration !== undefined) {
      where.durationMins = {};
      if (minDuration !== undefined) where.durationMins.gte = minDuration;
      if (maxDuration !== undefined) where.durationMins.lte = maxDuration;
    }

    // Language filters
    if (language) {
      where.OR = where.OR || [];
      where.OR.push({ language: { equals: language, mode: 'insensitive' } });
      where.OR.push({ languages: { hasSome: [language] } });
    }
    if (languages && languages.length > 0) {
      where.languages = { hasSome: languages };
    }

    // Travel styles
    if (travelStyles && travelStyles.length > 0) {
      where.travelStyles = { hasSome: travelStyles };
    }

    // Accessibility
    if (accessibility && accessibility.length > 0) {
      where.accessibility = { hasSome: accessibility };
    }

    // Start window
    if (startWindow) {
      where.startWindow = startWindow;
    }

    // Instant book
    if (instantBook !== undefined) {
      where.instantBook = instantBook;
    }

    // Host rating
    if (minHostRating !== undefined) {
      where.hostRating = { gte: minHostRating };
    }

    // Deal states
    if (isDropIn !== undefined) {
      where.isDropIn = isDropIn;
    }
    if (isEarlyBird !== undefined) {
      where.isEarlyBird = isEarlyBird;
    }

    // TODO: Date filters - Prisma doesn't support complex array filtering
    // For now, we'll skip date filtering and implement it later with raw SQL
    // if (startDate) {
    //   // Complex date filtering would go here
    // }
    // if (endDate) {
    //   // Complex date filtering would go here
    // }

    // Tags
    if (tags && tags.length > 0) {
      where.tags = { hasSome: tags };
    }

    // Build order by
    const orderBy: Prisma.TourOrderByWithRelationInput = {};
    orderBy[sortBy] = sortOrder;

    const [tours, total] = await Promise.all([
      this.prisma.tour.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          guide: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
          media: true,
          _count: {
            select: {
              bookings: true,
            },
          },
        },
      }),
      this.prisma.tour.count({ where }),
    ]);

    return {
      data: tours,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const tour = await this.prisma.tour.findUnique({
      where: { id },
      include: {
        guide: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        media: true,
        bookings: {
          include: {
            traveler: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        groupFill: true,
     
        _count: {
          select: {
            bookings: true,
          },
        },
      },
    });

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    return tour;
  }

  async findByGuide(guideId: string, query: TourQueryDto) {
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.TourWhereInput = {
      guideId,
    };

    if (status) {
      where.status = status;
    }

    const orderBy: Prisma.TourOrderByWithRelationInput = {};
    orderBy[sortBy] = sortOrder;

    const [tours, total] = await Promise.all([
      this.prisma.tour.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          media: true,
          _count: {
            select: {
              bookings: true,
            },
          },
        },
      }),
      this.prisma.tour.count({ where }),
    ]);

    return {
      data: tours,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findMyTours(userId: string, userRole: string, query: TourQueryDto) {
    const {
      page = 1,
      limit = 10,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    let where: Prisma.TourWhereInput = {};

    // If user is a HOST, return tours they created
    if (userRole === 'HOST') {
      // Get the user's guide profile
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { guideProfile: true },
      });

      if (user?.guideProfile) {
        where.guideId = user.guideProfile.id;
      } else {
        // User doesn't have a guide profile, return empty result
        return {
          data: [],
          meta: {
            page,
            limit,
            total: 0,
            totalPages: 0,
          },
        };
      }
    } else {
      // For TRAVELER or EXPLORER, return tours they booked
      where.bookings = {
        some: {
          travelerId: userId,
          status: {
            in: ['confirmed', 'completed'], // Only show confirmed/completed bookings
          },
        },
      };
    }

    if (status) {
      where.status = status;
    }

    const orderBy: Prisma.TourOrderByWithRelationInput = {};
    orderBy[sortBy] = sortOrder;

    const [tours, total] = await Promise.all([
      this.prisma.tour.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          guide: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
          media: true,
          bookings: userRole !== 'HOST' ? {
            where: {
              travelerId: userId,
            },
            select: {
              id: true,
              status: true,
              headcount: true,
              createdAt: true,
            },
          } : false,
          _count: {
            select: {
              bookings: true,
            },
          },
        },
      }),
      this.prisma.tour.count({ where }),
    ]);

    return {
      data: tours,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(id: string, updateTourDto: UpdateTourDto, guideId?: string) {
    // Verify tour exists and belongs to guide (if guideId provided)
    const existingTour = await this.prisma.tour.findUnique({
      where: { id },
      select: { guideId: true },
    });

    if (!existingTour) {
      throw new NotFoundException('Tour not found');
    }

    if (guideId && existingTour.guideId !== guideId) {
      throw new BadRequestException('Tour does not belong to this guide');
    }

    try {
      const updateData: any = { ...updateTourDto };

      // Convert startTimes if provided
      if ((updateTourDto as any).startTimes) {
        updateData.startTimes = (updateTourDto as any).startTimes.map((time: string) => new Date(time));
      }

      const tour = await this.prisma.tour.update({
        where: { id },
        data: updateData,
        include: {
          guide: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
          media: true,
          _count: {
            select: {
              bookings: true,
            },
          },
        },
      });

      return tour;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Tour not found');
        }
      }
      throw error;
    }
  }

  async remove(id: string, guideId?: string) {
    // Verify tour exists and belongs to guide (if guideId provided)
    const existingTour = await this.prisma.tour.findUnique({
      where: { id },
      select: { guideId: true },
    });

    if (!existingTour) {
      throw new NotFoundException('Tour not found');
    }

    if (guideId && existingTour.guideId !== guideId) {
      throw new BadRequestException('Tour does not belong to this guide');
    }

    try {
      await this.prisma.tour.delete({
        where: { id },
      });

      return { message: 'Tour deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Tour not found');
        }
      }
      throw error;
    }
  }

  async getTourStats(id: string) {
    const tour = await this.prisma.tour.findUnique({
      where: { id },
      select: {
        id: true,
        bookings: {
          select: {
            id: true,
            status: true,
            priceAtBooking: true,
            headcount: true,
            createdAt: true,
          },
        },
      },
    });

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    const bookings = tour.bookings;
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const totalRevenue = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + b.priceAtBooking, 0);
    const totalParticipants = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + b.headcount, 0);

    return {
      tourId: id,
      totalBookings,
      confirmedBookings,
      totalRevenue,
      totalParticipants,
      averageBookingValue: totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0,
      conversionRate: totalBookings > 0 ? Math.round((confirmedBookings / totalBookings) * 100) : 0,
    };
  }

  async uploadTourMedia(tourId: string, files: Express.Multer.File[], userId: string) {
    // Verify tour exists and user owns it
    const tour = await this.prisma.tour.findUnique({
      where: { id: tourId },
      include: {
        guide: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    if (tour.guide.user.id !== userId) {
      throw new ForbiddenException('You can only upload media to your own tours');
    }

    // Upload files to S3
    const fileUrls = await this.s3Service.uploadMultipleFiles(files, `tours/${tourId}`);

    // Save media records to database
    const mediaRecords = fileUrls.map((url, index) => ({
      tourId,
      url,
      type: files[index].mimetype.startsWith('image/') ? 'image' : 'video',
    }));

    const createdMedia = await this.prisma.tourMedia.createMany({
      data: mediaRecords,
    });

    return {
      message: 'Media uploaded successfully',
      uploadedCount: createdMedia.count,
      media: mediaRecords,
    };
  }

  async deleteTourMedia(tourId: string, mediaId: string, userId: string) {
    // Verify tour exists and user owns it
    const tour = await this.prisma.tour.findUnique({
      where: { id: tourId },
      include: {
        guide: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    if (tour.guide.user.id !== userId) {
      throw new ForbiddenException('You can only delete media from your own tours');
    }

    // Find the media record
    const media = await this.prisma.tourMedia.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    if (media.tourId !== tourId) {
      throw new BadRequestException('Media does not belong to this tour');
    }

    // Delete from S3
    await this.s3Service.deleteFile(media.url);

    // Delete from database
    await this.prisma.tourMedia.delete({
      where: { id: mediaId },
    });

    return {
      message: 'Media deleted successfully',
    };
  }
}
