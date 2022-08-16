import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../model/user';
import { Response } from '../model/response';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  constructor(private api: ApiService, private router: Router, private modalService: ModalService) { }

  getCurrentUser(): Observable<User | undefined> {
    return this.currentUser.asObservable();
  }

  login(user: User): void {
    this.api.login(user)
      .subscribe((res: Response) => {
        if (res.status) {
          const token: string = "Bearer " + res.message;
          sessionStorage.setItem("token", token);
          this.currentUser.next(res.user);
          this.router.navigate(['panel']);
          this.modalService.showSnackBar("logged in");
        } else {
          sessionStorage.removeItem("token");
          this.currentUser.next(undefined);
          this.modalService.showSnackBar(res.message);
        }
      });
  }

  isLoggedIn(): Observable<boolean> {
    let token: string | null = sessionStorage.getItem("token");
    if (token !== null && token) {
      const tokenSplit: string[] = token?.split(' ');
      if (tokenSplit.length <= 1) {
        token = tokenSplit[0];
      } else {
        token = tokenSplit[1];
      }
      return this.api.isTokenExpired(token).pipe(
        map((res: Response) => {
          this.currentUser.next(res.user);
          return !res.status;
        }));
    } else {
      return new BehaviorSubject<boolean>(false);
    }
  }

  logOut() {
    sessionStorage.removeItem("token");
    this.currentUser.next(undefined);
    this.router.navigate(['home']);
    this.modalService.showSnackBar('Logged out');
  }

}
