import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Book } from 'src/app/model/book';
import { Author } from 'src/app/model/author';
import { Genre } from 'src/app/model/genre';
import { Subscription, combineLatest, take } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { ModalService } from 'src/app/services/modal.service';
import { BookService } from 'src/app/services/book.service';
import { checkboxListValidator } from 'src/app/validators/checkbox-list-validator';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-form-book',
  template: `
  <ng-container *ngIf="isUpdate && authorsList && genresList && currentUser; else loading">
    <h1 mat-dialog-title>Add New Book:</h1>
    <form  mat-dialog-content *ngIf="authorsList.length > 0 && genresList.length > 0; else noForm" class="d-flex flex-column align-items-center gap-3 p-5" [formGroup]="form" (ngSubmit)="addBook()">
      <mat-form-field class="w-100" appearance="fill">
        <mat-label>Title:</mat-label>
        <input matInput formControlName="title">
        <mat-error *ngIf="form.get('title')?.hasError('required')">Required</mat-error>
        <mat-error *ngIf="form.get('title')?.hasError('minlength')">At Least 3 characters</mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Author</mat-label>
        <mat-select formControlName="author">
          <mat-option *ngFor="let author of authorsList" [value]="author.id">
            {{author.name + " " + author.surname}}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('author')?.hasError('required')">Required</mat-error>
      </mat-form-field>
      <div formArrayName="genres" class="d-flex flex-column align-items-center gap-2">
        <h4 class="m-0 fw-bold">Genres:</h4>
        <ng-container *ngFor="let genre of genres.controls; let i = index">
          <mat-checkbox [formControlName]="i">{{genresList[i].name}}</mat-checkbox>
        </ng-container>
        <mat-error *ngIf="form.get('genres')?.hasError('notChecked')">Required</mat-error>
      </div>
      <button *ngIf="isUpdate[0]" mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">Update Book</button>
      <button *ngIf="!isUpdate[0]" mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">Add Book</button>
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
  subscription!: Subscription;
  currentUser!: User | undefined;

  constructor(private api: ApiService, private bookService: BookService, private modalService: ModalService, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.subscription = combineLatest([this.modalService.getIsUpdateObservable(), this.api.getAllAuthors(), this.api.getAllGenres(), this.loginService.getCurrentUser()])
      .pipe(take(1))
      .subscribe((res: [[boolean, Book | undefined], Author[], Genre[], User | undefined]) => {
        this.isUpdate = res[0];
        this.authorsList = res[1];
        this.genresList = res[2];
        this.currentUser = res[3];
        const currentTitle: string = this.isUpdate[0] && this.isUpdate[1] ? this.isUpdate[1].title : '';
        const currenAuthor: string | number = this.isUpdate[0] && this.isUpdate[1] && this.isUpdate[1].author.id ? this.isUpdate[1].author.id : '';
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
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      const book: Book = { title: this.form.value.title, author: definitiveAuthor, genres: currentGenres, user: this.currentUser };
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
