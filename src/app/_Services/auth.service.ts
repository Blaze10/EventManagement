import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
currentUser;
constructor(private afAuth: AngularFireAuth, private alertify: AlertifyService,
            private router: Router) { }

registerOrganizer(email: string, password: string) {
  return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
}

loginUser(email: string, password: string) {
  return this.afAuth.auth.signInWithEmailAndPassword(email, password);
}

logout() {
  localStorage.clear();
  this.afAuth.auth.signOut().then(() => {
    this.alertify.success('Logged out');
    this.router.navigate(['/home']);
  });
}

isLoggedIn() {
  return !!(localStorage.getItem('userRole')) && !!(localStorage.getItem('userEmail'));
}

isOrganizerLoggedIn() {
  return this.isLoggedIn() && !!(localStorage.getItem('userRole') === 'organizer');
}

isCustomerLoggedIn() {
  return this.isLoggedIn() && !!(localStorage.getItem('userRole') === 'customer');
}

getCurrentUser() {
  return this.afAuth.auth.currentUser;
}

}
