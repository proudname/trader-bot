import {PrimaryGeneratedColumn} from 'typeorm';


export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
}

export default BaseEntity;
