import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoOAuthStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor() {
        super({
            clientID: process.env.KAKAO_API_KEY!,
            callbackURL: process.env.KAKAO_CALLBACK_URI!,
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        return profile;
    }
}
