import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { USER_CLIENT } from './constants';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';

@Module({
  imports: [ClientConfigModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USER_CLIENT,
      useFactory: (config: ClientConfigService) => {
        const clientOptions = config.userClientOptions;
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    }
  ],
})
export class UsersModule {}
