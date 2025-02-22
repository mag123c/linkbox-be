import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator((data: unknown, context: ExecutionContext): number | undefined => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user?.id;
});
