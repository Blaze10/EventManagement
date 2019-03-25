import { AuthService } from './../../_Services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomersService } from './../../_Services/customers.service';
import { AlertifyService } from './../../_Services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customerEntryList = [];
  loginForm: FormGroup;
  showLoader = false;
  constructor(private alertify: AlertifyService, private router: Router,
              private customerService: CustomersService, private authService: AuthService) { }

  ngOnInit() {
    this.customerService.getCustomerEntryList().valueChanges().subscribe((list: any) => {
      this.customerEntryList = list;
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
      this.customerEntryList.forEach(item => {
        if (email === item.email) {
          localStorage.setItem('userRole', 'customer');
          localStorage.setItem('userEmail', email);
        }
      });
      if (this.authService.isCustomerLoggedIn()) {
        this.alertify.success('Logged in');
        this.router.navigate(['/customerProfile']);
        this.showLoader = false;
      }
    })
    .catch(err => {
      this.showLoader = false;
      if (!this.authService.isCustomerLoggedIn()) {
        this.alertify.error('Invalid credentials');
      }
    });
  }

}
