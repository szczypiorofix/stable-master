import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// example structure of user payload
export interface UserPayload {
    id: number;
    email: string;
    stableId: number;
    role?: string;
}

export const User = createParamDecorator((data: keyof UserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserPayload }>();
    const user = request.user;
    return data ? user?.[data] : user;
});
