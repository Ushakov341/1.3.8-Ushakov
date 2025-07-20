import { describe, it, expect, beforeEach } from 'vitest';
import { LibraryCollection } from '../src/LibraryCollection';

describe('LibraryCollection', () => {
  it('Добавляет новю книгу и возвращает id', () => {
    const lib = new LibraryCollection();
    const id = lib.addBook('1925', 'Михаил Булгаков');
    expect(typeof id).toBe('string');
    expect(lib.getBooksCount()).toBe(1);
  });

  it('Не позволяет добавить книгу с таким же названием', () => {
    const lib = new LibraryCollection();
    lib.addBook('1925', 'Михаил Булгаков');
    const result = lib.addBook('1925', 'Михаил Булгаков');
    expect(result).toBeInstanceOf(Error);
    expect(lib.getBooksCount()).toBe(1);
  });

  it('Удаляет книгу по id', () => {
    const lib = new LibraryCollection();
    const id = lib.addBook('1925', 'Михаил Булгаков');
    lib.removeBook(id as string);
    expect(lib.getBooksCount()).toBe(0);
    expect(lib.getBookInfo(id as string)).toBeNull();
  });

  it('Возвращает инфомацию о книге по id', () => {
    const lib = new LibraryCollection();
    const id = lib.addBook('1925', 'Михаил Булгаков');
    const book = lib.getBookInfo(id as string);
    expect(book).toEqual({ title: '1925', author: 'Михаил Булгаков' });
  });

  it('Возвращает все книги', () => {
    const lib = new LibraryCollection();
    const id1 = lib.addBook('1925', 'Михаил Булгаков');
    const id2 = lib.addBook('Хоббит, или Туда и обратно', 'Джон Толкин');
    const books = lib.getAllBooks();
    expect(books.length).toBe(2);
    expect(books).toEqual(
      expect.arrayContaining([
        { id: id1, title: '1925', author: 'Михаил Булгаков' },
        { id: id2, title: 'Хоббит, или Туда и обратно', author: 'Джон Толкин' },
      ])
    );
  });

  it('Возвращает количество книг', () => {
    const lib = new LibraryCollection();
    lib.addBook('1925', 'Михаил Булгаков');
    lib.addBook('Хоббит, или Туда и обратно', 'Джон Толкин');
    expect(lib.getBooksCount()).toBe(2);
  });
});
