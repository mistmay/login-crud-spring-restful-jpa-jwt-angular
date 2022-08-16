import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../model/book';
import { LoginService } from './login.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  currentUser!: User | undefined;

  constructor(private api: ApiService, private loginService: LoginService) { }

  getBookListObservable(): Observable<Book[]> {
    return this.books.asObservable();
  }

  getAllBooks(): void {
    if (this.currentUser && this.currentUser.id) {
      this.api.getAllBooksByUserId(this.currentUser.id)
        .subscribe((res: Book[]) => {
          this.books.next(res);
        });
    }
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
