import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor() {}

    @Post('login')
    async login(@Body() body: any) {
        try {
            console.log(body,"::body");
        } catch (error) {
            
        }
    }

    @Post('logout')
    async logout() {
        try {
            
        } catch (error) {
            
        }
    }
}
