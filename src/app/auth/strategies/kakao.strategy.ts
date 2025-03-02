import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { KakaoOAuthUser } from '../types/oauth-user.type';

@Injectable()
export class KakaoOAuthStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor() {
        super({
            clientID: process.env.KAKAO_API_KEY!,
            clientSecret: process.env.KAKAO_API_SECRET!,
            callbackURL: process.env.KAKAO_CALLBACK_URI!,
        });
    }

    async validate(_accessToken: string, _refreshToken: string, profile: any): Promise<KakaoOAuthUser> {
        return {
            no: profile.id,
            email: profile._json.kakao_account.email,
            name: profile.username ?? undefined,
        };
    }
}
