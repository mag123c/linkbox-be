import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

// 쿠키에서 토큰을 추출하는 커스텀 extractor 함수
const cookieExtractor = (req: any): string | null => {
    if (req && req.headers && req.headers.cookie) {
        const cookies = req.headers.cookie?.split(';').map((cookie: string) => cookie.trim());
        const tokenCookie = cookies?.find((cookie: string) => cookie.startsWith('accessToken='));
        if (tokenCookie) {
            return tokenCookie.split('=')[1];
        }
    }
    return null;
};

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            algorithms: [configService.get('JWT_ALGORITHM')!],
            secretOrKey: configService.get('JWT_SECRET')!,
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
