import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as _ from 'lodash'
import { User as UserEntity } from '../../user/entity/user.entity';

export const User = createParamDecorator(async (nullable: boolean, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  if (!_.has(req, 'user.userId')) {
    if (nullable) return null;
    throw new UnauthorizedException('User not found, but used in method');
  }
  return UserEntity.findOne(req.user.userId);
})
