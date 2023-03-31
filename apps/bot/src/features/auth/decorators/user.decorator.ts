import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const User = createParamDecorator(async (nullable: boolean, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})
