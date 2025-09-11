import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export class CreateBookingDto {
  @IsString()
  tourId: string;

  @IsNumber()
  @Min(1)
  @Max(20) // Reasonable limit for group size
  headcount: number = 1;

  // Note: priceAtBooking and status will be calculated/set by the service
  // Users should not be able to set these directly
}
