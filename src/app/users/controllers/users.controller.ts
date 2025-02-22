import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { UserId } from '../../../common/decorators/user.decorator';
import { HttpOkResponse } from '../../../common/dtos/http-response.dto';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { UpdateUserReq } from '../dto/users.dto';
import { UsersService } from '../services/users.service';

@UseGuards(JwtAuthGuard)
@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    async getUsers(@UserId() userId: number) {
        const users = await this.usersService.getUser(userId);
        return users;
    }

    @Patch('update/:userId')
    async updateUser(
        @UserId() userId: number,
        @Param('userId', new ParseIntPipe()) _userId: number,
        @Body() req: UpdateUserReq,
    ) {
        const user = await this.usersService.updateUser(userId, req);
        return HttpOkResponse.of(user);
    }
}
