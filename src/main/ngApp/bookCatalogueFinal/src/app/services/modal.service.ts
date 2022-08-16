import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormType } from '../model/form-type';
import { Book } from '../model/book';
import { MatDialog } from '@angular/material/dialog';
import { FormBookComponent } from '../modules/panel/components/form-book.component';
import { FormGenreComponent } from '../modules/panel/components/form-genre.component';
import { FormAuthorComponent } from '../modules/panel/components/form-author.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isUpdate: BehaviorSubject<[boolean, Book | undefined]> = new BehaviorSubject<[boolean, Book | undefined]>([false, undefined]);

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  getIsUpdateObservable(): Observable<[boolean, Book | undefined]> {
    return this.isUpdate.asObservable();
  }

  setUpdateForm(book: Book): void {
    this.isUpdate.next([true, book]);
  }

  openDialog(formType: FormType) {
    switch (formType) {
      case 'author':
        this.dialog.open(FormAuthorComponent);
        break;
      case 'book':
        this.dialog.open(FormBookComponent);
        break;
      case 'genre':
        this.dialog.open(FormGenreComponent);
        break;
    }
  }

  closeModal(): void {
    this.dialog.closeAll();
    this.isUpdate.next([false, undefined]);
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
  }

}
