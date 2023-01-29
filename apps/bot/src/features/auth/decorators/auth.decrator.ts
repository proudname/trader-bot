import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (...roles: string[]) => applyDecorators(
  Roles(roles),
  UseGuards(JwtAuthGuard, RolesGuard)
)
