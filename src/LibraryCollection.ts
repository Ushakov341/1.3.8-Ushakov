type BookInfo = { id: string; title: string; author: string };

export class LibraryCollection {
  private books: Map<string, { title: string; author: string }> = new Map();

  addBook(title: string, author: string): string | Error {
    for (const book of this.books.values()) {
      if (book.title === title) {
        return new Error('Книга с таким названием уже существует');
      }
    }
    const id = crypto.randomUUID();
    this.books.set(id, { title, author });
    return id;
  }

  removeBook(id: string): void {
    this.books.delete(id);
  }

  getBookInfo(id: string): { title: string; author: string } | null {
    return this.books.get(id) ?? null;
  }

  getAllBooks(): Array<{ id: string; title: string; author: string }> {
    return Array.from(this.books.entries()).map(([id, book]) => ({
      id,
      title: book.title,
      author: book.author,
    }));
  }

  getBooksCount(): number {
    return this.books.size;
  }
}
