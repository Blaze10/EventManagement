import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_Services/auth.service';
import { AlertifyService } from '../_Services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      // this.authService.checkLoggedUser();
     if (!this.authService.isLoggedIn()) {
       return true;
     } else {
       this.alertify.error('Access Denied');
       this.router.navigate(['/']);
       return false;
     }
  }
}
