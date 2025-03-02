import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserReq, UsersRes } from '../../users/dto/users.dto';
import { Users } from '../../users/entities/users.entity';
import { UsersService } from '../../users/services/users.service';
import { KakaoOAuthUser } from '../types/oauth-user.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signin({ no, email, name }: KakaoOAuthUser) {
        const user = await this.userService.getUserByUUID(no);

        if (user) {
            return await this.signToken(user);
        }

        const savedUser = await this.userService.createUser(new CreateUserReq({ uuid: no, email, name }));

        return await this.signToken(savedUser);
    }

    async signToken(user: Users | UsersRes) {
        const payload = { id: user.id };
        return await this.jwtService.signAsync(payload);
    }
}
