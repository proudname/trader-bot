import {DataSourceOptions} from "typeorm";


export type Env = {
    NODE_ENV: 'test' | 'development' | 'production';
    TIN_SOCKET_KEY: string
    TIN_SANDBOX_KEY: string
    TIN_KEY: string;
    POLYGON_KEY: string;
    JWT_KEY: string;
    DB_CONNECTION: DataSourceOptions['type'];
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: DataSourceOptions['database'];
    DB_PORT: string;
    DB_SYNCHRONIZE: string;
    DB_LOGGING: string;
    DB_AUTOLOAD_ENTITIES: string;
    SUPER_ADMIN_CREATE: string;
    SUPER_ADMIN_LOGIN: string;
    SUPER_ADMIN_EMAIL: string;
    SUPER_ADMIN_PASSWORD: string;
}