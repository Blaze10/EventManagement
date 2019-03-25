import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {
venueList: AngularFireList<any>;
constructor(private db: AngularFireDatabase) { }

getVenueList() {
  this.venueList = this.db.list('college/venues');
  return this.venueList;
}

}
