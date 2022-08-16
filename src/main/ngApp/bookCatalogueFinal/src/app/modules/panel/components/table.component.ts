import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/model/book';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { ModalService } from 'src/app/services/modal.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/model/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  template: `
  <ng-container *ngIf="bookList; else loading">
    <mat-form-field appearance="standard" *ngIf="bookList.length > 0">
      <mat-label>Filter</mat-label>
      <input matInput (keyup)="applyFilter($event)" placeholder="Search" #input>
    </mat-form-field>
    <div class="mat-elevation-z8" *ngIf="bookList.length > 0; else noBooks">
      <table mat-table [dataSource]="dataSource" matSort>
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Title </th>
          <td mat-cell *matCellDef="let row"> {{row.title}} </td>
        </ng-container>
        <ng-container matColumnDef="author">
          <th mat-header-cell *matHeaderCellDef mat-sort-header class="d-none d-sm-table-cell"> Author </th>
          <td mat-cell *matCellDef="let row" class="d-none d-sm-table-cell"> {{row.author.name + " " + row.author.surname}} </td>
        </ng-container>
        <ng-container matColumnDef="genres">
          <th mat-header-cell *matHeaderCellDef mat-sort-header class="d-none d-md-table-cell"> Genres </th>
          <td mat-cell *matCellDef="let row" class="d-none d-md-table-cell">
            <ng-container *ngFor="let genre of row.genres">
              {{genre.name}}<br />
            </ng-container>
          </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Actions </th>
          <td mat-cell *matCellDef="let row">
            <div class="d-flex justify-content-center align-items-center flex-wrap gap-2">
              <button mat-icon-button color="primary" type="button" (click)="updateBook(row)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" type="button" (click)="deleteBook(row)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        <tr class="mat-row" *matNoDataRow>
          <td class="mat-cell" colspan="4">No data matching the filter</td>
        </tr>
      </table>
      <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
    </div>
  </ng-container>
  <ng-template #loading>
    <p class="text-center">Loading...</p>
  </ng-template>
  <ng-template #noBooks>
    <p class="text-center fw-bold">There are no books!</p>
  </ng-template>
  `,
  styles: [`
  table {
    width: 100%;
  }
  .mat-form-field {
    font-size: 14px;
    width: 100%;
  }
  td, th {
    width: 25%;
    text-align: center;
    vertical-align: middle;
  }
  ::ng-deep .mat-sort-header-container {
    justify-content: center;
  }
  `]
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['title', 'author', 'genres', 'actions'];
  dataSource!: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  bookList!: Book[];
  subscriptions: Subscription[] = [];

  constructor(private bookService: BookService, private modalService: ModalService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.loginService.getCurrentUser()
      .subscribe((res: User | undefined) => {
        if (res && res.id) {
          this.bookService.currentUser = res;
          this.bookService.getAllBooks();
          this.subscriptions.push(this.bookService.getBookListObservable()
            .subscribe((res: Book[]) => {
              this.bookList = res;
              this.dataSource = new MatTableDataSource(this.bookList);
            }));
        }
      }));
  }

  ngOnDestroy(): void {
    this.bookService.currentUser = undefined;
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBook(book: Book): void {
    if (book.id) {
      this.bookService.deleteBook(book.id);
    }
  }

  updateBook(book: Book): void {
    this.modalService.setUpdateForm(book);
    this.modalService.openDialog('book');
  }

}
