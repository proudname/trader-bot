import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { SocialProvider } from '../enums';
import BaseEntity from '@shared/base.entity';

@Entity()
export class UserSocial extends BaseEntity {

  @Column({ type: 'enum', enum: SocialProvider, nullable: false })
  provider: SocialProvider;

  @Column({ nullable: false })
  providerUserId: string;

  @ManyToOne(type => User)
  user: User;

}
