import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Venue } from '../_Models/venue.model';

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

insertVenue(venue: Venue) {
  return this.venueList.push(venue);
}

deleteVenue(key) {
  return this.venueList.remove(key);
}

updateVenue(key, venue) {
  return this.venueList.update(key, venue);
}

}
