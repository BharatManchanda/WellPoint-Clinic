import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthMiddleware } from 'src/common/middleware/auth/auth.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService, AuthMiddleware],
    exports: [UsersService, MongooseModule],
})

export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(AuthMiddleware)
        .forRoutes('users'); // ✅ applies to all /users routes
    }
}
