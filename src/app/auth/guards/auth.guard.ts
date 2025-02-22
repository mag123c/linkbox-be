import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedError } from '../../../common/errors/classes/error';
import { ErrorCode } from '../../../common/errors/enum/error-code.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: { message: string }, context: any) {
        if (info?.message === 'jwt expired') {
            throw new UnauthorizedError(ErrorCode.TokenExpired, 'Token expired');
        }
        if (err || !user) {
            throw new UnauthorizedError(ErrorCode.UnauthorizedCommon, 'Unauthorized access');
        }
        return user;
    }
}
