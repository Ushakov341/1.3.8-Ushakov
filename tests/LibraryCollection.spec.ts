import { describe, it, expect, beforeEach } from 'vitest';
import { LibraryCollection } from '../src/LibraryCollection';

describe('LibraryCollection', () => {
  it('добавляет новую книгу и возвращает id', () => {
    const lib = new LibraryCollection();
    const id = lib.addBook('1984', 'George Orwell');
    expect(typeof id).toBe('string');
    expect(lib.getBooksCount()).toBe(1);
  });

  it('не позволяет добавить книгу с тем же названием', () => {
    const lib = new LibraryCollection();
    lib.addBook('1984', 'George Orwell');
    const result = lib.addBook('1984', 'George Orwell');
    expect(result).toBeInstanceOf(Error);
    expect(lib.getBooksCount()).toBe(1);
  });

  it('удаляет книгу по id', () => {
    const lib = new LibraryCollection();
    const id = lib.addBook('1984', 'George Orwell');
    lib.removeBook(id as string);
    expect(lib.getBooksCount()).toBe(0);
    expect(lib.getBookInfo(id as string)).toBeNull();
  });

  it('возвращает информацию о книге по id', () => {
    const lib = new LibraryCollection();
    const id = lib.addBook('1984', 'George Orwell');
    const book = lib.getBookInfo(id as string);
    expect(book).toEqual({ title: '1984', author: 'George Orwell' });
  });

  it('возвращает все книги', () => {
    const lib = new LibraryCollection();
    const id1 = lib.addBook('1984', 'George Orwell');
    const id2 = lib.addBook('Brave New World', 'Aldous Huxley');
    const books = lib.getAllBooks();
    expect(books.length).toBe(2);
    expect(books).toEqual(
      expect.arrayContaining([
        { id: id1, title: '1984', author: 'George Orwell' },
        { id: id2, title: 'Brave New World', author: 'Aldous Huxley' },
      ])
    );
  });

  it('возвращает количество книг', () => {
    const lib = new LibraryCollection();
    lib.addBook('1984', 'George Orwell');
    lib.addBook('Brave New World', 'Aldous Huxley');
    expect(lib.getBooksCount()).toBe(2);
  });
});
