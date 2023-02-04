import { ConfigModule } from '@nestjs/config';
import { ModuleMetadata } from '@nestjs/common';
import _ from 'lodash';
import {getEnvFilePath} from "./env.util";

export const withTestMeta = (meta: ModuleMetadata): ModuleMetadata => {
  return _.merge({
    imports: [
      ConfigModule.forRoot(
      {
        envFilePath: getEnvFilePath(),
      }
    )]
  }, meta);
}
