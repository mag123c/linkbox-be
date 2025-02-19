import { Controller, Post } from '@nestjs/common';
import { UserId } from '../../../common/decorators/user.decorator';
import { HttpNoContentResponse } from '../../../common/dtos/http-response.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@UserId() userId: number) {
        await this.usersService.createUser(userId);
        return HttpNoContentResponse.of();
    }
}
