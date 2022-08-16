import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Response } from '../model/response';
import { Author } from '../model/author';
import { Book } from '../model/book';
import { Genre } from '../model/genre';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "http://localhost:8080/api";
  uriAuth: string = "/auth";
  urlAuth: string = this.url + this.uriAuth;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<Response> {
    return this.http.post<Response>(`${this.urlAuth}/login`, user);
  }

  register(user: User): Observable<Response> {
    return this.http.post<Response>(`${this.urlAuth}/register`, user);
  }

  isTokenExpired(token: string): Observable<Response> {
    return this.http.get<Response>(`${this.urlAuth}/istokenexpired/${token}`);
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.url}/author`);
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.url}/genre`);
  }

  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(`${this.url}/author`, author);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.url}/book`, book);
  }

  addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`${this.url}/genre`, genre);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.url}/book/${id}`, book);
  }

  removeBook(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/book/${id}`);
  }

  getAllBooksByUserId(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}/book/${id}`);
  }

}
