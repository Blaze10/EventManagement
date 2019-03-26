import { Booking } from './../_Models/booking.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

bookingsList: AngularFireList<any>;
constructor(private db: AngularFireDatabase) { }

getBookingsList() {
  this.bookingsList = this.db.list('college/bookingsList');
  return this.bookingsList;
}

createBookings(data: Booking) {
  return this.bookingsList.push(data);
}

getMyBookings(email) {
  return this.db.list('college/bookingsList', ref => ref.orderByChild('customeremail').equalTo(email));
}

getOrganizerBookings(email) {
  return this.db.list('college/bookingsList', ref => ref.orderByChild('organizer').equalTo(email));
}

editBookingStatus(bookingId, status) {
  return this.db.object('college/bookingsList/' + bookingId + '/status').set(status);
}

}
