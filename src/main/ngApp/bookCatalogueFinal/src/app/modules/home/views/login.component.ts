import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login',
    template: `
      <form class="d-flex flex-column align-items-center gap-3 w-100 p-5 border border-secondary rounded bg-white" [formGroup]="form" (ngSubmit)="login()">
        <h3 class="fw-bold fs-4">Log-in</h3>
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
        <button mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">Log-In</button>
      </form>
      <div class="w-100 d-flex justify-content-center mt-3">
        <a class="text-center fw-bold" routerLink="/home/register">Register Page</a>
      </div>
  `,
    styles: [`
    :host(app-login) {
        width: 100%;
    }
    `]
})
export class LoginComponent implements OnInit, OnDestroy {
    form!: FormGroup;

    constructor(private fb: FormBuilder, private loginService: LoginService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    ngOnDestroy(): void {
        this.form.reset();
    }

    login(): void {
        this.loginService.login({ ...this.form.value });
        this.form.reset();
    }

}