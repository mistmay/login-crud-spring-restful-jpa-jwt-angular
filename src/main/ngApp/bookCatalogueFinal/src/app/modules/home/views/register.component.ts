import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { Response } from 'src/app/model/response';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-register',
  template: `
      <form class="d-flex flex-column align-items-center gap-3 w-100 p-5 border border-secondary rounded bg-white" [formGroup]="form" (ngSubmit)="register()">
        <h3 class="fw-bold fs-4">Register</h3>
        <mat-form-field class="w-100" appearance="fill">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username">
          <mat-error *ngIf="form.get('username')?.hasError('required')">Required</mat-error>
          <mat-error *ngIf="form.get('username')?.hasError('minlength')">At Least 3 characters</mat-error>
        </mat-form-field>
        <mat-form-field class="w-100" appearance="fill">
          <mat-label>Password</mat-label>
          <input matInput formControlName="password" type="password">
          <mat-error *ngIf="form.get('password')?.hasError('required')">Required</mat-error>
          <mat-error *ngIf="form.get('password')?.hasError('minlength')">At Least 6 characters</mat-error>
        </mat-form-field>
        <mat-form-field class="w-100" appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email">
          <mat-error *ngIf="form.get('email')?.hasError('required')">Required</mat-error>
          <mat-error *ngIf="form.get('email')?.hasError('email')">Write a valid email</mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">Register</button>
      </form>
      <div class="w-100 d-flex justify-content-center mt-3">
        <a class="text-center fw-bold" routerLink="/home/login">Login Page</a>
      </div>
  `,
  styles: [`
    :host(app-register) {
        width: 100%;
    }
    `]
})
export class RegisterComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private modalService: ModalService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe()
    });
    this.form.reset();
  }

  register(): void {
    this.subscriptions.push(this.api.register({ ...this.form.value })
      .subscribe((res: Response) => {
        if (res.status) {
          this.modalService.showSnackBar(res.message);
          this.form.reset();
          this.router.navigate(['home/login']);
        } else {
          this.modalService.showSnackBar(res.message);
        }
      }));
  }

}