import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { UserEntity } from '../typeorm';

import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
            relations: ['stable'],
        });

        if (!user) {
            console.warn('Unauthorized access!');
            throw new UnauthorizedException('Wrong email and/or password');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Wrong email and/or password');
        }

        await this.userRepository.update(user.id, {
            last_login: new Date(),
        });

        const payload = {
            sub: user.id,
            email: user.email,
            stableId: user.stable ? user.stable.id : null,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
