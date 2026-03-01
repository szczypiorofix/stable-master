import { Body, Controller, Post } from '@nestjs/common';

import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    public async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
