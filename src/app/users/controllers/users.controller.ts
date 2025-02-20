import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { UserId } from '../../../common/decorators/user.decorator';
import { UsersService } from '../services/users.service';
import { UserGuard } from '../../../common/guards/user.guard';
import { Response } from 'express';
import { HttpOkResponse } from '../../../common/dtos/http-response.dto';
import { CreateUserReq, UpdateUserReq } from '../dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(UserGuard)
    @Get()
    async getUsers(@UserId() userId: number) {
        const users = await this.usersService.getUser(userId);
        return users;
    }

    @Post()
    async createUser(@Body() req: CreateUserReq, @Res() res: Response) {
        const user = await this.usersService.createUser(req);
        this.setCookie(res, user);
        return res.status(201).send(HttpOkResponse.of(user));
    }

    @Patch(':userId')
    async updateUser(
        @UserId() userId: number,
        @Param('userId', new ParseIntPipe()) _userId: number,
        @Body() req: UpdateUserReq,
        @Res() res: Response,
    ) {
        const user = await this.usersService.updateUser(userId, req);
        this.setCookie(res, user);

        return res.status(200).send(HttpOkResponse.of(user));
    }

    private setCookie(res: Response, user: any) {
        res.cookie('links_user', JSON.stringify(user), {
            httpOnly: true,
            secure: true,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        });
    }
}
