import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      console.error('JWT Auth Error:', { err, user, info });
      
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired. Please log in again.');
      }
      
      if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token. Please log in again.');
      }
      
      if (info?.message === 'No auth token') {
        throw new UnauthorizedException('Please log in to book a tour');
      }
      
      throw new UnauthorizedException('Authentication failed. Please log in to continue.');
    }
    
    return user;
  }
}
