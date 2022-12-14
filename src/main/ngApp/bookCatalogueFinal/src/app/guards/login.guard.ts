import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from '../services/login.service';
import { ModalService } from '../services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private loginService: LoginService, private router: Router, private modalService: ModalService) { }

  canLoad(): Observable<boolean> {
    return this.loginService.isLoggedIn().pipe(map((res: boolean) => {
      if (res) {
        return true;
      } else {
        sessionStorage.removeItem("token");
        this.loginService.currentUser.next(undefined);
        this.router.navigate(['home']);
        this.modalService.showSnackBar('You are not logged in');
        return false;
      }
    }));
  }
}
