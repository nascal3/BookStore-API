import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './dto/book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [
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

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      ...createBookDto,
      id: this.books.length + 1
    }
    this.books.push(newBook);

    return newBook;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  update(id: number, updateBookDto: UpdateBookDto): Book {
    const bookToUpdate = this.books.find(book => book.id === id);
    if (!bookToUpdate) {
      throw new NotFoundException(`Book #${id} not found`);
    }

    const updatedBook: Book = {
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
