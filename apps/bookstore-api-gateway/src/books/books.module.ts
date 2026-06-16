import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { BOOK_CLIENT } from './constants';
import { ClientConfigService } from '../client-config/client-config.service';
import { ClientConfigModule } from '../client-config/client-config.module';

@Module({
  imports: [ClientConfigModule],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: BOOK_CLIENT,
      useFactory: (config: ClientConfigService) => {
        const clientOptions = config.bookClientOptions;
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    },
  ],
})
export class BooksModule {}
