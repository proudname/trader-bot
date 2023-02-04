import { Entity, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../enums';
import BaseEntity from '@shared/base.entity';


export type FindByCredentialsParams = {
  login: string
}

@Entity()
export class User extends BaseEntity {

  @Column({ unique: true })
  login: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstname?: string

  @Column()
  lastname?: string

  @Column({ unique: true })
  email?: string

  @Column({type: 'enum', enum: UserRole, array: true, default: [UserRole.USER] })
  roles: UserRole[]


  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
  }

  static async comparePasswords(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  static findByCredentials(credentials: FindByCredentialsParams) {
    return this.createQueryBuilder('u')
        .addSelect('u.password')
        .where('u.login = :login', { login: credentials.login })
        .getOne();
  }

}
