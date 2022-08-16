import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ApiService } from 'src/app/api/api.service';
import { Genre } from 'src/app/model/genre';

@Component({
  selector: 'app-form-genre',
  template: `
  <h1 mat-dialog-title>Add New Genre:</h1>
  <form mat-dialog-content class="d-flex flex-column align-items-center gap-3 p-5" [formGroup]="form" (ngSubmit)="addGenre()">
    <mat-form-field class="w-100" appearance="fill">
      <mat-label>Name:</mat-label>
      <input matInput formControlName="name">
      <mat-error *ngIf="form.get('name')?.hasError('required')">Required</mat-error>
      <mat-error *ngIf="form.get('name')?.hasError('minlength')">At Least 3 characters</mat-error>
    </mat-form-field>
    <button mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">Add Genre</button>
  </form>
  `,
  styles: [`
  form {
    overflow-x: hidden;
    overflow-y: auto;
  }
  `]
})
export class FormGenreComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private modalService: ModalService, private api: ApiService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  addGenre(): void {
    this.subscription = this.api.addGenre({ ...this.form.value })
      .subscribe((res: Genre) => {
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
