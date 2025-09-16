import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddToWishlistDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getWishlist(@Request() req) {
    const userId = req.user.id;
    return this.wishlistService.getWishlist(userId);
  }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  async addToWishlist(@Body() addToWishlistDto: AddToWishlistDto, @Request() req) {
    const userId = req.user.id;
    return this.wishlistService.addToWishlist(userId, addToWishlistDto);
  }

  @Delete('tour/:tourId')
  @HttpCode(HttpStatus.OK)
  async removeFromWishlist(@Param('tourId') tourId: string, @Request() req) {
    const userId = req.user.id;
    return this.wishlistService.removeFromWishlist(userId, tourId);
  }

  @Delete('clear')
  @HttpCode(HttpStatus.OK)
  async clearWishlist(@Request() req) {
    const userId = req.user.id;
    await this.wishlistService.clearWishlist(userId);
    return { message: 'Wishlist cleared successfully' };
  }

  @Get('check/:tourId')
  @HttpCode(HttpStatus.OK)
  async isInWishlist(@Param('tourId') tourId: string, @Request() req) {
    const userId = req.user.id;
    const isInWishlist = await this.wishlistService.isInWishlist(userId, tourId);
    return { isInWishlist };
  }
}