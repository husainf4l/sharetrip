import { IsString } from 'class-validator';

export class AddToWishlistDto {
  @IsString()
  tourId: string;
}

export class WishlistResponseDto {
  id: string;
  userId: string;
  tours: WishlistItemResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}

export class WishlistItemResponseDto {
  id: string;
  tourId: string;
  tour: {
    id: string;
    title: string;
    city: string;
    country: string;
    basePrice: number;
    currency: string;
    category: string;
    description?: string;
    media: Array<{
      id: string;
      url: string;
      type: string;
    }>;
  };
  addedAt: Date;
}