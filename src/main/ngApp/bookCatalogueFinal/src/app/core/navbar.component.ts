import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  template: `
  <header>
    <nav class="h-100">
      <mat-toolbar color="primary" class="h-100">
        <span>Book Catalogue</span>
        <span class="example-spacer"></span>
        <div *ngIf="currentUser" class="d-flex align-items-center gap-2">
          <span>{{currentUser.username}}</span>
          <button mat-icon-button color="warn" type="button" (click)="logout()">
            <mat-icon>logout</mat-icon>
          </button>
        </div>
      </mat-toolbar>
    </nav>
  </header>
  `,
  styles: [`
  header {
    height: 70px;
  }
  .example-spacer {
    flex: 1 1 auto;
  }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser!: User | undefined;
  subscription!: Subscription;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.subscription = this.loginService.getCurrentUser()
      .subscribe((res: User | undefined) => {
        this.currentUser = res;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.loginService.logOut();
  }

}
