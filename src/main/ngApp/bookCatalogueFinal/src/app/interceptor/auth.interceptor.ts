import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (sessionStorage.getItem('token')) {
            const token: string | null = sessionStorage.getItem('token');
            req = req.clone({
                setHeaders: {
                    Authorization: String(token)
                }
            });
        }
        return next.handle(req);
    };
}