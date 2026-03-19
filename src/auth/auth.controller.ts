import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: any) {
        return await this.authService.login(body);
    }

    @Post('logout')
    async logout(@Req() req: Request) {
        return await this.authService.logout(req);
    }
}
