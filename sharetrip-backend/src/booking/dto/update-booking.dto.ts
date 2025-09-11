import { IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  headcount?: number;

  // Note: Status updates should be done through specific endpoints
  // (confirmBooking, cancelBooking) for proper validation and authorization
}
