import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto, ApplyPromoCodeDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCart(@Request() req) {
    const userId = req.user.id;
    return this.cartService.getCart(userId);
  }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  async addToCart(@Body() addToCartDto: AddToCartDto, @Request() req) {
    const userId = req.user.id;
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Put('item/:itemId')
  @HttpCode(HttpStatus.OK)
  async updateCartItem(
    @Param('itemId') itemId: string,
    @Body() updateDto: UpdateCartItemDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.cartService.updateCartItem(userId, itemId, updateDto);
  }

  @Delete('item/:itemId')
  @HttpCode(HttpStatus.OK)
  async removeFromCart(@Param('itemId') itemId: string, @Request() req) {
    const userId = req.user.id;
    return this.cartService.removeFromCart(userId, itemId);
  }

  @Delete('clear')
  @HttpCode(HttpStatus.OK)
  async clearCart(@Request() req) {
    const userId = req.user.id;
    await this.cartService.clearCart(userId);
    return { message: 'Cart cleared successfully' };
  }

  @Post('promo')
  @HttpCode(HttpStatus.OK)
  async applyPromoCode(@Body() promoDto: ApplyPromoCodeDto, @Request() req) {
    const userId = req.user.id;
    return this.cartService.applyPromoCode(userId, promoDto);
  }

  @Delete('promo')
  @HttpCode(HttpStatus.OK)
  async removePromoCode(@Request() req) {
    const userId = req.user.id;
    return this.cartService.removePromoCode(userId);
  }
}