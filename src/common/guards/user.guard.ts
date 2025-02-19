import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnauthorizedError } from '../errors/classes/error';
import { ErrorCode } from '../errors/enum/error-code.enum';

@Injectable()
export class UserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.headers['x-user-id'];

        if (!userId) {
            throw new UnauthorizedError(ErrorCode.UnauthorizedCommon, 'Unauthorized');
        }

        return true;
    }
}
