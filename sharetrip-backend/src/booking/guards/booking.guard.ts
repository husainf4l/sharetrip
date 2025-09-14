import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BookingGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const bookingId = request.params.id;
    const method = request.method;
    const route = context.getHandler().name;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // For creating bookings, just check if user exists
    if (method === 'POST' && !bookingId) {
      return true;
    }

    // For other operations, check booking ownership/permissions
    if (bookingId) {
      const booking = await this.prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          tour: {
            include: {
              guide: true,
            },
          },
        },
      });

      if (!booking) {
        throw new ForbiddenException('Booking not found');
      }

      const isTraveler = booking.travelerId === user.id;
      const isGuide = booking.tour.guide.userId === user.id;
      const isAdmin = user.role === 'ADMIN'; // Assuming admin role exists

      // Different permissions based on operation
      switch (route) {
        case 'findOne':
          // Travelers can view their own bookings, guides can view bookings for their tours
          if (!isTraveler && !isGuide && !isAdmin) {
            throw new ForbiddenException('You do not have permission to view this booking');
          }
          break;

        case 'update':
          // Only travelers can update their own bookings (and only certain fields)
          if (!isTraveler && !isAdmin) {
            throw new ForbiddenException('You do not have permission to update this booking');
          }
          break;

        case 'remove':
          // Only travelers can delete their own pending bookings
          if (!isTraveler && !isAdmin) {
            throw new ForbiddenException('You do not have permission to delete this booking');
          }
          if (booking.status !== 'pending') {
            throw new ForbiddenException('Only pending bookings can be deleted');
          }
          break;

        case 'confirmBooking':
          // Only guides can confirm bookings for their tours
          if (!isGuide && !isAdmin) {
            throw new ForbiddenException('Only tour guides can confirm bookings');
          }
          break;

        case 'cancelBooking':
          // Both travelers and guides can cancel bookings
          if (!isTraveler && !isGuide && !isAdmin) {
            throw new ForbiddenException('You do not have permission to cancel this booking');
          }
          break;

        default:
          // For other operations, allow if user is involved
          if (!isTraveler && !isGuide && !isAdmin) {
            throw new ForbiddenException('You do not have permission to access this booking');
          }
      }
    }

    return true;
  }
}