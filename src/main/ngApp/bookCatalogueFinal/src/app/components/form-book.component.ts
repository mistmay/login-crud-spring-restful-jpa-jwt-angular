import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BookService } from '../services/book.service';
import { ModalService } from '../services/modal.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Book } from '../model/book';
import { Author } from '../model/author';
import { Genre } from '../model/genre';
import { forkJoin, Subscription } from 'rxjs';
import { checkboxListValidator } from '../validators/checkbox-list-validator';

@Component({
  selector: 'app-form-book',
  template: `
  <ng-container *ngIf="isUpdate && authorsList && genresList; else loading">
    <form *ngIf="authorsList.length > 0 && genresList.length > 0; else noForm" class="d-flex flex-column align-items-center gap-3 p-5 border border-secondary rounded" [formGroup]="form" (ngSubmit)="addBook()">
      <h3 class="fw-bold">Add New Book:</h3>
      <div class="d-flex justify-content-center align-items-center flex-column gap-2">
        <label for="title">Title:</label>
        <span class="text-danger" *ngIf="form.controls['title'].dirty && form.hasError('required', 'title')">*Required<br></span>
        <span class="text-danger" *ngIf="form.controls['title'].dirty && form.hasError('minlength', 'title')">At least 3 characters<br></span>
        <input type="text" id="title" placeholder="Title" formControlName="title" class="rounded p-2 text-center">
      </div>
      <div class="d-flex justify-content-center align-items-center flex-column gap-2">
        <label for="author">Author:</label>
        <span class="text-danger" *ngIf="form.controls['author'].touched && form.hasError('required', 'author')">*Required<br></span>
        <select id="author" formControlName="author" class="rounded p-2">
          <option *ngFor="let author of authorsList" [value]="author.id">{{author.name + " " + author.surname}}</option>
        </select>
      </div>
      <div formArrayName="genres" class="d-flex flex-column align-items-center gap-2">
      <span class="text-danger" *ngIf="form.controls['genres'].touched && form.hasError('notChecked', 'genres')">*Required<br></span>
        <div class="d-flex align-items-center gap-2" *ngFor="let genre of genres.controls; let i = index">
          <input type="checkbox" [formControlName]="i">
          {{genresList[i].name}}
        </div>
      </div>
      <button *ngIf="isUpdate[0]" type="submit" [disabled]="form.invalid" class="btn btn-primary">Update Book</button>
      <button *ngIf="!isUpdate[0]" type="submit" [disabled]="form.invalid" class="btn btn-primary">Add Book</button>
    </form>
  </ng-container>
  <ng-template #noForm>
    <p class="text-center fw-bold">You need to add at least one author and one genre in order to add a new book</p>
  </ng-template>
  <ng-template #loading>
  <p class="text-center">Loading...</p>
  </ng-template>
  `,
  styles: [`
  form {
    overflow-x: hidden;
    overflow-y: auto;
  }
  `]
})
export class FormBookComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isUpdate!: [boolean, Book | undefined];
  authorsList!: Author[];
  genresList!: Genre[];
  subscriptions: Subscription[] = [];

  constructor(private api: ApiService, private bookService: BookService, private modalService: ModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscriptions.push(this.modalService.getIsUpdateObservable()
      .subscribe((res: [boolean, Book | undefined]) => {
        this.isUpdate = res;
        this.subscriptions.push(this.api.getAllAuthors()
          .subscribe((res: Author[]) => {
            this.authorsList = res;
            this.subscriptions.push(this.api.getAllGenres()
              .subscribe((res: Genre[]) => {
                this.genresList = res;
                const currentTitle: String = this.isUpdate[0] && this.isUpdate[1] ? this.isUpdate[1].title : '';
                const currenAuthor: String = this.isUpdate[0] && this.isUpdate[1] ? String(this.isUpdate[1].author.id) : '';
                this.form = this.fb.group({
                  title: [currentTitle, Validators.compose([Validators.required, Validators.minLength(3)])],
                  author: [currenAuthor, Validators.required],
                  genres: this.fb.array([], Validators.compose([Validators.required, checkboxListValidator()]))
                });
                this.genresList.forEach((genre: Genre) => {
                  if (this.isUpdate[0] && this.isUpdate[1]) {
                    this.addGenre(this.checkToCheck(genre));
                  } else {
                    this.addGenre(false);
                  }
                });
              }));
          }));
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  get genres(): FormArray {
    return this.form.controls['genres'] as FormArray;
  }

  addGenre(isChecked: boolean): void {
    this.genres.push(new FormControl(isChecked));
  }

  checkToCheck(genre: Genre): boolean {
    if (this.isUpdate[0] && this.isUpdate[1]) {
      return !!this.isUpdate[1].genres.find((current: Genre) => current.id === genre.id);
    } else {
      return false;
    }
  }

  addBook(): void {
    const currentGenres: Genre[] = [];
    this.form.value.genres.forEach((element: FormControl, index: number) => {
      if (element) {
        currentGenres.push(this.genresList[index]);
      }
    });
    const currentAuthor: Author | undefined = this.authorsList.find((author: Author) => author.id === Number(this.form.value.author));
    if (currentAuthor) {
      const definitiveAuthor: Author = currentAuthor;
      const book: Book = { title: this.form.value.title, author: definitiveAuthor, genres: currentGenres };
      if (this.isUpdate[0] && this.isUpdate[1] && this.isUpdate[1].id) {
        this.bookService.updateBook(this.isUpdate[1].id, book);
      } else {
        this.bookService.addBook(book);
      }
    }
    this.form.reset();
    this.modalService.closeModal();
  }

}
