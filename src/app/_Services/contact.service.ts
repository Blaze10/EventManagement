import { Contact } from './../_Models/contact.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactsList: AngularFireList<any>;

constructor(private db: AngularFireDatabase) { }

getAllContactList() {
  this.contactsList = this.db.list('college/contactMessages');
  return this.contactsList;
}

createContact(contact: Contact) {
  return this.contactsList.push(contact);
}

updateContact(key, contact) {
  delete contact.contactId;
  contact.status = 'Read';
  return this.contactsList.update(key, contact);
}

getNewContacts() {
  return this.db.list('college/contactMessages', ref => ref.orderByChild('status').equalTo('New'));
}


}
