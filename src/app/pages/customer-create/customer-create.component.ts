import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomersService } from './../../_Services/customers.service';
import { Router } from '@angular/router';
import { AuthService } from './../../_Services/auth.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;
  showLoader = false;
  constructor(private alertify: AlertifyService, private authService: AuthService,
              private router: Router, private customerService: CustomersService) { }

  ngOnInit() {
    this.customerService.getAllCustomers();
    this.initCustomerForm();
  }

  initCustomerForm() {
    this.customerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.pattern('[6-9]\\d{9}')])
    });
  }

  onSubmit() {
    this.showLoader = true;
    const email = this.customerForm.value.email;
    const password = this.customerForm.value.password;
    this.authService.registerOrganizer(email, password)
    .then(registeredUser => {
      const id = registeredUser.user.uid;
      this.customerService.registerCustomer({... this.customerForm.value, userId: id})
      .then(() => {
        this.customerService.makeCustomerEntry(email)
        .then(() => {
          this.showLoader = false;
          this.alertify.success('Registration Successful');
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          console.log(err);
          this.alertify.error('Oops some error occured');
        });
      })
      .catch((err) => {
        console.log(err);
        this.alertify.error('Oops some error occured');
      });
    })
    .catch(err => {
      this.showLoader = false;
      console.log(err);
      const errorCode = err.code;
      const errorMessage = err.message;
      if (errorCode === 'auth/weak-password') {
        this.alertify.error('The password is too weak');
      } else {
        this.alertify.error(errorMessage);
      }
    });
  }
}
