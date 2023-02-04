import {Test, TestingModule} from '@nestjs/testing';
import {AuthService, FindUserByCredentialsParams} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "./strategies/local.strategy";
import {AuthController} from "./auth.controller";
import {User} from "../user/entity/user.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {withTestMeta} from "../../../../../libs/shared/src/utils/test.util";

jest.mock("../user/entity/user.entity")

describe('AuthService', () => {

    const options = {jwtKey: '123'};

    let service: AuthService;
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule(withTestMeta({
            imports: [
                PassportModule,
                JwtModule.register({
                    secret: options.jwtKey,
                    signOptions: {expiresIn: '3h'},
                })
            ],
            providers: [
                LocalStrategy,
                AuthService,
                {
                    provide: getRepositoryToken(User),
                    useValue: User
                }
            ],
            controllers: [AuthController],
        })).compile();

        service = module.get<AuthService>(AuthService);

        const {User: ActualUser} = jest.requireActual("../user/entity/user.entity");

        jest.spyOn(User.prototype, 'setPassword')
            .mockImplementation(ActualUser.prototype.setPassword)

        jest.spyOn(User, 'comparePasswords')
            .mockImplementation(ActualUser.comparePasswords)

    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should register a user', async () => {

        jest.spyOn(User.prototype, 'save')
            .mockImplementation(async function () {
                const user = new User();
                user.id = 1;
                Object.assign(this, user);
                return user;
            })

        const user = await service.signUp({
            firstname: 'TestName',
            lastname: 'TestLastName',
            login: 'test@test.test',
            password: '123456'
        })

        expect(user.id).toBeDefined();
    });

    it('should login a user', async () => {

        const user = new User();
        user.id = 1;
        user.login = 'test@test.test';

        const loginResult = await service.login(user);

        expect(loginResult.access_token).toBeDefined();
    });

    it('should find a user by credentials', async () => {

        const findParams: FindUserByCredentialsParams = {
            login: 'test@test.test',
            password: 'password'
        }

        const user = new User();
        user.id = 1;
        user.login = findParams.login;
        await user.setPassword(findParams.password);

        jest.spyOn(User, 'findByCredentials')
            .mockImplementation(async () => user)

        const foundUser = await service.findUserByCredentials(findParams);

        expect(foundUser).toBeInstanceOf(User);
    });
});
