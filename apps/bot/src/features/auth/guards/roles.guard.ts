import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../../user/entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user: { userId: number } | null = request.user;

        if (!roles || !roles.length) {
            return true;
        }

        if (!user) {
            throw new UnauthorizedException('Unauthorized');
        }

        const existCount = await this.userRepository.createQueryBuilder('u')
            .where('u.id = :id', {id: user.userId})
            .andWhere(`u.roles && array[:...role_array]::user_entity_roles_enum[]`, {role_array: roles})
            .getCount();

        return Boolean(existCount);
    }
}
