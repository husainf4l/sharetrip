import { IsEnum } from 'class-validator';
import { BookingStatus } from './create-booking.dto';

export class UpdateBookingStatusDto {
  @IsEnum(BookingStatus)
  status: BookingStatus;
}
