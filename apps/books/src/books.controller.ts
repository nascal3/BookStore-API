import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BooksService } from './books.service';
import { BOOKS_PATTERNS, BookDto, UpdateBookDto, CreateBookDto } from '@app/contracts';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern(BOOKS_PATTERNS.CREATE)
  create(@Payload() createBookDto: CreateBookDto): BookDto {
    return this.booksService.create(createBookDto);
  }

  @MessagePattern(BOOKS_PATTERNS.FIND_ALL)
  findAll(): BookDto[] {
    return this.booksService.findAll();
  }

  @MessagePattern(BOOKS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number): BookDto {
    const bookResult = this.booksService.findOne(id);
    if (!bookResult) {
      throw new NotFoundException(`Book #${id} not found`);
    }
    return bookResult;
  }

  @MessagePattern(BOOKS_PATTERNS.UPDATE)
  update(@Payload() updateBookDto: UpdateBookDto): BookDto {
    return this.booksService.update(updateBookDto.id, updateBookDto);
  }

  @MessagePattern(BOOKS_PATTERNS.REMOVE)
  remove(@Payload() id: number): string {
    return this.booksService.remove(id);
  }
}
