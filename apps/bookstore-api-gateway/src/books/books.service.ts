import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { BOOKS_PATTERN } from '@app/contracts';

@Injectable()
export class BooksService {
  constructor(@Inject('BOOK_CLIENT') private booksClient: ClientProxy) {}

  create(createBookDto: CreateBookDto) {
    return this.booksClient.send(BOOKS_PATTERN.CREATE, createBookDto);
  }

  findAll() {
    return this.booksClient.send(BOOKS_PATTERN.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.booksClient.send(BOOKS_PATTERN.FIND_ONE, id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksClient.send(BOOKS_PATTERN.UPDATE, { id, updateBookDto });
  }

  remove(id: number) {
    return this.booksClient.send(BOOKS_PATTERN.REMOVE, id);
  }
}
