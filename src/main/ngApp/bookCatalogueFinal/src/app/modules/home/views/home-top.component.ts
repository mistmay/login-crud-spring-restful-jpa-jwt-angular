import { Component } from "@angular/core";

@Component({
    selector: 'app-home-top',
    template: `
    <h1 class="fw-bold text-center m-0 text-white fa-3">Book Catalogue</h1>
    <section class="p-3">
        <div class="container p-3 bg-light rounded border border-secondary d-flex flex-column align-items-center gap-3">
            <router-outlet></router-outlet>
        </div>
    </section>
    `,
    styles: [`
    `]
})
export class HomeTopComponent {

    constructor() { }

}