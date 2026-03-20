import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from 'src/users/users.schema';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers['authorization'];
      const token = authorization?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const decoded: any = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET, // use env variable
      });

      const user = await this.userModel.findById(decoded._id).exec();

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      req['user'] = user;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}