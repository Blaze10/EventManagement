import { Customer } from './../_Models/customer.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
customersList: AngularFireList<any>;
customerEntryList: AngularFireList<any>;
constructor(private db: AngularFireDatabase) { }

getAllCustomers() {
  this.customersList = this.db.list('college/customerList');
  return this.customersList;
}

registerCustomer(customer: Customer) {
  delete customer['password'];
  return this.customersList.push(customer);
}

makeCustomerEntry(email: string) {
  return this.db.list('college/customers').push({'email': email});
}

getCustomerEntryList() {
  this.customerEntryList = this.db.list('college/customers');
  return this.customerEntryList;
}

getCustomerByEmail(email) {
  return this.db.list('college/customerList', ref => ref.orderByChild('email').equalTo(email));
}

}
