import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator((data: unknown, context: ExecutionContext): number | undefined => {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];

    return userId ? Number(userId) : undefined;
});
