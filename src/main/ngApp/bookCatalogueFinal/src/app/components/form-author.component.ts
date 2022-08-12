import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { ApiService } from '../api/api.service';
import { Subscription } from 'rxjs';
import { Author } from '../model/author';

@Component({
  selector: 'app-form-author',
  template: `
  <form class="d-flex flex-column align-items-center gap-3 p-5 border border-secondary rounded" [formGroup]="form" (ngSubmit)="addAuthor()">
    <h3 class="fw-bold">Add New Author:</h3>
    <div class="d-flex justify-content-center align-items-center flex-column gap-2">
      <label for="name">Name:</label>
      <span class="text-danger" *ngIf="form.controls['name'].dirty && form.hasError('required', 'name')">*Required<br></span>
      <span class="text-danger" *ngIf="form.controls['name'].dirty && form.hasError('minlength', 'name')">At least 3 characters<br></span>
      <input type="text" id="name" placeholder="Name" formControlName="name" class="rounded p-2 text-center">
    </div>
    <div class="d-flex justify-content-center align-items-center flex-column gap-2">
      <label for="surname">Surname:</label>
      <span class="text-danger" *ngIf="form.controls['surname'].dirty && form.hasError('required', 'surname')">*Required<br></span>
      <span class="text-danger" *ngIf="form.controls['surname'].dirty && form.hasError('minlength', 'surname')">At least 3 characters<br></span>
      <input type="text" id="surname" placeholder="Surname" formControlName="surname" class="rounded p-2 text-center">
    </div>
    <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Add Book</button>
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
