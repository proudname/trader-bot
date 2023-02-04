import {User} from '../user/entity/user.entity';

export type AuthUserData = Omit<User, 'password'>

export type JwtPayloadData = { login: string, sub: number }