import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormType } from '../model/form-type';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  showModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formType: BehaviorSubject<FormType> = new BehaviorSubject<FormType>('author');
  isUpdate: BehaviorSubject<[boolean, Book | undefined]> = new BehaviorSubject<[boolean, Book | undefined]>([false, undefined]);

  constructor() { }

  getModalObservable(): Observable<boolean> {
    return this.showModal.asObservable();
  }

  getFormObservable(): Observable<FormType> {
    return this.formType.asObservable();
  }

  getIsUpdateObservable(): Observable<[boolean, Book | undefined]> {
    return this.isUpdate.asObservable();
  }

  setUpdateForm(book: Book): void {
    this.isUpdate.next([true, book]);
  }

  openModal(formType: FormType): void {
    this.formType.next(formType);
    this.showModal.next(true);
  }

  closeModal(): void {
    this.showModal.next(false);
    this.isUpdate.next([false, undefined]);
  }
}
