import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class KakaoAuthGuard extends AuthGuard('kakao') {
    handleRequest(err: any, user: any, _info: any, _context: any) {
        console.log(err, user, _info);

        //사용자 취소
        if (err || !user) {
            return null;
        }

        return user;
    }
}
