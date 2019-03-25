import { AlertifyService } from './../../_Services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/_Services/customers.service';
import { Customer } from 'src/app/_Models/customer.model';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  loggedInCustomer: Customer;
  showLoader = false;
  constructor(private customerService: CustomersService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.showLoader = true;
    const custEmail = localStorage.getItem('userEmail');
    this.customerService.getCustomerByEmail(custEmail).snapshotChanges().subscribe((item) => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.loggedInCustomer = x as Customer;
      });
      this.showLoader = false;
      console.log(this.loggedInCustomer);
    },
    (err => {
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    }));
  }

}
