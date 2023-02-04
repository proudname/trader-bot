import { PrimaryGeneratedColumn, BaseEntity as TypeormBaseEntity } from 'typeorm';


export abstract class BaseEntity extends TypeormBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

export default BaseEntity;
