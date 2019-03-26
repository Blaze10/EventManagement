import { AuthService } from 'src/app/_Services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from './../../_Services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/_Services/customers.service';
import { Customer } from 'src/app/_Models/customer.model';
declare const $: any;

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  loggedInCustomer: Customer;
  showLoader = false;
  userForm: FormGroup;
  passwordForm: FormGroup;
  editLoader = false;
  passwordLoader = false;
  constructor(private customerService: CustomersService, private alertify: AlertifyService,
              private authService: AuthService) { }

  ngOnInit() {
    this.showLoader = true;
    this.customerService.getAllCustomers();
    this.initUserForm();
    this.initPasswordForm();
    const custEmail = localStorage.getItem('userEmail');
    this.customerService.getCustomerByEmail(custEmail).snapshotChanges().subscribe((item) => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.loggedInCustomer = x as Customer;
      });
      this.showLoader = false;
      this.patchUserForm();
    },
    (err => {
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    }));

  }

  initUserForm() {
    this.userForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.pattern('[6-9]\\d{9}')]),
      userId: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    });
  }

  initPasswordForm() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  patchUserForm() {
    this.userForm.patchValue({
      fullName: (this.loggedInCustomer.fullName),
      email: (this.loggedInCustomer.email),
      mobile: (this.loggedInCustomer.mobile),
      userId: (this.loggedInCustomer.userId),
      address: (this.loggedInCustomer.address)
    });
  }

  onSubmit() {
    this.editLoader = true;
    const customer = this.userForm.value;
    const key =  this.loggedInCustomer.$key;
    this.customerService.updateCustomer(customer, key)
    .then(() => {
      this.editLoader = false;
      this.alertify.success('Profile updation successful');
    })
    .catch((err) => {
      this.editLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    });
  }

  onChangePassword() {
    this.passwordLoader = true;
    const password = this.passwordForm.value.password;
    this.authService.resetUserPassword(password)
    .then(() => {
      this.passwordLoader = false;
      $('#exampleModal').modal('hide');
      this.alertify.success('Password updated successfully');
      this.passwordForm.reset();
    })
    .catch((err) => {
      this.passwordLoader = false;
      console.log(err.message);
      this.alertify.error('Some error occured. Please try again after sometime.');
    });
  }
}
