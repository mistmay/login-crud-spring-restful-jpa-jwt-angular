import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
  <header>
    <nav class="h-100">
      <mat-toolbar color="primary" class="h-100">
        <span>Book Catalogue</span>
        <span class="example-spacer"></span>
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
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
