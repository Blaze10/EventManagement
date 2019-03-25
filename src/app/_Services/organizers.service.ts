import { Organizer } from './../_Models/organizer.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrganizersService {
organizersList: AngularFireList<any>;
OrganizerEntryList: AngularFireList<any>;

constructor(private db: AngularFireDatabase) { }

getAllOrganizers() {
  this.organizersList = this.db.list('college/organizersList');
  return this.organizersList;
}

registerOrganizer(organizer: Organizer) {
  delete organizer['password'];
  return this.organizersList.push(organizer);
}

makeOrganizerEntry(email: string) {
  return this.db.list('college/organizers').push({'email': email});
}

getOrganizerEntryList() {
  this.OrganizerEntryList = this.db.list('college/organizers');
  return this.OrganizerEntryList;
}

getOrganizerByEmail(email) {
  return this.db.list('college/organizersList', ref => ref.orderByChild('email').equalTo(email));
}

getOrganizerByKey(key) {
  return this.db.object('college/organizersList/' + key);
}

}
