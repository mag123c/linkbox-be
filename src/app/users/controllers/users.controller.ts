import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserId } from '../../../common/decorators/user.decorator';
import { HttpOkResponse } from '../../../common/dtos/http-response.dto';
import { UserGuard } from '../../../common/guards/user.guard';
import { CreateUserReq, UpdateUserReq } from '../dto/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(UserGuard)
    @Get()
    async getUsers(@Query('deviceId') uuid: string) {
        const users = await this.usersService.getUserByUUID(uuid);
        return users;
    }

    @Post()
    async createUser(@Body() req: CreateUserReq, @Res() res: Response) {
        const user = await this.usersService.createUser(req);
        this.setCookie(res, user);
        return res.status(201).send(HttpOkResponse.of(user));
    }

    @Patch('update/:userId')
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
            sameSite: 'none',
            domain: '.yotubue-bookmarker-react.vercel.app',
            path: '/',
        });
    }
}
