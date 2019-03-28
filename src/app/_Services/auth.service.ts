import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
currentUser;
adminList: AngularFireList<any>;

constructor(private afAuth: AngularFireAuth, private alertify: AlertifyService,
            private router: Router, private db: AngularFireDatabase) { }

registerOrganizer(email: string, password: string) {
  return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
}

loginUser(email: string, password: string) {
  return this.afAuth.auth.signInWithEmailAndPassword(email, password);
}

signout() {
  localStorage.clear();
  this.afAuth.auth.signOut().then(() => {
  });
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

isAdminLoggedIn() {
  return this.isLoggedIn() && !!(localStorage.getItem('userRole') === 'admin');
}

getCurrentUser() {
  return this.afAuth.auth.currentUser;
}

resetUserPassword(password) {
  return this.afAuth.auth.currentUser.updatePassword(password);
}

getAdminListEntry() {
  this.adminList = this.db.list('college/admins');
  return this.adminList;
}

}
