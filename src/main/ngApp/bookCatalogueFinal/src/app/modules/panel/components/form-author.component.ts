import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { Author } from 'src/app/model/author';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-form-author',
  template: `
  <h1 mat-dialog-title>Add New Author:</h1>
  <form  mat-dialog-content class="d-flex flex-column align-items-center gap-3 p-5" [formGroup]="form" (ngSubmit)="addAuthor()">
    <mat-form-field class="w-100" appearance="fill">
      <mat-label>Name:</mat-label>
      <input matInput formControlName="name">
      <mat-error *ngIf="form.get('name')?.hasError('required')">Required</mat-error>
      <mat-error *ngIf="form.get('name')?.hasError('minlength')">At Least 3 characters</mat-error>
    </mat-form-field>
    <mat-form-field class="w-100" appearance="fill">
      <mat-label>Surname</mat-label>
      <input matInput formControlName="surname">
      <mat-error *ngIf="form.get('surname')?.hasError('required')">Required</mat-error>
      <mat-error *ngIf="form.get('surname')?.hasError('minlength')">At Least 3 characters</mat-error>
    </mat-form-field>
    <button mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">Add Author</button>
  </form>
  `,
  styles: [`
  form {
    overflow-x: hidden;
    overflow-y: auto;
  }
  `]
})
export class FormAuthorComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private modalService: ModalService, private api: ApiService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      surname: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  addAuthor(): void {
    this.subscription = this.api.addAuthor({ ...this.form.value })
      .subscribe((res: Author) => {
        this.form.reset();
        this.modalService.closeModal();
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
