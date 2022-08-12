import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);

  constructor(private api: ApiService) { }

  getBookListObservable(): Observable<Book[]> {
    return this.books.asObservable();
  }

  getAllBooks(): void {
    this.api.getAllBooks()
      .subscribe((res: Book[]) => {
        this.books.next(res);
      });
  }

  addBook(book: Book): void {
    this.api.addBook(book)
      .subscribe((res: Book) => {
        this.getAllBooks();
      });
  }

  updateBook(id: number, book: Book): void {
    this.api.updateBook(id, book)
      .subscribe((res: Book) => {
        this.getAllBooks();
      });
  }

  deleteBook(id: number): void {
    this.api.removeBook(id)
      .subscribe((res: any) => {
        this.getAllBooks();
      });
  }
}
