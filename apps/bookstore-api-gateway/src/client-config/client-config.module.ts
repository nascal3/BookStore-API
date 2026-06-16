import { Module } from '@nestjs/common';
import { ClientConfigService } from './client-config.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      validationSchema: Joi.object({
        BOOKS_CLIENT_PORT: Joi.number().default(3002),
        USERS_CLIENT_PORT: Joi.number().default(3001),
      }),
    })
  ],
  providers: [ClientConfigService],
  exports: [ClientConfigService]
})
export class ClientConfigModule {}
