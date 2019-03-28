import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertifyService } from '../_Services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from '../_Services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminEntryList = [];
  loginForm: FormGroup;
  showLoader = false;
  constructor(private alertify: AlertifyService, private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAdminListEntry().valueChanges().subscribe((list: any) => {
      this.adminEntryList = list;
    });
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    this.showLoader = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.loginUser(email, password)
    .then(user => {
      const id = user.user.uid;
      this.adminEntryList.forEach(item => {
        if (email === item.email) {
          localStorage.setItem('userRole', 'admin');
          localStorage.setItem('userEmail', email);
        }
      });
      if (this.authService.isAdminLoggedIn()) {
        this.alertify.success('Logged in');
        this.router.navigate(['/customersList']);
        this.showLoader = false;
      } else {
        this.alertify.error('Invalid Credentials');
        this.authService.signout();
        this.showLoader = false;
      }
    })
    .catch(err => {
      this.showLoader = false;
      if (!this.authService.isAdminLoggedIn()) {
        this.alertify.error('Invalid credentials');
      }
    });
  }

}
