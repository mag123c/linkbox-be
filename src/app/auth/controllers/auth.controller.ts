import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { isProduction } from '../../../common/utils/env.util';
import { KakaoAuthGuard } from '../guards/kakao.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(KakaoAuthGuard)
    @Get('/login/kakao')
    async signinWithKakao(@Req() req: Request) {}

    @UseGuards(KakaoAuthGuard)
    @Get('/login/callback')
    async signinCallback(@Req() req: Request, @Res() res: Response) {
        const accessToken = await this.authService.signin(req.user);
        const domain = process.env.NODE_ENV === 'production' ? process.env.WEBVIEW_URL : 'localhost';
        console.log('domain', domain);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain,
        });

        return { url: isProduction() ? process.env.WEBVIEW_URL : 'http://localhost:5173' };
    }
}
