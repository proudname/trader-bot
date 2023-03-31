import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import * as bcrypt from 'bcrypt';
import {ConfigModule} from "@nestjs/config";
import {getRepositoryToken} from "@nestjs/typeorm";
import {User} from "./entity/user.entity";

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot()],
            providers: [UserService, {
                provide: getRepositoryToken(User),
                useValue: {}
            }],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should gen salt', async function () {
        await bcrypt.genSalt(10);
        expect(1).toBe(1);
    });

});
