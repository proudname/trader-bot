import { User } from '../user/entity/user.entity';

export type AuthModuleOptions = {
  jwtKey: string
}

export type AuthUserData = Omit<User, 'password'>

export type JwtPayloadData = { login: string, sub: number }