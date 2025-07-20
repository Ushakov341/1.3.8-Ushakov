"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryCollection = void 0;
class LibraryCollection {
    books = new Map();
    addBook(title, author) {
        for (const book of this.books.values()) {
            if (book.title === title) {
                return new Error('Книга с таким названием уже существует');
            }
        }
        const id = crypto.randomUUID();
        this.books.set(id, { title, author });
        return id;
    }
    removeBook(id) {
        this.books.delete(id);
    }
    getBookInfo(id) {
        return this.books.get(id) ?? null;
    }
    getAllBooks() {
        return Array.from(this.books.entries()).map(([id, book]) => ({
            id,
            title: book.title,
            author: book.author,
        }));
    }
    getBooksCount() {
        return this.books.size;
    }
}
exports.LibraryCollection = LibraryCollection;
