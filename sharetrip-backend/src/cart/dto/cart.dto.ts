import { IsString, IsInt, IsOptional, Min, IsDateString } from 'class-validator';

export class AddToCartDto {
  @IsString()
  tourId: string;

  @IsInt()
  @Min(1)
  quantity: number = 1;

  @IsInt()
  @Min(1)
  headcount: number = 1;

  @IsOptional()
  @IsDateString()
  startTime?: string;
}

export class UpdateCartItemDto {
  @IsInt()
  @Min(1)
  quantity: number;

  @IsInt()
  @Min(1)
  headcount: number;

  @IsOptional()
  @IsDateString()
  startTime?: string;
}

export class ApplyPromoCodeDto {
  @IsString()
  promoCode: string;
}

export class CartResponseDto {
  id: string;
  userId: string;
  items: CartItemResponseDto[];
  promoCode?: string;
  discount: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CartItemResponseDto {
  id: string;
  tourId: string;
  tour: {
    id: string;
    title: string;
    city: string;
    country: string;
    basePrice: number;
    currency: string;
    maxGroup: number;
    minGroup: number;
  };
  quantity: number;
  headcount: number;
  priceAtAdd: number;
  startTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}