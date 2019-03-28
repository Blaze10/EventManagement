import { ContactService } from './../../../_Services/contact.service';
import { Contact } from './../../../_Models/contact.model';
import { AuthService } from './../../../_Services/auth.service';
import { Customer } from 'src/app/_Models/customer.model';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/_Services/customers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  allCustomers: Customer[] = [];
  showLoader = false;
  showAddress = '';
  allMessages: Contact[] = [];
  newCount = 0;
  showAlert = false;
  p = 1;
  constructor(private customerService: CustomersService, private router: Router,
              private alertify: AlertifyService, private authService: AuthService,
              private contactService: ContactService) { }

  ngOnInit() {
    this.showLoader = true;
    this.getAllCustomers();
    this.getAllContacts();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().snapshotChanges().subscribe(item => {
      this.showLoader = false;
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.allCustomers.push(x as Customer);
      });
      console.log(this.allCustomers);
    },
    (err => {
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    }));
  }

  onShowAddress(address) {
    this.showAddress = address;
  }

  getAllContacts() {
    this.contactService.getNewContacts().valueChanges().subscribe((list: Contact[]) => {
      this.allMessages = list;
      this.newCount = this.allMessages.length;
      if (this.newCount > 0) {
        this.showAlert = true;
      } else {
        this.showAlert = false;
      }
    },
    (err => {
      console.log(err);
    }));
  }


}
