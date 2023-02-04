import {DataSourceOptions} from "typeorm";


export type Env = {
    TIN_SOCKET_KEY: string
    TIN_SANDBOX_KEY: string
    TIN_KEY: string;
    POLYGON_KEY: string;
    DB_CONNECTION: DataSourceOptions['type'];
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: DataSourceOptions['database'];
    DB_PORT: string;
    DB_SYNCHRONIZE: string;
    DB_LOGGING: string;
    DB_AUTOLOAD_ENTITIES: string;
}