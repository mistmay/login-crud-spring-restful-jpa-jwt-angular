import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormType } from '../model/form-type';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  template: `
  <aside class="position-fixed top-0 start-0 vw-100 vh-100 d-flex justify-content-center align-items-center" #modal (click)="clickOutsideModal($event)">
    <div class="px-2">
      <div class="container bg-white rounded p-5" [ngSwitch]="form">
        <app-form-author *ngSwitchCase="'author'"></app-form-author>
        <app-form-book *ngSwitchCase="'book'"></app-form-book>
        <app-form-genre *ngSwitchCase="'genre'"></app-form-genre>
      </div>
    </div>
  </aside>
  `,
  styles: [`
  aside {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
  }
  `]
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: ElementRef;
  form!: FormType;
  subscription!: Subscription;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.subscription = this.modalService.getFormObservable()
      .subscribe((res: FormType) => {
        this.form = res;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clickOutsideModal(event: Event): void {
    if (event.target !== this.modal.nativeElement) {
      return;
    } else {
      this.modalService.closeModal();
    }
  }

}
