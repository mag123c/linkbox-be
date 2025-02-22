import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserReq, UsersRes } from '../../users/dto/users.dto';
import { Users } from '../../users/entities/users.entity';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signin({ id }: any) {
        const user = await this.userService.getUserByUUID(id);

        if (user) {
            return await this.signToken(user);
        }

        const savedUser = await this.userService.createUser(new CreateUserReq({ uuid: id }));

        return await this.signToken(savedUser);
    }

    async signToken(user: Users | UsersRes) {
        const payload = { id: user.id };
        return await this.jwtService.signAsync(payload);
    }
}
