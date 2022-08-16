import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <main class="bg-secondary py-3">
    <router-outlet></router-outlet>
  </main>
  `,
  styles: [`
  main {
    min-height: calc(100vh - 70px);
  }
  `]
})
export class AppComponent {

  constructor() { }

}
