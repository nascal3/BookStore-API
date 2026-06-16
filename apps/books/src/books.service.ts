import { Injectable, NotFoundException } from '@nestjs/common';
import { BookDto, CreateBookDto, UpdateBookDto } from '@app/contracts';

@Injectable()
export class BooksService {
  private books: BookDto[] = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      rating: 5
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      rating: 4
    }
  ];

  create(createBookDto: CreateBookDto): BookDto {
    const newBook: BookDto = {
      ...createBookDto,
      id: this.books.length + 1
    }
    this.books.push(newBook);

    return newBook;
  }

  findAll(): BookDto[] {
    return this.books;
  }

  findOne(id: number): BookDto | undefined {
    return this.books.find(book => book.id === id);
  }

  update(id: number, updateBookDto: UpdateBookDto): BookDto {
    const bookToUpdate = this.books.find(book => book.id === id);
    if (!bookToUpdate) {
      throw new NotFoundException(`Book #${id} not found`);
    }

    const updatedBook: BookDto = {
      ...bookToUpdate,
      ...updateBookDto
    }

    this.books = this.books.map(book => book.id === id ? updatedBook : book);

    return updatedBook;
  }

  remove(id: number): string {
    this.books = this.books.filter(book => book.id !== id);
    return `This action removes a #${id} book`;
  }
}
