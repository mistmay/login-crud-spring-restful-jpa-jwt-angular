import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  template: `
  <section class="px-2 py-5">
    <div class="container bg-white rounded p-5 shadow border border-secondary d-flex flex-column align-items-center gap-5">
      <h1 class="fs-1 fw-bold text-center">Error</h1>
      <p class="text-center">
        This page does not exist<br />
        You will be redirect to home in few seconds...
      </p>
    </div>
  </section>
  `,
  styles: [
  ]
})
export class ErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => this.router.navigate(['home']), 4000);
  }

}
